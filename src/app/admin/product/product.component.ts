import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpHeaders,HttpClient} from '@angular/common/http';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import {GlobalConstants} from '../../common/global-constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../../admin/admin.component.css']
})

export class ProductComponent implements OnInit {

  url:string = GlobalConstants.apiURL;
  appurl:string = GlobalConstants.appurl;
  httpOptions = {
    //headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + localStorage.getItem('token') }),
    headers: new HttpHeaders({'Accept':'application/json', 'Authorization': "Bearer " + localStorage.getItem('token') }),
  };
  headerName:any;
  frontcanvasdisplay:any;
  backcanvasdisplay:any;
  dtOptions: any = {};
  closeResult: any;
  modalReference:any;
  submitted = false;
  products:any = [];
  productForm!:FormGroup;
  productTypes:any;
  /*frontPic: any; backPic: any;*/
  frontPic: any = []; backPic: any = [];frontcanvasresize:any = [];backcanvasresize:any = [];

  constructor(private router:Router, private formBuilder : FormBuilder, private http:HttpClient,
              private modalService:NgbModal, private activeModal:NgbActiveModal) { 
      if (localStorage.getItem("token") === null) {
        this.router.navigate(['/login']);
      }
  }

  onFileSelect(event: any, content: any, i: number) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      var reader = new FileReader();
      if(content == 'productimg'){
        this.productForm.get('productimg')!.setValue(file);
        reader.onload = function(e:any) {
          $("#"+content+"-preview").attr('src', e.target.result);
        }
        reader.readAsDataURL(event.target.files[0]);
    }else{

      var imgwidth = 400;
      var imgheight = 450;

      let img = new Image()
      img.src = window.URL.createObjectURL(event.target.files[0])
      img.onload = () => {
       // alert(img.width + " " + img.height);
        if(img.width != imgwidth || img.height != imgheight){
          alert('Image size should be '+imgwidth+' by '+imgheight);
        }else{
      switch(content){
        case 'frontview': 
          reader.onload = function(e:any) {
            var pinchid = 'frontCan'+i;
            var canid = 'frontCanvas'+i;
            var canwidth = '';
            var canheight = '';
            var candisplay = 'display:none';

            var fwidth = $('.resize_front_width'+i).val();
            var fheight = $('.resize_front_height'+i).val();
            if(fwidth != ''){
              fwidth = Math.round(fwidth);
              canwidth = 'width:'+fwidth+'px;';
              
            } if(fheight != ''){
              fheight = Math.round(fheight);
              canheight = 'height:'+fheight+'px;';
            }
            if(fheight != '' || fwidth != ''){
              candisplay = 'display:block';
            }
            
            $('.frontSpan' + i).html("<div class='divf"+i+"' style='position: relative;overflow: hidden;width: 700px; margin: 0 auto;'><div class='img-box' style='width: 700px; margin: 0 auto;height:84.5vh;overflow: hidden;position: relative;'><img style='width:82%;' class='img-fluid' src='" + e.target.result + "' ></div><pinch-zoom [auto-zoom-out]='true' [disablePan]='true' style='' id='"+pinchid+"' ><canvas style='border: 3px dotted;position: absolute;margin:0 auto;top: 0px;"+candisplay+";left:0px;"+canwidth+canheight+"' id='can1' class='"+canid+"'></canvas></pinch-zoom></div>");
          }
          //this.productForm.get('frontview')!.setValue(file); 
          this.frontPic[i] = file;
          this.draggingfront(i);
          // var candata = {
          //   width: 0,
          //   height: 0,
          //   top: 0,
          //   left: 0,
          //   transform: '1'
          // }
          // this.frontcanvasresize[i] = candata;
          break; 
        case 'backview': 
          reader.onload = function(e:any) {
            var pinchbackid = 'backCan'+i;
            var canbackid = 'backCanvas'+i;
            var canbwidth = '';
            var canbheight = '';
            var canbdisplay = 'display:none';

            var bwidth = $('.resize_back_width'+i).val();
            var bheight = $('.resize_back_height'+i).val();
            if(bwidth != ''){
              bwidth = Math.round(bwidth);
              canbwidth = 'width:'+bwidth+'px;';
              
            } if(bheight != ''){
              bheight = Math.round(bheight);
              canbheight = 'height:'+bheight+'px;';
            }
            if(bheight != '' || bwidth != ''){
              canbdisplay = 'display:block';
            }
            $('.backSpan' + i).html("<div class='divb"+i+"' style='position: relative;overflow: hidden;width: 700px; margin: 0 auto;'><div class='img-box' style='width: 700px; margin: 0 auto;height: 84.5vh;overflow: hidden;position: relative;'><img style='width:82%;' class='img-fluid' src='" + e.target.result + "' ></div><pinch-zoom [auto-zoom-out]='true' [disablePan]='true' style='' id='"+pinchbackid+"' ><canvas style='border: 3px dotted;position: absolute;margin:0 auto;top: 0px;"+canbdisplay+";left:0px;"+canbwidth+canbheight+"' class='"+canbackid+"'></canvas></pinch-zoom></div>");

          }
          //this.productForm.get('backview')!.setValue(file); 
          //this.backPic = file;
          this.backPic[i] = file;
          this.draggingback(i);
          // var candata = {
          //   width: 0,
          //   height: 0,
          //   top: 0,
          //   left: 0,
          //   transform: '1'
          // }
          // this.backcanvasresize[i] = candata;
          break;
        // case 'frontviewsvg':           
        //   this.productForm.get('frontview_svg')!.setValue(file); break;
        // case 'backviewsvg':
        //   this.productForm.get('backview_svg')!.setValue(file); break;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }}
}}
  frontCanvasChange(i:any){
    // var width = ($("#canvas_front_width").val()/70)*10;
    // var height = ($("#canvas_front_height").val()/70)*10;
    var width = ($("#front_width"+i).val()/30)*10;
    var height = ($("#front_height"+i).val()/30)*10;
    if($(".frontCanvas"+i).length){
      $(".frontCanvas"+i).css('width',width+'px');
      $(".frontCanvas"+i).css('height',height+'px');
      $(".frontCanvas"+i).css('display','block');
      this.draggingfront(i);
    }
    
    $('.resize_front_width'+i).val(width);
    $('.resize_front_height'+i).val(height);
    $('.canvas_front_top'+i).val(0);
    $('.canvas_front_left'+i).val(0);
    $('.front_transform'+i).val('1');
    var candata = {
      width: width,
      height: height,
      top: 0,
      left: 0,
      transform:'1'
  }
    this.frontcanvasresize[i] = candata;

    
  }
  backCanvasChange(i:any){
    var width = ($("#back_width"+i).val()/30)*10;
    var height = ($("#back_height"+i).val()/30)*10;
    if($(".backCanvas"+i).length){
      $(".backCanvas"+i).css('width',width+'px');
      $(".backCanvas"+i).css('height',height+'px');
      $(".backCanvas"+i).css('display','block');
      this.draggingback(i);
    }
    $('.resize_back_width'+i).val(width);
    $('.resize_back_height'+i).val(height);
    $('.canvas_back_top'+i).val(0);
    $('.canvas_back_left'+i).val(0);
    $('.back_transform'+i).val('1');
    var candata = {
      width: width,
      height: height,
      top: 0,
      left: 0,
      transform:'1'
  }
    this.backcanvasresize[i] = candata;
    
  }
  draggingfront(i:any){
    
    var el: any
    
    var fcra = this.frontcanvasresize;
    let newPosX = 0, newPosY = 0, startPosX = 0, startPosY = 0;
    setTimeout(function () {
    // when the user clicks down on the element
    el = document.querySelector('.frontCanvas'+i);
    el.addEventListener('mousedown', function(e:any){
        e.preventDefault();
        // get the starting position of the cursor
        startPosX = e.clientX;
        startPosY = e.clientY;
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', function(){
        document.removeEventListener('mousemove', mouseMove);
        });
        
    });
    
    
    function mouseMove(e:any) {
        // calculate the new position
        newPosX = startPosX - e.clientX;
        newPosY = startPosY - e.clientY;
        // with each move we also want to update the start X and Y
        startPosX = e.clientX;
        startPosY = e.clientY;
        
        // set the element's new position:
        el.style.top = (el.offsetTop - newPosY) + "px";
        el.style.left = (el.offsetLeft - newPosX) + "px";
        var divbtop  = (el.offsetTop - newPosY);
        var divbleft  = (el.offsetLeft - newPosX);
        $('.canvas_front_left'+i).val(divbleft);
        $('.canvas_front_top'+i).val(divbtop);
        var candata = {
          width: $('.resize_front_width'+i).val(),
          height: $('.resize_front_height'+i).val(),
          top: divbtop,
          left: divbleft,
          transform:$('.front_transform'+i).val()
      }
      
      fcra[i] = candata;
    }
    //this.pinchzoomdata(i);
   
    // var zoomScale = Number(a)/10;
    // this.setZoom(zoomScale,el)
  },2000);}

