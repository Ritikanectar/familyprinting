import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {FormBuilder,FormControl,FormGroup,Validators,FormArray} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import {GlobalConstants} from '../../common/global-constants';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-app',
  templateUrl: './new-app.component.html',
  styleUrls: ['../admin.component.css']
})
export class NewAppComponent implements OnInit {

  landingForm !: FormGroup;
  welcomeForm !: FormGroup;
  regForm !: FormGroup;
  productForm !: FormGroup;
  designForm !: FormGroup;
  galleryForm !: FormGroup;
  previewForm !: FormGroup;
  thankyouForm !: FormGroup;
  uiForm !: FormGroup;
  submitted = false;
  massage = "";
  eventData = {'name':'','id':''};
  url:string = GlobalConstants.apiURL;
  fileurl:string = GlobalConstants.appurl;
  httpOptions = {
    headers: new HttpHeaders({'Accept':'application/json', 'Authorization': "Bearer " + localStorage.getItem('token') }),
  };
  color:any;
  event_id:any;
  selProducts:any = [];
  tabEnabled = 0;
  config:any = {welcome:{button_text:'',welcome_title:'',welcome_desc:'',bg_file_path:''},
                reg:{terms_conditions:'',is_terms_conditions:'',button_color:'',button_text:'',bg_file_path:''},
                product:{header_text:'',bg_file_path:'',header_size_text:''},
                preview:{preview:'',preview_file:''},
                thankyou: {bg_thankyou_file:''},
                ui: {}
               };
  products = [{frontview_file:'',backview_file:'',name:'',canvas_front_width:'',canvas_front_height:'',canvas_back_width:'',canvas_back_height:'',product_id:'',is_active:0,productview_file:''}];
  loader:boolean = false;
  productNamesCh:any = [];
  enabledProd:any = [];

  constructor(private http:HttpClient,private form:FormBuilder, private router:Router, private activeRoute:ActivatedRoute, private modalService: NgbModal) {
      
      if (localStorage.getItem("token") === null) {
        this.router.navigate(['/login']);
      }

      
   }

  get fl() { return this.landingForm.controls; } 
  get f() { return this.welcomeForm.controls; }
  get fR() { return this.regForm.controls; }
  
  productArr:any = [];

  prodChecked(pid:any){
    if(this.productNamesCh.includes(pid)){
      return true;
    }
    return false;
  }

