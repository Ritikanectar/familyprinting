import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray,FormControl} from '@angular/forms';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {GlobalConstants} from '../../../common/global-constants';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['../../../admin/admin.component.css']
})
export class CreateProductComponent implements OnInit {

  productForm !: FormGroup;
  productTypeForm !: FormGroup;
  submitted = false;
  url:string = GlobalConstants.apiURL;
  httpOptions = {
    headers: new HttpHeaders({'Accept':'application/json', 'Authorization': "Bearer " + localStorage.getItem('token') }),
  };

  constructor(private http:HttpClient, private form:FormBuilder, private modalService:NgbModal, 
              private router:Router, private _location: Location) {
      if (localStorage.getItem("token") === null) {
        this.router.navigate(['/login']);
      }

      this.productForm = this.form.group({
        product_name: ['', Validators.required],
        product_color: this.form.array([]),
        product_type: ['', Validators.required],
        /*frontview:['', Validators.required],
        backview:['', Validators.required],*/
        product_size: new FormGroup({
          XXL: new FormControl(''),
          XL: new FormControl(''),
          L: new FormControl(''),
          M: new FormControl(''),
          S: new FormControl('')
        }),
        other_size:[''],
        productimg: [''],
        frontview_svg: [''],
        backview_svg: [''],
        
        
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
    return this.form.group({
      color: '',
      color_name: '',
      front_width: '',
      front_width_real:'',
      back_width_real: '',
      front_height: '',
      resize_front_width: '',
      resize_front_height:'',
      back_width: '',
      back_height: '',
      resize_back_width: '',
      resize_back_height:'',
      frontview: '',
      backview: '',
      canvas_front_left:'',
      canvas_front_top:'',
      canvas_back_left:'',
      canvas_back_top:'',
      back_transform:'',
      front_transform:''
    })
  }
  addColor() {
    this.product_color().push(this.newColor());
  }
  removeColor(i: number) {
    this.product_color().removeAt(i);
  }


  frontPic:any = []; backPic:any = [];frontcanvasresize:any = [];backcanvasresize:any = [];
  productTypes:any;
  ngOnInit(): void {
    
    this.productTypeForm = this.form.group({
      product_type_name: ['',Validators.required]
    });

    this.http.post(this.url+'get-prod-dd',{},this.httpOptions).subscribe((data:any)=>{
      this.productTypes = data.product_type;
    });

  }

  closeResult: any;
  modalReference:any;
  open(content:any) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',windowClass : "productTypeModal"}).result.then((result) => {
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

  fileClick(desc: any,i:number) {
    if (desc == 'front') {
      $('#frontview' + i).click();
    } else {
      $('#backview' + i).click();
    }
  }
  productfileClick(desc: any) {
    
    $('#productimg').click();
    
  }
 
  onFileSelect(event: any, content: any, i:number) {
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
          if(img.width != imgwidth || img.height != imgheight){
            alert('Image size should be '+imgwidth+' by '+imgheight);
          }else{
            switch(content){
              case 'frontview': 
                reader.onload = function(e:any) {
                  var pinchid = 'frontCan'+i;
                  var canid = 'frontCanvas'+i;
                  $('.frontSpan' + i).html("<div class='divf"+i+"' style='position: relative;overflow: hidden;width: 700px; margin: 0 auto;'><div class='img-box' style='width: 700px; margin: 0 auto;height:84.5vh;border: #fff solid 1px;overflow: hidden;position: relative;'><img style='width:82%;' class='img-fluid' src='" + e.target.result+"'  class='img"+i+"'></div><pinch-zoom [auto-zoom-out]='true' [disablePan]='true' style='' id='"+pinchid+"' ><canvas style='border: 3px dotted;position: absolute;margin:0 auto;top: 0px;display:none;left:270px;' id='can"+i+"' class='"+canid+"'></canvas></pinch-zoom><div>");
                }
                $('.frontrow'+i).show();
                this.frontPic[i] = file;
                break; 
              case 'backview': 
                reader.onload = function(e:any) {
                  var pinchbackid = 'backCan'+i;
                  var canbackid = 'backCanvas'+i;
                  //$('.backblock'+ i).attr('src', e.target.result);
                  $('.backSpan' + i).html("<div class='divb"+i+"' style='position: relative;overflow: hidden;width: 700px; margin: 0 auto;'><div class='img-box' style='width: 700px; margin: 0 auto;height: 84.5vh;border: #fff solid 1px;overflow: hidden;position: relative;'><img style='width:82%;' class='img-fluid' src='" + e.target.result + "' class='img"+i+"></div><pinch-zoom [auto-zoom-out]='true' [disablePan]='true' style='' id='"+pinchbackid+"' ><canvas style='border: 3px dotted;position: absolute;margin:0 auto;top: 0px;display:none;left:270px;' id='canb"+i+"' class='"+canbackid+"'></canvas></pinch-zoom><div>");
                }
                //this.productForm.get('backview')!.setValue(file); 
                $('.backrow'+i).show();
                this.backPic[i] = file;

                //this.productForm.get('product_color[' + i +']')?.setValue({ backview: file });


                break;
              // case 'frontviewsvg':           
              //   this.productForm.get('frontview_svg')!.setValue(file); break;
              // case 'backviewsvg':
              //   this.productForm.get('backview_svg')!.setValue(file); break;
            }
            reader.readAsDataURL(event.target.files[0]);
          }
        }
      }
    }
  } 
  
  frontCanvasChange(i:any){
    // var width = ($("#canvas_front_width").val()/70)*10;
    // var height = ($("#canvas_front_height").val()/70)*10;
    var width = $("#front_width"+i).val();
    var height = $("#front_height"+i).val();
    $(".frontCanvas"+i).css('width',width+'cm');
    $(".frontCanvas"+i).css('height',height+'cm');
    $(".frontCanvas"+i).css('display','block');

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
    $('.frontrowslider'+i).show();
    this.draggingfront(i);
  }
  backCanvasChange(i:any){
    var width = $("#back_width"+i).val();
    var height = $("#back_height"+i).val();
    $(".backCanvas"+i).css('width',width+'cm');
    $(".backCanvas"+i).css('height',height+'cm');
    $(".backCanvas"+i).css('display','block');

    $('.resize_back_width'+i).val(width);
    $('.resize_back_height'+i).val(height);
    $('.canvas_back_top'+i).val(0);
    $('.canvas_back_left'+i).val(0);
    // $('.back_transform'+i).val('0px,0px,0px');
    $('.back_transform'+i).val('1');
    var candata = {
      width: width,
      height: height,
      top: 0,
      left: 0,
      transform:'1'
  }
    this.backcanvasresize[i] = candata;
    $('.backrowslider'+i).show();
    this.draggingback(i);
  }
  draggingfront(i:any){
    var el: any
    el = document.querySelector('.frontCanvas'+i);
    var fcra = this.frontcanvasresize;
    let newPosX = 0, newPosY = 0, startPosX = 0, startPosY = 0;
    
    // when the user clicks down on the element
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
  }

  draggingback(i:any){
    var el: any
    el = document.querySelector('.backCanvas'+i);
    var bcra = this.backcanvasresize;
    let newPosX = 0, newPosY = 0, startPosX = 0, startPosY = 0;
    
    // when the user clicks down on the element
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
  }
  setZoom(event:any,k:any) {
    // var idval = '#'+a+k;
    // var zoom = $(idval).val()/10;
    var idval = event.value;
    var zoom = idval/10;
    var el: any
    el = document.querySelector('.frontCanvas'+k);
    // console.log($('#testv').val());
    // console.log(a);
    // console.log(zoom);
    // console.log(el);
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
    $('.front_transform'+k).val(zoom);
    var gbcr = el.getBoundingClientRect();
    var elwidth = gbcr.width;
    var elheight = gbcr.height;
    $('.resize_front_width'+k).val(elwidth);
    $('.resize_front_height'+k).val(elheight);
    var candata = {
      width: gbcr.width,
      height: gbcr.height,
      top: $('.canvas_front_top'+k).val(),
      left: $('.canvas_front_left'+k).val(),
      transform: zoom
    }
    this.frontcanvasresize[k] = candata;
    
}
setZoomBack(event:any,k:any) {
  // var idval = '#'+a+k;
  // var zoom = $(idval).val()/10;
  var idval = event.value;
  var zoom = idval/10;
  var el: any
  el = document.querySelector('.backCanvas'+k);
  // console.log($('#testv').val());
  // console.log(a);
  // console.log(zoom);
  // console.log(el);
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
  $('.back_transform'+k).val(zoom);
  var gbcr = el.getBoundingClientRect();
    var elwidth = gbcr.width;
    var elheight = gbcr.height;
    $('.resize_back_width'+k).val(elwidth);
    $('.resize_back_height'+k).val(elheight);
    var candata = {
      width: gbcr.width,
      height: gbcr.height,
      top: $('.canvas_back_top'+k).val(),
      left: $('.canvas_back_left'+k).val(),
      transform: zoom
    }
    this.backcanvasresize[k] = candata;
  
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
  //console.log(translateX+' '+translateY+' '+translateZ);
  
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
  get f() { return this.productForm.controls; }
  
  submittedPT = false;
  product_type_error = false;
  get fPt() { return this.productTypeForm.controls; }

  checkErrPType(){
    var id = $('#product_type_remove').val();
    if(id==''){
      this.product_type_error = true;
    }else{
      this.product_type_error = false;
    }
  }

  removeProductType(){
    var id = $('#product_type_remove').val();
    if(id==''){
      this.product_type_error = true;
    }else{
      this.product_type_error = false;
      this.http.post(this.url+'remove-product-type', {product_type:id}, this.httpOptions).subscribe((response:any)=>{
        console.log(response);
        if(response.flag){
          this.modalService.dismissAll();
          this.productTypes = response.product_type;
        }
        alert(response.msg);
      },(error)=>{
        console.log(error);
      });
    }
  }

  createProductType(){
    this.submittedPT = true;
    if (this.productTypeForm.invalid) {
        return;
    }
    this.http.post(this.url+'add-product-type', this.productTypeForm!.value, this.httpOptions).subscribe((response:any)=>{
      console.log(response);
      if(response.flag){
        this.modalService.dismissAll();
        this.productTypes = response.product_type;
      }
      alert(response.msg);
    },(error)=>{
      console.log(error);
    });
  }
  createProduct(){
    this.submitted = true;
    if (this.productForm.invalid) {
        return;
    }

    console.log(this.productForm.value);

    var formData:any = new FormData();
    formData.append('uid',localStorage.getItem("id"));
    $.each(this.productForm.value,function(k,v){
      formData.append(k, v);
    });
   
    formData.append('product_size', JSON.stringify(this.productForm.get('product_size')!.value));
    
    // formData.append('frontview', this.productForm.get('frontview')!.value);
    // formData.append('backview', this.productForm.get('backview')!.value);

    //console.log(this.frontPic);

    for (var i = 0; i<= this.frontPic.length; i++) {
      formData.append('frontview['+i+']', this.frontPic[i]);
    }
    $.each(this.backPic, function (k, v) {

      formData.append('backview[' + k + ']', v);
    });
    
    formData.append('frontcanvasresize', JSON.stringify(this.frontcanvasresize));
    formData.append('backcanvasresize', JSON.stringify(this.backcanvasresize));
    console.log(this.frontcanvasresize);
    console.log(this.backcanvasresize);
    formData.append('colors', JSON.stringify(this.productForm.get("product_color")!.value));
   
    /*formData.append('frontview_svg', this.productForm.get('frontview_svg')!.value);
    formData.append('backview_svg', this.productForm.get('backview_svg')!.value);*/
console.log(formData);
    this.http.post(this.url+'create-product', formData, this.httpOptions).subscribe((response:any)=>{
      console.log(response);
      if(response.flag){
        this._location.back();
      }
      alert(response.msg);
    },(error)=>{
      console.log(error);
    });

  }

}