  draggingback(i:any){
    
    var el: any
    
    var bcra = this.backcanvasresize;
    let newPosX = 0, newPosY = 0, startPosX = 0, startPosY = 0;
    
    // when the user clicks down on the element
    setTimeout(function () {
    el = document.querySelector('.backCanvas'+i);
    el.addEventListener('mousedown', function(e:any){
        e.preventDefault();
        
        // get the starting position of the cursor
        startPosX = e.clientX;
        startPosY = e.clientY;
        
        document.addEventListener('mousemove', mouseMove);
        
        document.addEventListener('mouseup', function(){
            document.removeEventListener('mousemove', mouseMove);
        });
        
    });
    
    
    function mouseMove(e:any) {
        // calculate the new position
        newPosX = startPosX - e.clientX;
        newPosY = startPosY - e.clientY;
    
        // with each move we also want to update the start X and Y
        startPosX = e.clientX;
        startPosY = e.clientY;
        
        // set the element's new position:
        el.style.top = (el.offsetTop - newPosY) + "px";
        el.style.left = (el.offsetLeft - newPosX) + "px";
        var divbtop  = (el.offsetTop - newPosY);
        var divbleft  = (el.offsetLeft - newPosX);
        $('.canvas_back_left'+i).val(divbleft);
        $('.canvas_back_top'+i).val(divbtop);
        var candata = {
          width: $('.resize_back_width'+i).val(),
          height: $('.resize_back_height'+i).val(),
          top: divbtop,
          left: divbleft,
          transform:$('.back_transform'+i).val()
      }
      bcra[i] = candata;
    }
    //this.pinchzoombackdata(i);
  },2000);}

