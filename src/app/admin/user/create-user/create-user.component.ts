import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GlobalConstants} from '../../../common/global-constants';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['../../admin.component.css']
})
export class CreateUserComponent implements OnInit {

  url:string = GlobalConstants.apiURL;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + localStorage.getItem('token') }),
  };
  showModalBox = false;

  constructor(private http:HttpClient, private router:Router, private formbuilder:FormBuilder ) { 
    if (localStorage.getItem("token") === null) {
      this.router.navigate(['/login']);
    }
  }

  userForm!:FormGroup;
  submitted = false;
  massage = "";

  ngOnInit(): void {
    $('.headerName').html("New User");
    this.userForm = this.formbuilder.group({
      name: ['',Validators.required],
      user_name: ['',Validators.required],
      user_type: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      contact: ['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(12)]],  // Validators.min(10),
      location: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  get f() { return this.userForm.controls; }

  createUser(){
    this.submitted = true;
    if (this.userForm.invalid) {
        return;
    }

    const data = {
      data: this.userForm.value,
      uid:localStorage.getItem('id')
    };

    this.http.post(this.url+'create-user',data,this.httpOptions).subscribe((response:any)=>{
      if(response.flag){
        alert(response.msg);
        setTimeout(() => {
          this.router.navigate(['admin/user']);
        }, 2000);
      }
    },
    (error)=>{
        console.log(error);
    });
  }
}
