import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import {GlobalConstants} from '../../../common/global-constants';

@Component({
  selector: 'app-assign-gallery',
  templateUrl: './assign-gallery.component.html',
  styleUrls: ['../../admin.component.css']
})
export class AssignGalleryComponent implements OnInit {

  url:string = GlobalConstants.apiURL;
  appurl:string = GlobalConstants.appurl;
  httpOptions = {
    headers: new HttpHeaders({'Accept':'application/json', 'Authorization': "Bearer " + localStorage.getItem('token') }),
  };
  galleryForm!:FormGroup;
  gallery:any = [];
  galleryType:any; headerName:any;

  constructor(private formBuilder : FormBuilder, private http:HttpClient, private router:Router, private actRoute:ActivatedRoute, private location:Location) { }

  ngOnInit(): void {
    this.headerName = 'ASSIGN GALLERY';
    $('.headerName').html(this.headerName);
    this.galleryType = this.actRoute.snapshot.params.gallery;
    this.http.get(this.url+'get-gallery',this.httpOptions).subscribe((data:any)=>{
      this.gallery = data.gallery;
    });
    this.galleryForm = this.formBuilder.group({
      galleries: ['']
    });
  }

  GalleryIDs:any = [];
  pushGal(id:any,event:any,i:any){
    if(event.checked){
      this.GalleryIDs.push(id);
      if(this.galleryType=='single_gallery'){
        $("input[type='checkbox']").attr('disabled','true');
        $("#gal"+i).removeAttr('disabled');
      }
    }else{
      const index = this.GalleryIDs.indexOf(id);
      if (index > -1) {
        this.GalleryIDs.splice(index, 1);
        if(this.galleryType=='single_gallery'){
          $("input[type='checkbox']").removeAttr('disabled');
        }
      }
    }
  }

  assignGallery(){
    const prodID = this.actRoute.snapshot.params.product;
    const event = this.actRoute.snapshot.params.event;
    this.http.post(this.url+'assign-gallery',{gallery:JSON.stringify(this.GalleryIDs),product:prodID,event:event,uid:localStorage.getItem("id")},this.httpOptions).subscribe(
      (response:any)=>{
        //console.log(response);
        if(response.flag){
          setTimeout(() => {
            this.location.back();
          }, 2000);
        }
        alert(response.msg);
      },
      (error:any)=>{
        console.log(error);
      }
    )
  }
}