  setZoom(event: any,k:any) {
    // var idval = '#'+a+k;
    // var zoom = $(idval).val()/10;
    if($(".frontCanvas"+k).length)
    {
      var idval = event.value;
      var zoom = idval/10;
      var el: any
      el = document.querySelector('.frontCanvas'+k);
      var transformOrigin:any;
      transformOrigin = [0,0];
      el = el ;
      var p = ["webkit", "moz", "ms", "o"],
            s = "scale(" + zoom + ")",
            oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";

      for (var i = 0; i < p.length; i++) {
          el.style[p[i] + "Transform"] = s;
          el.style[p[i] + "TransformOrigin"] = oString;
      }

      el.style["transform"] = s;
      el.style["transformOrigin"] = oString;
      
      var gbcr = el.getBoundingClientRect();
      var elwidth = gbcr.width;
      var elheight = gbcr.height;
      $('.resize_front_width'+k).val(elwidth);
      $('.resize_front_height'+k).val(elheight);
      $('.front_transform'+k).val(zoom);
      var candata = {
        width: gbcr.width,
        height: gbcr.height,
        top: $('.canvas_front_top'+k).val(),
        left: $('.canvas_front_left'+k).val(),
        transform: zoom
      }
      this.frontcanvasresize[k] = candata;
  } 
}
setZoomBack(event: any,k:any) {
  // var idval = '#'+a+k;
  // var zoom = $(idval).val()/10;
  if($(".backCanvas"+k).length)
{
  var idval = event.value;
  var zoom = idval/10;
  var el: any
  el = document.querySelector('.backCanvas'+k);
  var transformOrigin:any;
  transformOrigin = [0,0];
  el = el ;
  var p = ["webkit", "moz", "ms", "o"],
        s = "scale(" + zoom + ")",
        oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";

  for (var i = 0; i < p.length; i++) {
      el.style[p[i] + "Transform"] = s;
      el.style[p[i] + "TransformOrigin"] = oString;
  }

  el.style["transform"] = s;
  el.style["transformOrigin"] = oString;
  
  var gbcr = el.getBoundingClientRect();
    var elwidth = gbcr.width;
    var elheight = gbcr.height;
    $('.resize_back_width'+k).val(elwidth);
    $('.resize_back_height'+k).val(elheight);
    $('.back_transform'+k).val(zoom);
    var candata = {
      width: gbcr.width,
      height: gbcr.height,
      top: $('.canvas_back_top'+k).val(),
      left: $('.canvas_back_left'+k).val(),
      transform: zoom
    }
    this.backcanvasresize[k] = candata;
}
}
  pinchzoombackdata(i:any){
    var bcra = this.backcanvasresize;
    var translateX = 0,
    translateY = 0,
    translateZ = 0,
    stepZ = 10,
    initial_obj_X = 0,
    initial_obj_Y = 0,
    initial_mouse_X = 0,
    initial_mouse_Y = 0;
  
  function apply_coords() {
    
    $(".backCanvas"+i).css("transform", 'perspective(100px) translate3d(' + translateX + 'px, ' + translateY + 'px, ' + translateZ + 'px)');
    $(".backCanvas"+i).css("border", '3px dotted');
    var gbcrb = $(".backCanvas"+i)[0].getBoundingClientRect();
    var elbwidth = gbcrb.width;
    var elbheight = gbcrb.height;
    var btransform = translateX + 'px, ' + translateY + 'px, ' + translateZ + 'px';
    $('.resize_back_width'+i).val(elbwidth);
    $('.resize_back_height'+i).val(elbheight);
    // $('.canvas_back_left'+i).val(divbleft);
    // $('.canvas_back_top'+i).val(divbtop);
    $('.back_transform'+i).val(btransform);
    var candata = {
      width: gbcrb.width,
      height: gbcrb.height,
      top: $('.canvas_back_left'+i).val(),
      left: $('.canvas_back_top'+i).val(),
      transform: translateX + 'px, ' + translateY + 'px, ' + translateZ + 'px'
  }

  bcra[i] = candata;
  }
  
  var fcanvaszooming = <HTMLInputElement>document.getElementById("backCan"+i);
  fcanvaszooming.addEventListener("mousewheel", function(e: any) {
    
    e.preventDefault();
    var delta = e.delta || e.wheelDelta;
    var zoomOut;
    if (delta === undefined) {
      delta = e.detail;
      zoomOut = delta ? delta < 0 : e.deltaY > 0;
      zoomOut = !zoomOut;
    } else {
      zoomOut = delta ? delta < 0 : e.deltaY > 0;
    }
    if (zoomOut) {
      translateZ = translateZ - stepZ;
    } else {
      translateZ = translateZ + stepZ;
    }
    apply_coords()
    
  })
  
  var is_dragging = false;
  fcanvaszooming.addEventListener("mousedown", function(e: any) {
    is_dragging = true;
  });
  
  fcanvaszooming.addEventListener("mouseup", function(e: any) {
    is_dragging = false;
  });
  
  }
 
