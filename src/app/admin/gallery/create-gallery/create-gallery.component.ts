import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {GlobalConstants} from '../../../common/global-constants';

@Component({
  selector: 'app-create-gallery',
  templateUrl: './create-gallery.component.html',
  styleUrls: ['../../admin.component.css']
})
export class CreateGalleryComponent implements OnInit {

  galleryForm!: FormGroup;
  submitted = false;
  url:string = GlobalConstants.apiURL;
  httpOptions = {
    headers: new HttpHeaders({'Accept':'application/json', 'Authorization': "Bearer " + localStorage.getItem('token') }),
  };
  headerName:any;
  loader:boolean = false;

  constructor(private formBuilder : FormBuilder, private http:HttpClient, private router:Router) { }

  get f() { return this.galleryForm.controls; }

  ngOnInit(): void {

    this.headerName = 'CREATE GALLERY';
    $('.headerName').html(this.headerName);
    this.galleryForm = this.formBuilder.group({
      title: ['', Validators.required],
      bgimage: ['', Validators.required]
    });

  }

  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.galleryForm.get('bgimage')!.setValue(file);
    }
  }

  create_gallery(){
    this.submitted = true;
    if (this.galleryForm.invalid) {
        return;
    }
   // var form:any = document.querySelector('form');
    this.loader = true;
    var formData:any = new FormData();

    // for (var [key, value] of formData.entries()) { 
    //   console.log(key, value);
    // }
    
    formData.append('uid',localStorage.getItem("id"));
    formData.append('title', this.galleryForm.get('title')!.value);
    formData.append('bgimage', this.galleryForm.get('bgimage')!.value);

    this.http.post(this.url+'create-gallery',formData, this.httpOptions).subscribe((response:any)=>{
      alert(response.msg);
      this.loader = false;
      if(response.flag){
        setTimeout(() => {
          this.router.navigate(['admin/gallery']);
        }, 2000);
      }
    },(error)=>{
      console.log('failure');
      console.log(error);
    });
  }

}
