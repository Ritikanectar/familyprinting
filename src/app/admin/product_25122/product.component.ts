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
  dtOptions: any = {};
  closeResult: any;
  modalReference:any;
  submitted = false;
  products:any = [];
  productForm!:FormGroup;
  productTypes:any;
  /*frontPic: any; backPic: any;*/
  frontPic: any = []; backPic: any = [];

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
      switch(content){
        case 'frontview': 
          reader.onload = function(e:any) {
            $('.frontSpan' + i).html("<img src='" + e.target.result + "' height='100' width='100'><span style='border: 1px dotted;position: absolute;left: 0;right:0;margin:0 auto;top: 10px;' class='frontCanvas'></span>");
          }
          //this.productForm.get('frontview')!.setValue(file); 
          //this.frontPic = file;
          this.frontPic[i] = file;
          break; 
        case 'backview': 
          reader.onload = function(e:any) {
            $('.backSpan' + i).html("<img src='" + e.target.result + "' height='100' width='100'><span style='border: 1px dotted;position: absolute;left: 0;right:0;margin:0 auto;top: 10px;' class='backCanvas'></span>");
          }
          //this.productForm.get('backview')!.setValue(file); 
          //this.backPic = file;
          this.backPic[i] = file;
          break;
        // case 'frontviewsvg':           
        //   this.productForm.get('frontview_svg')!.setValue(file); break;
        // case 'backviewsvg':
        //   this.productForm.get('backview_svg')!.setValue(file); break;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  frontCanvasChange(){
    var width = ($("#canvas_front_width").val()/70)*10;
    var height = ($("#canvas_front_height").val()/70)*10;
    $(".frontCanvas").css('width',width+'px');
    $(".frontCanvas").css('height',height+'px');
  }
  backCanvasChange(){
    var width = ($("#canvas_back_width").val()/70)*10;
    var height = ($("#canvas_back_height").val()/70)*10;
    $(".backCanvas").css('width',width+'px');
    $(".backCanvas").css('height',height+'px');
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
          { data: "canvas_front_width" },
          { data: "canvas_back_width" },
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
      /*frontview:[''],
      backview:[''],
      frontview_svg: [''],
      backview_svg: [''],*/
      canvas_front_width: ['', Validators.required],
      canvas_front_height: ['', Validators.required],
      canvas_back_width: ['', Validators.required],
      canvas_back_height: ['', Validators.required]
    });

  }

  product_color(): FormArray {
    return this.productForm.get("product_color") as FormArray
  }
  newColor(): FormGroup {
    return this.formBuilder.group({
      color: '',
      color_name: '',
      id:'',
      frontview: '',
      backview: ''
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

      this.productForm.patchValue({product_name:data.product.name,product_type: data.product.type_id,
        product_size:{XXL:xxl,XL:xl,L:l,M:m,S:s},other_size:data.product.other_size,
        canvas_front_width:data.product.canvas_front_width,canvas_front_height:data.product.canvas_front_height,
        canvas_back_width:data.product.canvas_back_width,canvas_back_height:data.product.canvas_back_height
      });

      var that = this;
      var i = 0;
      $.each(this.prodColors, function (k:any , v:any) {

        that.product_color().push(
          that.formBuilder.group({
            color: k,
            color_name: that.prodColors[k].color_name,
            id: that.prodColors[k].id,
            frontview: '',
            backview: ''
          })

        );
       
      });

      setTimeout(function () {
        $.each(that.prodColors, function (k: any, v: any) {
          $(".frontSpan" + i).html("<img src='" + that.appurl + that.prodColors[k].front + "' width='70' height='70'><span class='frontCanvas' style='border: 1px dotted;position: absolute;left: 0;right:0;margin:0 auto;top: 10px;'></span>");
          $(".backSpan" + i).html("<img src='" + that.appurl + that.prodColors[k].back + "' width='70' height='70'><span class='backCanvas' style='border: 1px dotted;position: absolute;left: 0;right:0;margin:0 auto;top: 10px;'></span>");

          var width = ($("#canvas_front_width").val()/70)*10;
          var height = ($("#canvas_front_height").val()/70)*10;
          $(".frontCanvas").css('width',width+'px');
          $(".frontCanvas").css('height',height+'px');

          var width = ($("#canvas_back_width").val()/70)*10;
          var height = ($("#canvas_back_height").val()/70)*10;
          $(".backCanvas").css('width',width+'px');
          $(".backCanvas").css('height',height+'px');
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
              this.products = result.products;
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