  ngOnInit(): void {

    this.event_id = this.activeRoute.snapshot.params.id;
      this.tabEnabled = this.activeRoute.snapshot.params.tab;
      this.http.post(this.url+'get-layout-dd',{event_id:this.event_id},this.httpOptions).subscribe((response:any)=>{
        this.eventData = response.event;
        this.products = response.products;
        this.selProducts = response.selProducts;
        this.config = response.config;
        this.enabledProd = response.config.enabledProd;
        console.log(this.enabledProd);
        console.log(this.config.thankyou);
        if(this.selProducts && Object.keys(this.selProducts)!.length>0){
          var that = this;
          $.each(this.selProducts,function(key,val){
            that.productNamesCh.push(val['product_id']);
          });
          
        }

        if(this.config.landing && Object.keys(this.config.landing)!.length>0){
          
          this.landingForm.patchValue({button_text:this.config.landing.button_text,
            radius_topleft:this.config.landing.btn_radius_topleft,radius_topright:this.config.landing.btn_radius_topright,
            radius_botleft:this.config.landing.btn_radius_botleft,radius_botright:this.config.landing.btn_radius_botright,
            btn_bg_color: this.config.landing.button_bg_color,btn_text_color: this.config.landing.button_text_color
          });
        }
        if(this.config.welcome && Object.keys(this.config.welcome)!.length>0){
          this.welcomeForm.patchValue({button_text:this.config.welcome.button_text,welcome_title: this.config.welcome.welcome_title,
            welcome_desc: this.config.welcome.welcome_desc,
            radius_topleft:this.config.welcome.btn_radius_topleft,radius_topright:this.config.welcome.btn_radius_topright,
            radius_botleft:this.config.welcome.btn_radius_botleft,radius_botright:this.config.welcome.btn_radius_botright,
            btn_bg_color: this.config.welcome.button_bg_color,btn_text_color: this.config.welcome.button_text_color});
        }
        if(this.config.reg && Object.keys(this.config.reg).length>0){
          this.config.reg.is_terms_conditions = this.config.reg.is_terms_conditions==0? 'no':'yes';
          this.regForm.patchValue({header_title:this.config.reg.header_title,terms_cond:this.config.reg.terms_conditions,is_terms:this.config.reg.is_terms_conditions,button_color:this.config.reg.button_color,button_text:this.config.reg.button_text,
            data_col:{first_name:this.config.reg.is_first_name,data_collected:this.config.reg.data_collected,last_name:this.config.reg.is_last_name,
              phone:this.config.reg.is_phone,email:this.config.reg.is_email,address_1:this.config.reg.is_address_1,address_2:this.config.reg.is_address_2,
              city:this.config.reg.is_city,zip:this.config.reg.is_zip}});
        }
        if(this.config.preview && Object.keys(this.config.preview).length>0){
          this.previewForm.patchValue({preview:this.config.preview.preview});
        }
        if(this.config.product && Object.keys(this.config.product)!.length>0){
          this.productForm.patchValue({header_text:this.config.product.header_text});
        }
        if(this.config.product && Object.keys(this.config.product)!.length>0){
          this.productForm.patchValue({header_size_text:this.config.product.header_size_text});
        }
        if(this.config.thankyou && Object.keys(this.config.thankyou).length>0){
          this.thankyouForm.patchValue({redirect_url:this.config.thankyou.redirect_url,is_message:this.config.thankyou.is_message,message:this.config.thankyou.message,is_pickup:this.config.thankyou.is_pickup_ins,pickup:this.config.thankyou.pickup_ins});
        }
        if(this.config.ui && Object.keys(this.config.ui).length>0){
          this.uiForm.patchValue({tile_color:this.config.ui.tile_color,button_text_color:this.config.ui.btn_text_color,button_bg_color:this.config.ui.btn_bg_color,pop_up_color:this.config.ui.popup_box_color,
            sel_highlight:this.config.ui.sel_highlight,body_text_color:this.config.ui.body_text_color,toggle_color:this.config.ui.toggled_color,
            un_toggle_color:this.config.ui.un_toggled_color,front_back_toggle:this.config.ui.front_back_toggle,header_typeface:this.config.ui.header_typeface});
          

        }
      },(error)=>{
        console.log(error);
      });

    $('.headerName').html("New App");
    this.welcomeForm = this.form.group({
      button_text: [this.config.welcome.button_text,Validators.required],
      welcome_title: [''],
      welcome_desc: [''],
      radius_topleft: [''],
      radius_topright: [''],
      radius_botleft: [''],
      radius_botright: [''],
      btn_bg_color: [''],
      btn_text_color: [''],
      bgimage: [''],
      logo: [''],
      event: ['']
    });

    this.landingForm = this.form.group({
      button_text: ['',Validators.required],
      radius_topleft: [''],
      radius_topright: [''],
      radius_botleft: [''],
      radius_botright: [''],
      btn_bg_color: [''],
      btn_text_color: [''],
      bgimage: [''],
      logo: [''],
      event: ['']
    });

    this.regForm = this.form.group({
      data_col: new FormGroup({
        data_collected: new FormControl(''),
        first_name: new FormControl(''),
        last_name: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl(''),
        address_1: new FormControl(''),
        address_2: new FormControl(''),
        city: new FormControl(''),
        zip: new FormControl(''),
      },Validators.required),
      header_title:['',Validators.required],
      is_terms: [''],
      terms_cond: [''],
      button_color: ['',Validators.required],
      button_text: ['',Validators.required],
      bgimage: [''],
      import:[''],
      event: ['']
    });

    this.productForm = this.form.group({
      header_text: ['',Validators.required],
      bgimage: [''],
      header_size_text:['',Validators.required]
      //productList: this.form.array([])
    });

    this.thankyouForm = this.form.group({
      redirect_url: [''],
      bgimage : [''],
      logo: [''],
      is_message : ['1'],
      message : [''],
      is_pickup : ['1'],
      pickup : ['']
    });

    this.uiForm = this.form.group({
      tile_color: [''],
      button_text_color: [''],
      button_bg_color: [''],
      pop_up_color: [''],
      sel_highlight: [''],
      body_text_color: [''],
      toggle_color: [''],
      un_toggle_color: [''],
      front_back_toggle: [''],
      header_typeface: [''],
      uid: [''],
      event: ['']
    })

    this.designForm = this.form.group({
      designArea : [''],
      designScale : [''],
      designGallery : [''],
      uid: [localStorage.getItem("id")],
      productID: [''],
      event_id: [this.event_id]
    });
    
    this.galleryForm = this.form.group({
      galleries: ['']
    });

    this.previewForm = this.form.group({
      preview: [''],
      bgimage: ['']
    });

  }