  pinchzoomdata(i:any){
    var fcra = this.frontcanvasresize;
    var translateX = 0,
    translateY = 0,
    translateZ = 0,
    stepZ = 10,
    initial_obj_X = 0,
    initial_obj_Y = 0,
    initial_mouse_X = 0,
    initial_mouse_Y = 0;
  
  function apply_coords() {
    
    $(".frontCanvas"+i).css("transform", 'perspective(100px) translate3d(' + translateX + 'px, ' + translateY + 'px, ' + translateZ + 'px)');
    $(".frontCanvas"+i).css("border", '3px dotted');
    var gbcr = $(".frontCanvas"+i)[0].getBoundingClientRect();
    var elwidth = gbcr.width;
    var elheight = gbcr.height;
    var ftransform = translateX + 'px, ' + translateY + 'px, ' + translateZ + 'px';
    $('.resize_front_width'+i).val(elwidth);
    $('.resize_front_height'+i).val(elheight);
    $('.front_transform'+i).val(ftransform);
    
    var candata = {
      width: gbcr.width,
      height: gbcr.height,
      top: $('.canvas_front_top'+i).val(),
      left: $('.canvas_front_left'+i).val(),
      transform: translateX + 'px, ' + translateY + 'px, ' + translateZ + 'px'
    }
    fcra[i] = candata;
    
  }
  
  var fcanvaszooming = <HTMLInputElement>document.getElementById("frontCan"+i);
  fcanvaszooming.addEventListener("mousewheel", function(e: any) {
    //console.log("mousewheel");
    e.preventDefault();
    var delta = e.delta || e.wheelDelta;
    var zoomOut;
    if (delta === undefined) {
      delta = e.detail;
      zoomOut = delta ? delta < 0 : e.deltaY > 0;
      zoomOut = !zoomOut;
    } else {
      zoomOut = delta ? delta < 0 : e.deltaY > 0;
    }
    if (zoomOut) {
      translateZ = translateZ - stepZ;
    } else {
      translateZ = translateZ + stepZ;
    }
    apply_coords()
    
  })
  
  var is_dragging = false;
  fcanvaszooming.addEventListener("mousedown", function(e: any) {
    //console.log("mousedown");
    is_dragging = true;
  });
  // fcanvaszooming.addEventListener("mousemove", function(e: any) {
  //   console.log("mousemove");
  //   if (is_dragging) {
  //     e.preventDefault();
  //     var currentX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
  //     var currentY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
  //     translateX = initial_obj_X + (currentX - initial_mouse_X);
  //     translateY = initial_obj_Y + (currentY - initial_mouse_Y);
  //     apply_coords();
  //   } else {
  //     initial_mouse_X = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
  //     initial_mouse_Y = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
  //     initial_obj_X = translateX;
  //     initial_obj_Y = translateY;
  //   }
  // });
  fcanvaszooming.addEventListener("mouseup", function(e: any) {
    //console.log("mouseup");
    is_dragging = false;
  });
  
    
  
  }
  ngOnInit(): void {
    
    this.headerName = 'Product';
    $('.headerName').html(this.headerName);
    var that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback:any) => {
        that.http
              .post(that.url+'get-products',dataTablesParameters,this.httpOptions)
              .subscribe((result:any) => {
                that.products = result.products.aaData;
                console.log(that.products);
                  callback({
                      recordsTotal: result.products.iTotalRecords, // result.recordsTotal
                      recordsFiltered: result.products.iTotalDisplayRecords, //result.recordsFiltered
                      data: [],
                  });
              });
      },
      columns: [
          { data: "name" },
          { data: "type" },
          { data: "size" },
          { data: "color" },
          { data: "preview" },
          { data: "action" },
      ],
      // dom: 'Bfrtip',
      // buttons: [ 'print', 'excel', 'pdf' ]
      // lengthMenu: [[25, 100, -1,4,5,9,7,8], [25, 100, -1,4,5,9,7,8]],
      // pageLength: 25,
     
    };

    this.http.post(this.url+'get-prod-dd',{},this.httpOptions).subscribe((data:any)=>{
      this.productTypes = data.product_type;
    });

    this.productForm = this.formBuilder.group({
      product_name: ['', Validators.required],
      product_color: this.formBuilder.array([]),
      product_type: ['', Validators.required],
      product_size: new FormGroup({
        XXL: new FormControl(''),
        XL: new FormControl(''),
        L: new FormControl(''),
        M: new FormControl(''),
        S: new FormControl('')
      }),
      other_size:[''],
      productimg:[''],
      /*frontview:[''],
      backview:[''],
      frontview_svg: [''],
      backview_svg: [''],*/
      // canvas_front_width: ['', Validators.required],
      // canvas_front_height: ['', Validators.required],
      // canvas_back_width: ['', Validators.required],
      // canvas_back_height: ['', Validators.required]
    });

  }

  product_color(): FormArray {
    return this.productForm.get("product_color") as FormArray
  }
  newColor(): FormGroup {
    return this.formBuilder.group({
      color: '',
      color_name: '',
      front_width: '',
      front_height: '',
      back_width: '',
      back_height: '',
      front_width_real:'',
      back_width_real: '',
      id:'',
      frontview: '',
      backview: '',
      canvas_front_left:'',
      canvas_front_top:'',
      canvas_back_left:'',
      canvas_back_top:'',
      back_transform:'',
      front_transform:'',
      resize_front_width: '',
      resize_front_height:'',
      resize_back_width: '',
      resize_back_height:'',
    })
  }
  addColor() {
    this.product_color().push(this.newColor());
  }


  removedProd: any = [];
  removeColor(i: number) {
    this.removedProd.push(this.product_color().at(i).value);
    this.product_color().removeAt(i);
  }
  
  fileClick(desc: any, i: number) {
    if (desc == 'front') {
      $('#frontview' + i).click();
    } else {
      $('#backview' + i).click();
    }
  }

  uid:any = "";
  checkAuth() : any{
    this.uid = localStorage.getItem("id");
    if(this.uid == undefined || this.uid != 1){
      return "";
    }
    return "Exist";
  }
  
  get f() { return this.productForm.controls; }

  updateProduct(){
    this.submitted = true;
    if (this.productForm.invalid) {
        return;
    }

    var formData:any = new FormData();
    formData.append('uid',localStorage.getItem("id"));
    $.each(this.productForm.value,function(k,v){
      formData.append(k, v);
    });
    
    //alert(this.productId);
    formData.append('product_id', this.productId);
    formData.append('product_size', JSON.stringify(this.productForm.get('product_size')!.value));

    formData.append('removedProd', JSON.stringify(this.removedProd));

    formData.append('colors', JSON.stringify(this.productForm.get("product_color")!.value));

    console.log(JSON.stringify(this.productForm.get("product_color")!.value));

    // formData.append('frontview', this.productForm.get('frontview')!.value);
    // formData.append('backview', this.productForm.get('backview')!.value);
    /*formData.append('frontview', this.frontPic);
    formData.append('backview', this.backPic);*/

    for (var i = 0; i<= this.frontPic.length; i++) {
      formData.append('frontview['+i+']', this.frontPic[i]);
    }
    $.each(this.backPic, function (k, v) {

      formData.append('backview[' + k + ']', v);
    });
    
    /*formData.append('frontview_svg', this.productForm.get('frontview_svg')!.value);
    formData.append('backview_svg', this.productForm.get('backview_svg')!.value);*/
    formData.append('frontcanvasresize', JSON.stringify(this.frontcanvasresize));
    formData.append('backcanvasresize', JSON.stringify(this.backcanvasresize));
    this.http.post(this.url+'update-product', formData, this.httpOptions).subscribe((response:any)=>{
     // console.log(response);
      if(response.flag){
        this.modalService.dismissAll();
        this.products = response.products;
      }
      alert(response.msg);
    },(error)=>{
      console.log(error);
    });
  }

  productId:number=0;
  product: any = { name: '' };
  prodColors: any = [];
  request: any;
  open(content:any,prID:any) {

    this.productId = prID;

    while (this.product_color().length !== 0) {
      this.product_color().removeAt(0)
    }


    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',windowClass : "productEditModal"}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
    this.http.post(this.url+'get-product',{product_id:prID},this.httpOptions).subscribe((data:any)=>{
      this.product = data.product;
      //console.log(this.product);
      console.log(data.prodColors);
      var xxl=false; var xl=false; var l=false; var m=false; var s=false;
      if(data.product.size && data.product.size.length>0){
        $.each(data.product.size.split(","),function(key,value){
          switch(value){
            case 'XXL' : xxl = true; break;
            case 'XL' : xl = true; break;
            case 'L' : l = true; break;
            case 'M' : m = true; break;
            case 'S' : s = true; break;
          }
        });
      }
      this.prodColors = data.prodColors;

      // this.productForm.patchValue({product_name:data.product.name,product_type: data.product.type_id,
      //   product_size:{XXL:xxl,XL:xl,L:l,M:m,S:s},other_size:data.product.other_size,
      //   canvas_front_width:data.product.canvas_front_width,canvas_front_height:data.product.canvas_front_height,
      //   canvas_back_width:data.product.canvas_back_width,canvas_back_height:data.product.canvas_back_height
      // });
      this.productForm.patchValue({product_name:data.product.name,product_type: data.product.type_id,
        product_size:{XXL:xxl,XL:xl,L:l,M:m,S:s},other_size:data.product.other_size
      });

      var that = this;
      var i = 0;
      var num = 0;
      $.each(this.prodColors, function (k:any , v:any) {

        that.product_color().push(
          that.formBuilder.group({
            color: k,
            color_name: that.prodColors[k].color_name,
            front_width: that.prodColors[k].front_canvas_width,
            front_height: that.prodColors[k].front_canvas_height,
            back_width: that.prodColors[k].back_canvas_width,
            back_height: that.prodColors[k].back_canvas_height,
            id: that.prodColors[k].id,
            frontview: '',
            backview: '',
            resize_front_height: that.prodColors[k].resize_front_height,
            resize_front_width: that.prodColors[k].resize_front_width,
            front_transform: that.prodColors[k].front_canvas_transform,
            resize_back_height: that.prodColors[k].resize_back_height,
            resize_back_width:  that.prodColors[k].resize_back_width,
            back_transform: that.prodColors[k].back_canvas_transform,
            canvas_front_left: that.prodColors[k].front_canvas_left,
            canvas_front_top: that.prodColors[k].front_canvas_top,
            canvas_back_left: that.prodColors[k].back_canvas_left,
            canvas_back_top: that.prodColors[k].back_canvas_top
          })

        );
        var candata = {
          width: that.prodColors[k].resize_front_width,
          height: that.prodColors[k].resize_front_height,
          top: that.prodColors[k].front_canvas_top,
          left: that.prodColors[k].front_canvas_left,
          transform: that.prodColors[k].front_canvas_transform
      }
        that.frontcanvasresize[num] = candata;
        var canbdata = {
          width: that.prodColors[k].resize_back_width,
          height: that.prodColors[k].resize_back_height,
          top: that.prodColors[k].back_canvas_top,
          left: that.prodColors[k].back_canvas_left,
          transform: that.prodColors[k].back_canvas_transform

      }
        that.backcanvasresize[num] = canbdata;
        num++;
      });

      setTimeout(function () {
        $.each(that.prodColors, function (k: any, v: any) {
          console.log(that.prodColors);
          var pinchid = 'frontCan'+i;
          var canid = 'frontCanvas'+i;
          var pinchbackid = 'backCan'+i;
          var canbackid = 'backCanvas'+i;
          var frontleftv = that.prodColors[k].front_canvas_left;
          if(frontleftv>0){
            var frontcleft = that.prodColors[k].front_canvas_left;
          }else{
             frontcleft = that.prodColors[k].front_canvas_left;
          }
          var backleftv = that.prodColors[k].back_canvas_left;
          if(backleftv>0){
            var backleft = that.prodColors[k].back_canvas_left;
          }else{
             backleft = that.prodColors[k].back_canvas_left;
          }
          
          

           $(".frontSpan" + i).html("<div class='divf"+i+"' style='position: relative;overflow: hidden;width: 700px; margin: 0 auto;'><div class='img-box' style='width: 700px; margin: 0 auto;height:84.5vh;border: #fff solid 1px;overflow: hidden;position: relative;'><img style='width:82%;' class='img-fluid' src='" + that.appurl + that.prodColors[k].front + "'></div><pinch-zoom [auto-zoom-out]='true' [disablePan]='true' style='' id='"+pinchid+"' ><canvas class='"+canid+"' style='border: 3px dotted;position: absolute;margin:0 auto;top: "+that.prodColors[k].front_canvas_top+"px;left:"+frontcleft+"px;transform: scale("+that.prodColors[k].front_canvas_transform+");transform-origin: 0% 0%;'></canvas></pinch-zoom>");

           $(".backSpan" + i).html("<div class='divb"+i+"' style='position: relative;overflow: hidden;width: 700px; margin: 0 auto;'><div class='img-box' style='width: 700px; margin: 0 auto;height: 84.5vh;border: #fff solid 1px;overflow: hidden;position: relative;'><img style='width:82%;' class='img-fluid' src='" + that.appurl + that.prodColors[k].back + "' ></div><pinch-zoom [auto-zoom-out]='true' [disablePan]='true' style='' id='"+pinchbackid+"' ><canvas class='"+canbackid+"' style='border: 3px dotted;position: absolute;margin:0 auto;top: "+that.prodColors[k].back_canvas_top+"px;left:"+backleft+"px;transform: scale("+that.prodColors[k].back_canvas_transform+");transform-origin: 0% 0%;'></canvas></pinch-zoom><div>");

          //$(".frontSpan" + i).html("<img src='" + that.appurl + that.prodColors[k].front + "' width='250' height='250'><span class='frontCanvas' style='border: 1px dotted;position: absolute;margin:0 auto;top: 50px;left:240px;'></span>");
          //$(".backSpan" + i).html("<img src='" + that.appurl + that.prodColors[k].back + "' width='250' height='250'><span class='backCanvas' style='border: 1px dotted;position: absolute;margin:0 auto;top: 50px;left:240px;'></span>");

          // var width = ($("#canvas_front_width").val()/20)*10;
          // var height = ($("#canvas_front_height").val()/20)*10;
          var width = that.prodColors[k].front_canvas_width;
          width = width/3;
          var height = that.prodColors[k].front_canvas_height;
          height = height/3;
          $(".frontCanvas"+i).css('width',width+'px');
          $(".frontCanvas"+i).css('height',height+'px');

          var bwidth = that.prodColors[k].back_canvas_width;
          var bheight = that.prodColors[k].back_canvas_height;
          bwidth = bwidth/3;
          bheight = bheight/3;
          $(".backCanvas"+i).css('width',bwidth+'px');
          $(".backCanvas"+i).css('height',bheight+'px');
          that.draggingfront(i);
          that.draggingback(i);
         // that.frontPic[i] = that.prodColors[k].frontFile;
         // that.backPic[i] = that.prodColors[k].backFile;
/*
          that.getBase64ImageFromUrl(that.appurl + that.prodColors[k].back)
            .then(result => that.frontPic[i] = result)
            .catch(err => console.error(err));

          console.log(that.frontPic[i]);*/

          /*that.frontPic[i] = fetch(that.appurl + that.prodColors[k].front)
            .then((e) => {
              return e.blob()
            })
            .then((blob) => {
              let b: any = blob
              b.lastModifiedDate = new Date()
              b.name = ''
              return b as File
            })*/

          /*fetch(that.appurl + that.prodColors[k].front)
            .then(res => res.json()) // Gets the response and returns it as a blob
            .then(blob => {
              // Here's where you get access to the blob
              // And you can use it for whatever you want
              // Like calling ref().put(blob)

              // Here, I use it to make an image appear on the page
              let objectURL = URL.createObjectURL(blob);
              console.log(blob);
              *//*let myImage = new Image();
              myImage.src = objectURL;
              document.getElementById('myImg').appendChild(myImage)*//*
            });*/

          i++;
        });
      },2000);
      

     /* $('.frontblock').attr('src', this.appurl+data.product.frontview_file);
      $('.backblock').attr('src', this.appurl+data.product.backview_file);*/
    },(error)=>{ console.log(error) });
   }

  async getBase64ImageFromUrl(imageUrl:any) {
  var res = await fetch(imageUrl);
  var blob = await res.blob();

  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      resolve(reader.result);
    }, false);

    reader.onerror = () => {
      return reject(this);
    };
    reader.readAsDataURL(blob);
  })
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

  printPage() {
    window.print();
  }



  deleteProduct(pid:number) : any{

    //var return_value=prompt("Password:");
    var return_value=confirm("Do you want to delete this product?");
    //if(return_value==="confirm@123"){
    if(return_value){
          this.http.post(this.url+'delete-product',{product_id:pid},this.httpOptions).subscribe((result:any)=>{
            if(result.flag){
              alert(result.msg);
              //this.products = result.products;
              location.reload();
            }else{
              alert(result.error);
            }
          },(error)=>{
            console.log(error);
          });
    }else{
      return false;
    }

  }
}
