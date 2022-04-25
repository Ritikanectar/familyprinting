import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { LocationStrategy, HashLocationStrategy,Location } from '@angular/common';
import{ GlobalConstants } from '../common/global-constants';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AdminComponent implements OnInit {

  url:string = GlobalConstants.apiURL;
  locationSegments:any; headerName:any;
  roleName:string = '';
  constructor(private http:HttpClient, private router:Router, private location: Location) { }

  ngOnInit(): void { 
    this.getPath(); 
    if (localStorage.getItem("user_type") != null) {
      switch(localStorage.getItem("user_type")){
        case '1' : this.roleName = 'Admin'; break;
        case '3' : this.roleName = 'Manager'; break;
        case '4' : this.roleName = 'Staff'; break;
      }
    }
  }
  
  getPath(){
    let locationPath = this.location.path();
    console.log(this.location.path());
    if (locationPath.length){
      this.locationSegments = locationPath.split('/');
    };
    this.headerName = this.locationSegments[2];
    $('.headerName').html(this.headerName);
  }

  openNav() {
    $("#mySidenav").css('width','250px');
    $("#main").css('marginLeft','250px');
  }
  
  closeNav() {
    $("#mySidenav").css('width','0');
    $("#main").css('marginLeft','0');
  }

  logout() {
    this.http.get(this.url+'logout',{}).subscribe((result:any)=>{
      localStorage.clear();
      this.router.navigate(['/login']);
    },
    (error:any)=>{
      console.log(error);
    }
    );
  }
}