  closeResult: any;
  assigGalTitle:any;
  gallery:any;
  galleryType:any;
  prodID:any;
  modalReference:any;

  open(content:any,pid:any,pname:any) {
    this.assigGalTitle = pname;
    this.prodID = pid;
    this.galleryType = $("#designGallery"+this.prodID).val();
    this.http.get(this.url+'get-gallery',this.httpOptions).subscribe((data:any)=>{
      this.gallery = data.gallery;
    });
    
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',windowClass : "assignGalModal"}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  GalleryIDs:any = [];
  
  pushGal(id:any,event:any,i:any){
    if(event.checked){
      this.GalleryIDs.push(id);
      if(this.galleryType=='single_gallery'){
        $(".galleryChk input[type='checkbox']").attr('disabled','true');
        $("#gal"+i).removeAttr('disabled');
      }
    }else{
      const index = this.GalleryIDs.indexOf(id);
      if (index > -1) {
        this.GalleryIDs.splice(index, 1);
        if(this.galleryType=='single_gallery'){
          $(".galleryChk input[type='checkbox']").removeAttr('disabled');
        }
      }
    }
  }

  assignGalleryNow(){
    this.http.post(this.url+'assign-gallery',{
      gallery:JSON.stringify(this.GalleryIDs),
      product:this.prodID,
      event:this.event_id,
      uid:localStorage.getItem("id")},
      this.httpOptions).subscribe(
      (response:any)=>{
        console.log(response);
        if(response.flag){
          this.selProducts = response.selProducts;
          setTimeout(() => {
            $("#designGallery"+this.prodID).val(this.galleryType);
          }, 1000);
          
          //this.modalReference.close();
        }
        alert(response.msg);
      },
      (error:any)=>{
        console.log(error);
      }
    )
  }


  // createHobbies(Inputs:any) {
  //   const arr = Inputs.map((rows: { selected: any; }) => {
  //     return new FormControl(rows.selected || false);
  //   });
  //   return new FormArray(arr);
  // }
  urls:any = []; activeContent:any = {welcome:false,registration:false,product:false,preview:false,thankyou:false};
  csvContent:any=''; csvArray:any=[];
  onFileSelect(event:any,content:any) {
    
    
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      var reader = new FileReader();
      switch(content){
        case 'landing': this.activeContent.landing=true;this.landingForm.get('bgimage')!.setValue(file);  break;
        case 'landinglogo': this.activeContent.landing=true;this.landingForm.get('logo')!.setValue(file);  break; 
        case 'welcome': this.activeContent.welcome=true;this.welcomeForm.get('bgimage')!.setValue(file);  break; 
        case 'welcomelogo': this.activeContent.welcome=true;this.welcomeForm.get('logo')!.setValue(file);  break; 
        case 'reg': this.activeContent.registration=true;this.regForm.get('bgimage')!.setValue(file); break;
        case 'reg_import': 
        this.regForm.get('import')!.setValue(file); 
        const fileReader = new FileReader();
        fileReader.onload = this.onFileLoad;
        fileReader.readAsText(file, "UTF-8");

        break;
        case 'product': this.activeContent.product=true;this.productForm.get('bgimage')!.setValue(file); break;
        case 'preview': this.activeContent.preview=true;this.previewForm.get('bgimage')!.setValue(file); break;
        case 'thankyou': this.activeContent.thankyou=true;this.thankyouForm.get('bgimage')!.setValue(file); break;
        case 'thankyoulogo': this.activeContent.thankyou=true;this.thankyouForm.get('logo')!.setValue(file); break;
      }
      reader.onload = function(e:any) {
        $("."+content+"-preview").attr('src', e.target.result);
      }
      // let files = event.target.files;
      // if (file) {
      //   for (let fl of files) {
      //     let reader = new FileReader();
      //     reader.onload = (e: any) => {
      //       this.urls.push(e.target.result);
      //     }
      //     reader.readAsDataURL(fl);
      //   }
      //   $("."+content+"-preview").attr("src",this.urls[0]);
      // }
      // $('#wPreview').attr('src', event.target.result);
      reader.readAsDataURL(event.target.files[0]);
    }
    
  }

