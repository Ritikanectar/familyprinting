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
        frontview_svg: [''],
        backview_svg: [''],
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
    return this.form.group({
      color: '',
      color_name: '',
      frontview: '',
      backview: ''
    })
  }
  addColor() {
    this.product_color().push(this.newColor());
  }
  removeColor(i: number) {
    this.product_color().removeAt(i);
  }


  frontPic:any = []; backPic:any = [];
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

  onFileSelect(event: any, content: any, i:number) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      var reader = new FileReader();
      
      // let arr: any[] = [];  
      // Object.keys(file).map(function(key){  
      //     arr.push({[key]:file[key]})  
      //     return arr;  
      // });  
      // console.log('Object=',file)  
      // console.log('Array=',arr)  


      switch(content){
        case 'frontview': 
          reader.onload = function(e:any) {
            $('.frontSpan' + i).html("<img src='" + e.target.result+"' height='100' width='100'><span style='border: 1px dotted;position: absolute;left: 0;right:0;margin:0 auto;top: 10px;display:none;' class='frontCanvas'></span>");
          }
          //this.productForm.patchValue({'frontview':file});
          //this.productForm.get('frontview')!.setValue(file); 
          this.frontPic[i] = file;
          //this.productForm.get('product_color['+i+']')?.setValue({ frontview: file });
          break; 
        case 'backview': 
          reader.onload = function(e:any) {
            //$('.backblock'+ i).attr('src', e.target.result);
            $('.backSpan' + i).html("<img src='" + e.target.result + "' height='100' width='100'><span style='border: 1px dotted;position: absolute;left: 0;right:0;margin:0 auto;top: 10px;display:none;' class='backCanvas'></span>");
          }
          //this.productForm.get('backview')!.setValue(file); 
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

  
  frontCanvasChange(){
    var width = ($("#canvas_front_width").val()/70)*10;
    var height = ($("#canvas_front_height").val()/70)*10;
    $(".frontCanvas").css('width',width+'px');
    $(".frontCanvas").css('height',height+'px');
    $(".frontCanvas").css('display','block');
  }
  backCanvasChange(){
    var width = ($("#canvas_back_width").val()/70)*10;
    var height = ($("#canvas_back_height").val()/70)*10;
    $(".backCanvas").css('width',width+'px');
    $(".backCanvas").css('height',height+'px');
    $(".backCanvas").css('display','block');
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
    
    //formData.append('backview', this.backPic);

    formData.append('colors', JSON.stringify(this.productForm.get("product_color")!.value));

    /*formData.append('frontview_svg', this.productForm.get('frontview_svg')!.value);
    formData.append('backview_svg', this.productForm.get('backview_svg')!.value);*/

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
