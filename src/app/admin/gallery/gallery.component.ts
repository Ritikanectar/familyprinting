import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import {GlobalConstants} from '../../common/global-constants';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['../admin.component.css']
})
export class GalleryComponent implements OnInit {

  url:string = GlobalConstants.apiURL;
  appurl:string = GlobalConstants.appurl;
  httpOptions = {
    headers: new HttpHeaders({'Accept':'application/json', 'Authorization': "Bearer " + localStorage.getItem('token') }),
  };
  gallery:any = []; headerName:any;

  constructor(private formBuilder : FormBuilder, private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.headerName = 'GALLERY';
    $('.headerName').html(this.headerName);
    this.http.get(this.url+'get-gallery',this.httpOptions).subscribe((data:any)=>{
      this.gallery = data.gallery;
      if(this.gallery.length<=0){
        $(".noData").html('No Gallery Created');
      }
    });
  }

  sortGallery(sort:any){
    this.headerName = 'GALLERY';
    $('.headerName').html(this.headerName);
    this.http.get(this.url+'get-gallery?sort='+sort,this.httpOptions).subscribe((data:any)=>{
      this.gallery = data.gallery;
      if(this.gallery.length<=0){
        $(".noData").html('No Gallery Created');
      }
    });
  }

  deleteGallery(id:any){
    var conf = confirm("Gallery will permanently delete. Are you sure?");
    if(conf){
      this.http.get(this.url+'delete-gallery?id='+id,this.httpOptions).subscribe((data:any)=>{
        this.gallery = data.gallery;
        setTimeout(() => {
          if(this.gallery.length<=0){
            $(".noData").html('No Gallery Created');
          }
        },1000);
      });
    }
  }

}