  onFileLoad(fileLoadedEvent:any) {
    const textFromFileLoaded = fileLoadedEvent.target.result;              
    this.csvContent = textFromFileLoaded;
    $("#csvdata").html(this.csvContent);
    // this.csvArray = [];
    // var allTextLines = this.csvContent.split(/\r\n|\n/);
    // for (var i=0; i<allTextLines.length; i++) {
    //   var data = allTextLines[i].split(';');
    //   var tarr = [];
    //   for (var j=0; j<data.length; j++) {
    //       tarr.push(data[j]);
    //   }
    //   this.csvArray.push(tarr);
    // }
    // console.log(this.csvArray.length);
  }

  changeLayout(name:any){
    $(".tab-pane").removeClass('active');
    $(".nav-link").removeClass('active');
    $("#"+name).addClass('fade show active');
    $("#v-pills-"+name+"-tab").addClass('active');
  }

  readUrl(self:any){
    console.log("Read URL:");  
    console.log(self);
  }

  createLanding(){
    this.submitted = true;
    if (this.landingForm.invalid) {
        return;
    }
    this.loader = true;
    this.submitted = false;
    var formData:any = new FormData();
    formData.append('uid',localStorage.getItem("id"));
    $.each(this.landingForm.value,function(k,v){
      formData.append(k, v);
    });
    formData.append('event',this.event_id);
    formData.append('bgimage', this.landingForm.get('bgimage')!.value);
    formData.append('logo', this.landingForm.get('logo')!.value);
    this.http.post(this.url+'create-landing', formData, this.httpOptions).subscribe((response:any)=>{
      this.loader = false;
      if(response.flag){
        alert(response.msg);
      }
    },(error)=>{
      console.log(error);
    });
  }

  createWelcome(){
console.log('hiii');
    this.submitted = true;
    if (this.welcomeForm.invalid) {
      
        return;
    }

    this.loader = true;
    this.submitted = false;
    var formData:any = new FormData();
    formData.append('uid',localStorage.getItem("id"));
    
    $.each(this.welcomeForm.value,function(k,v){
      formData.append(k, v);
    });
    formData.append('event',this.event_id);
    formData.append('bgimage', this.welcomeForm.get('bgimage')!.value);
    formData.append('logo', this.welcomeForm.get('logo')!.value);
    this.http.post(this.url+'create-welcome', formData, this.httpOptions).subscribe((response:any)=>{
      this.loader = false;
      if(response.flag){
        alert(response.msg);
      }
    },(error)=>{
      console.log(error);
    });
  }

  importDataCol:boolean = false;
  checkDataCol(event:any){
    this.importDataCol = event.target.checked;
    if(this.importDataCol){
      $(".reg_fields").attr("disabled",'disabled');
    }else{
      $(".reg_fields").removeAttr("disabled");
    }
  }

  createReg(){
    this.submitted = true;
    if (this.regForm.invalid) {
        return;
    }
    this.loader = true;
    this.submitted = false;
    var formData:any = new FormData();
    formData.append('uid',localStorage.getItem("id"));
    $.each(this.regForm.value,function(k,v){
      formData.append(k, v);
    });
    formData.append('event',this.event_id);
    $.each(this.regForm.get('data_col')!.value,function(k,v){
      formData.append(k, v);
    });
    formData.append('bgimage', this.regForm.get('bgimage')!.value);
    this.http.post(this.url+'create-registration', formData, this.httpOptions).subscribe((response:any)=>{
      this.loader = false;
      console.log(response);
      alert(response.msg);
    },(error)=>{
      console.log(error);
    });
  }

  pushProd(id:any,event:any){
    console.log(event.checked);
    if(event.checked){
      this.productNamesCh.push(id);
    }else{
      const index = this.productNamesCh.indexOf(id);
      if (index > -1) {
        this.productNamesCh.splice(index, 1);
      }
    }
  }

