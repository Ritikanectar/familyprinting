import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpHeaders,HttpClient} from '@angular/common/http';
import{ GlobalConstants } from '../../common/global-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  url:string = GlobalConstants.apiURL;
  appurl:string = GlobalConstants.appurl;
  layout = {bg_image:'',logo_image:'',button_text:'Get Started',welcome_title:'Welcome',btn_radius_botleft:0,btn_radius_botright:0,
  button_bg_color:'',button_text_color:'',btn_radius_topleft:0,btn_radius_topright:0,welcome_desc:'Create Your Custom T-shirt',bg_file_extention:''};
  evid = ''; user = '';
  pageLoaded:boolean=false;

  constructor(private route:ActivatedRoute, private http:HttpClient) { }

  ngOnInit(): void {
      this.evid = this.route.snapshot.params.id;
      this.user = this.route.snapshot.params.user;
      this.http.get(this.url+'get-welcome-layout?event='+this.evid).subscribe((response:any)=>{
      if(response.welcome.app_id!=undefined){
        this.layout = response.welcome;
        this.layout.bg_image = this.appurl+response.welcome.bg_file_path;
        this.layout.logo_image = response.welcome.logo_file_path!=''? this.appurl+response.welcome.logo_file_path:'';
        //this.layout.bg_image = 'https://firebasestorage.googleapis.com/v0/b/gortonluxury.appspot.com/o/videos%2Fhero-video.mp4?alt=media&token=1231bda8-4240-4c1d-a0b9-9c5b50b320d0';
        //$(".full-video").css("background-image","url("+this.layout.bg_image+")");
        console.log(this.layout);
        //$(".full-video").attr("src",this.layout.bg_image);
      }
      this.pageLoaded=true;
    },(error)=>{
      console.log(error);
    });
  }

}
