import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router,ActivatedRoute} from '@angular/router';
import {GlobalConstants} from '../../common/global-constants';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {

  url:string = GlobalConstants.apiURL;
  appurl:string = GlobalConstants.appurl;
  urldata:any = {event:'',user:''};
  thankyou:any = [];
  constructor(private http:HttpClient, private router:Router, private route:ActivatedRoute) {
    this.urldata.event = this.route.snapshot.params.id;
    this.urldata.user = this.route.snapshot.params.user;

    var splittedUsr = this.urldata.user.split("_");

    this.http.post(this.url+'get-thankyou',this.urldata).subscribe((data:any)=>{
      console.log(data);
      this.thankyou = data.thankyou;
      this.thankyou.bg_thankyou_file = this.appurl+data.thankyou.bg_thankyou_file;
      this.thankyou.logo_image = this.appurl+data.thankyou.logo_file_path;
      if(data.thankyou.redirect_url!=''){
        setTimeout(() => {
          var prefix = 'http://';
          if (data.thankyou.redirect_url.substr(0, prefix.length) !== prefix)
          {
            data.thankyou.redirect_url = prefix + data.thankyou.redirect_url;
          }
         // var checkurl = 'http://fpuat.nectarinfotel.com/#';
          //var checkurl = 'http://localhost:4200/#';
          //if (data.thankyou.redirect_url.substr(0, checkurl.length) == checkurl)
          //{
          //  data.thankyou.redirect_url = data.thankyou.redirect_url.replace(checkurl, '');
         // }
            if(splittedUsr[1]!=undefined && splittedUsr[1]=='Virtual'){
              console.log('123');
              //window.open(data.thankyou.redirect_url, "_blank");
              //window.location.href = data.thankyou.redirect_url;
              window.location.replace(data.thankyou.redirect_url);
            }else if(splittedUsr[1]!=undefined && splittedUsr[1]=='E-Com'){
              console.log('112');
              //window.location.href = data.thankyou.redirect_url;
              window.location.replace(data.thankyou.redirect_url);
              
            }else{
              var removeurl = this.urldata.user;
              removeurl = removeurl.substring(0, removeurl.indexOf('_')); 
              console.log(removeurl);
              setTimeout(() => {
              // window.location.replace("http://fpuat.nectarinfotel.com/#/landing/"+this.urldata.event+"/"+this.urldata.user);
               window.location.replace("http://fpuat.nectarinfotel.com/#/landing/"+this.urldata.event+"/"+removeurl);
              }, 5000);
            }
          
         
        }, 5000);
      }
    },(error)=>{ console.log(error) });
   }

  ngOnInit(): void {
  }

}