  changeProdStatus(pid:any,status:any){
    // this.http.post(this.url+'change-status-product',{pid:pid,status:status},this.httpOptions).subscribe((data:any)=>{
    //   this.products = data.products;
    // })
    var records:any = new FormData();
    records.append('productID', pid);
    records.append('productIDStat', status);
    records.append('uid',localStorage.getItem("id"));
    records.append('event',this.event_id);
    records.append('bgimage', this.productForm.get('bgimage')!.value);
    $.each(this.productForm.value,function(k,v){
      records.append(k, v);
    });
    

    this.http.post(this.url+'create-product-layout',records,this.httpOptions).subscribe((response:any)=>{
      console.log(response.msg);
      if(response.msg){
        this.enabledProd = response.enabledProd;
        console.log(this.enabledProd);
      }
    },(error)=>{
      console.log(error);
    })
  }

  createProduct(){

    // if(this.productNamesCh.length<=0){
    //   alert('please select products');
    //   return;
    // }
    //return;
    this.loader = true;
    var formData:any = new FormData();
    formData.append('uid',localStorage.getItem("id"));
    $.each(this.productForm.value,function(k,v){
      formData.append(k, v);
    });
    formData.append('event',this.event_id);
    // formData.append('products',JSON.stringify(this.productNamesCh));
    formData.append('products',[]);
    formData.append('bgimage', this.productForm.get('bgimage')!.value);
    var checkedValue = $('.productNames:checked').val();
    //this.productForm.get('productList')?.setValue(checkedValue);
    console.log(this.productForm!.value);
    this.http.post(this.url+'create-product-layout',formData,this.httpOptions).subscribe((response:any)=>{
      this.loader = false;
      alert(response.msg);
    },(error)=>{
      console.log(error);
    })
  }

  assignGallery(productID:any){
    var desGal = $("#designGallery"+productID).val();
    //alert(productID+" : "+desGal);
    this.router.navigate(['admin/assign-gallery/'+productID+'/'+desGal+'/'+this.event_id]);
  }
  prodDesignMsg:any;
  createProductDesign(pid:any){
    this.designForm.get('designArea')!.setValue($("#designArea"+pid).val());
    this.designForm.get('designScale')!.setValue($("#designScale"+pid).val());
    this.designForm.get('designGallery')!.setValue($("#designGallery"+pid).val());
    this.designForm.get('productID')!.setValue(pid);
    this.designForm.get('event_id')!.setValue(this.event_id);
    this.http.post(this.url+'create-product-design',this.designForm!.value,this.httpOptions).subscribe((response:any)=>{
      this.prodDesignMsg = response.msg;
      console.log(response);
      setTimeout(() => {
        this.prodDesignMsg = '';
      }, 3000);
    })
  }

  
  createPreview(){
    this.loader = true;
    var formData:any = new FormData();
    formData.append('uid',localStorage.getItem("id"));
    $.each(this.previewForm.value,function(k,v){
      formData.append(k, v);
    });
    formData.append('event',this.event_id);
    formData.append('bgimage', this.previewForm.get('bgimage')!.value);
    this.http.post(this.url+'create-preview', formData, this.httpOptions).subscribe((response:any)=>{
      this.loader = false;
      alert(response.msg);
    },(error)=>{
      console.log(error);
    });
  }
  
  createThankYou(){
    this.loader = true;
    var formData:any = new FormData();
    formData.append('uid',localStorage.getItem("id"));
    $.each(this.thankyouForm.value,function(k,v){
      formData.append(k, v);
    });
    formData.append('event',this.event_id);
    formData.append('bgimage', this.thankyouForm.get('bgimage')!.value);
    formData.append('logo', this.thankyouForm.get('logo')!.value);
    console.log(formData);
    console.log(formData.uid);
    this.http.post(this.url+'create-thankyou', formData, this.httpOptions).subscribe((response:any)=>{
      this.loader = false;
      alert(response.msg);
    },(error)=>{
      console.log(error);
    });
  }

  createUi(){
    this.loader = true;
    this.uiForm.get('uid')!.setValue(localStorage.getItem("id"));
    this.uiForm.get('event')!.setValue(this.event_id);
    this.http.post(this.url+'create-ui', this.uiForm!.value, this.httpOptions).subscribe((response:any)=>{
      this.loader = false;
      alert(response.msg);
    },(error)=>{
      console.log(error);
    });
  }
  
}

