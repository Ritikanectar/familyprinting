import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import{ GlobalConstants } from '../../common/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  url:string = GlobalConstants.apiURL;
  msgColor = 'green';
  message = '';
  submitted:boolean = false;
  authForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private HttpClnt: HttpClient, private router:Router) {}

  get f() { return this.authForm.controls; }

  callApi(){
    this.submitted = true;
    if (this.authForm.invalid) {
        return;
    }
    const formdata = this.authForm.getRawValue();
    const data = {
      email:formdata.username,
      password:formdata.password,
      grant_type:'password',
      client_id:2,
      client_secret:'g6mPVDaSguY6IXx1LnlbtBxMNo7qGKfEMowCxEiD',
      scope:'*'
    };
    
    this.HttpClnt.post(this.url+'login', data).subscribe((result:any)=>{
      if(result.flag){
        localStorage.setItem('token',result.token);
        localStorage.setItem('id',result.id);
        localStorage.setItem('user_type',result.user_type);
        if(result.user_type==2){
          this.router.navigate(['/home']);
        }else{
          this.router.navigate(['/admin/dashboard']);
        }
        
      }else{
        this.msgColor = 'red';
        this.message = result.error;
      }
    },
    (error)=>{
      console.log('failure');
      console.log(error);
    }
    );


    
  }

  ngOnInit(): void {
  }

}
