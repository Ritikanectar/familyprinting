import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import{ GlobalConstants } from '../../common/global-constants';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  

  url:string = GlobalConstants.apiURL;
  appurl:string = GlobalConstants.appurl;
  layout = {bg_image:'',logo_image:'',
            button_text:'Get Started',bg_file_extention:'',btn_radius_botleft:0,btn_radius_botright:0,
            button_bg_color:'',button_text_color:'',btn_radius_topleft:0,btn_radius_topright:0
          };
  evid = ''; user = '';
  pageLoaded:boolean=false;

  constructor(private route:ActivatedRoute, private http:HttpClient) { }

  ngOnInit(): void {
      this.evid = this.route.snapshot.params.id;
      this.user = this.route.snapshot.params.user;
      this.http.get(this.url+'get-landing-layout?event='+this.evid).subscribe((response:any)=>{
      if(response.landing.app_id!=undefined){
        this.layout = response.landing;
        this.layout.bg_image = this.appurl+response.landing.bg_file_path;
        this.layout.logo_image = response.landing.logo_file_path!=''? this.appurl+response.landing.logo_file_path:'';
      }
      this.pageLoaded=true;
    },(error)=>{
      console.log(error);
    });
  }

}
