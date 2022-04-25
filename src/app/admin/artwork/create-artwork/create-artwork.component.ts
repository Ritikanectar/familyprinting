import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {GlobalConstants} from '../../../common/global-constants';

@Component({
  selector: 'app-create-artwork',
  templateUrl: './create-artwork.component.html',
  styleUrls: ['../../admin.component.css']
})
export class CreateArtworkComponent implements OnInit {

  artworkForm!: FormGroup;
  submitted = false;
  url:string = GlobalConstants.apiURL;
  httpOptions = {
    headers: new HttpHeaders({'Accept':'application/json', 'Authorization': "Bearer " + localStorage.getItem('token') }),
  };
  gallery:any;headerName:any;

  constructor(private _DomSanitizationService: DomSanitizer,private formBuilder : FormBuilder, private http:HttpClient, private router:Router, private actRoute:ActivatedRoute) { 
    this.gallery = this.actRoute.snapshot.params.gallery;
  }

  ngOnInit(): void {

    this.headerName = 'Upload Artworks';
    $('.headerName').html(this.headerName);
    this.artworkForm = this.formBuilder.group({
     // title: ['', Validators.required],
      bgimage: ['', Validators.required]
    });

  }
  get f() { return this.artworkForm.controls; }
  urls:any = [];
  artworkImgs:any = [];
  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      
      for(var i=0; i<event.target.files.length; i++){
        const file = event.target.files[i];
        this.artworkImgs.push(file);
      }
      this.urls = [];
      let files = event.target.files;
      if (files) {
        for (let file of files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            var imgData = e.target.result.replace('unsafe:','');
            console.log(imgData);
            this.urls.push(imgData);
          }
          reader.readAsDataURL(file);
        }
      }
    }
  }

  loader:boolean=false;
  create_clipart(){

    this.submitted = true;
    if (this.artworkForm.invalid) {
      return;
    }
    
    this.loader = true;
    var formData:any = new FormData();
    formData.append('uid',localStorage.getItem("id"));
    formData.append('gallery',this.gallery);
    //formData.append('title', this.artworkForm.get('title')!.value);
    for(var i=0; i<this.artworkImgs.length; i++){
      formData.append('clipart_'+i, this.artworkImgs[i])
    }

    this.http.post(this.url+'create-artwork',formData, this.httpOptions).subscribe((response:any)=>{
      alert(response.msg);
      this.loader = false;
      if(response.flag){
        setTimeout(() => {
          this.router.navigate(['admin/artwork/'+this.gallery]);
        }, 2000);
      }
    },(error)=>{
      console.log('failure');
      console.log(error);
    });
  }

}
