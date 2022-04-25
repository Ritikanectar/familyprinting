import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import{ GlobalConstants } from '../../common/global-constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../admin.component.css']
})
export class UserComponent implements OnInit {

  url:string = GlobalConstants.apiURL;
  dtOptions: any = {};
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + localStorage.getItem('token') }),
  };
  users:any = [{'username':'','id':'','email':'','contact':'','location':'','user_type':'','is_active':0}];
  submitted = false;
  massage = "";

  constructor(private http:HttpClient, private modalService:NgbModal, private form:FormBuilder, private router:Router) { 
    this.userForm = this.form.group({
      name: ['',Validators.required],
      user_name: ['',Validators.required],
      user_type: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      contact: ['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(12)]],  // Validators.min(10),
      location: ['',Validators.required],
      status:  ['',Validators.required],
      //password: ['',Validators.required]
    });
  }

  closeResult: any;
  modalReference:any;
  user:any; userId:number=0;
  userForm!:FormGroup;

  createUser(){
    this.submitted = true;
    if (this.userForm.invalid) {
        return;
    }
    //alert(this.userId);
    const data = {
      data: this.userForm.value,
      user_id: this.userId,
      uid:localStorage.getItem('id')
    };
    
    this.http.post(this.url+'update-user',data, this.httpOptions).subscribe((response:any)=>{
      if(response.flag){
        this.modalService.dismissAll();
        this.users = response.users;
      }
      alert(response.msg);
    },(error)=>{
      console.log('failure');
      console.log(error);
    });
  }

  get f() { return this.userForm.controls; }

  open(content:any,userID:any) {

    this.userId = userID;
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',windowClass : "eventViewModal"}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
    this.http.post(this.url+'get-user',{user_id:userID},this.httpOptions).subscribe((data:any)=>{
      this.user = data.user;
      
      this.userForm.patchValue({user_type:data.user.user_type,name: data.user.name,
                                 user_name:data.user.username,
                                 //password:data.user.password,
                                 status: data.user.is_active,
                                 email:data.user.email,contact:data.user.contact,
                                 location:data.user.location});
    },(error)=>{ console.log(error) });
   }
   
   private getDismissReason(reason: any): string {
     if (reason === ModalDismissReasons.ESC) {
       return 'by pressing ESC';
     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
       return 'by clicking on a backdrop';
     } else {
       return  `with: ${reason}`;
     }
   }

  ngOnInit(): void {

    $('.headerName').html("Users");
    this.http.post(this.url+'get-users',{},this.httpOptions).subscribe((response:any)=>{
      this.users = response.users;
    },(error)=>{
        console.log(error);
    });

    var that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback:any) => {
        that.http
              .post(that.url+'get-users',dataTablesParameters,this.httpOptions)
              .subscribe((result:any) => {
                that.users = result.users.aaData;
                  callback({
                      recordsTotal: result.users.iTotalRecords, // result.recordsTotal
                      recordsFiltered: result.users.iTotalDisplayRecords, //result.recordsFiltered
                      data: [],
                  });
              });
      },
      columns: [
          { data: "name" },
          { data: "type" },
          { data: "email" },
          { data: "contact" },
          { data: "location" },
          { data: "status" },
          { data: "action" }
      ],
      // dom: 'Bfrtip',
      // buttons: [ 'print', 'excel', 'pdf' ]
      // lengthMenu: [[25, 100, -1,4,5,9,7,8], [25, 100, -1,4,5,9,7,8]],
      // pageLength: 25,
     
    };

  }

  uid:any = "";
  checkAuth() : any{
    this.uid = localStorage.getItem("id");
    if(this.uid == undefined || this.uid != 1){
      return "";
    }
    return "Exist";
  }

  deleteUser(uid:any) : any{

    //var return_value=prompt("Password:");
    var return_value=confirm("Do you want to deactivate this user?");
   // if(return_value==="confirm@123"){
    if(return_value){
      this.http.post(this.url+'deactive-user',{'user_id':uid},this.httpOptions).subscribe((response:any)=>{
        alert(response.msg);
        this.users = response.users;
      },(error)=>{
          console.log(error);
      });
    }else{
      return false;
    }
  }

}
