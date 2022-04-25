import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {GlobalConstants} from '../../../common/global-constants';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['../../admin.component.css']
})
export class CreateEventComponent implements OnInit {

  eventForm!: FormGroup;
  submitted = false;
  url:string = GlobalConstants.apiURL;
  exec = ""; massage = "";
  appType = []; eventType = []; executive = [{'name':'','id':0}];
 // stores = [{ 'storeName': '','storeId':''}];

  dropdownSettings = {}; selectedItems=[];
  
  today:any;

  /*eventForm = new FormGroup({
    app_type: new FormControl(''),
    event_type: new FormControl(''),
    start_date: new FormControl(''),
    end_date: new FormControl(''),
    orientation: new FormControl(''),
    location: new FormControl(''),
    app_name: new FormControl('')
  });*/

  /*event_type: new FormGroup({
      1: new FormControl(''),
      2: new FormControl(''),
      3: new FormControl('')
    }),*/

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + localStorage.getItem('token') }),
  };
  minDate:string=''; maxDate:any='';

  constructor(private formBuilder : FormBuilder, private http:HttpClient, private router:Router){
    if (localStorage.getItem("token") === null) {
      this.router.navigate(['/login']);
    }
    var d:any = new Date();
    this.today = d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2)+"T00:00";
    this.minDate = this.today;
  }
  
  ngOnInit(): void {

    $('.headerName').html("New Event");
    this.eventForm = this.formBuilder.group({
      app_name: ['', Validators.required],
      app_type: ['', Validators.required],
      event_type: [''],
      order_prefix: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', [Validators.required]],
      orientation: ['', [Validators.required]],
      location: ['', [Validators.required]],
      exec: ['', Validators.required],
    //  stores: ['', Validators.required],
      client: ['',Validators.required]
    });

    this.dropdownSettings = { 
      singleSelection: false, 
      text:"Select Countries",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    };
     
    
    this.http.post(this.url+'get-event-dd', {} , this.httpOptions).subscribe((response:any)=>{
      console.log(response);
        this.appType = response.ap_type;
        
      this.eventType = response.ev_type;
     // this.stores = response.stores;

        this.executive = response.executive;
    },(error)=>{ console.log(error); });

  }

  get f() { return this.eventForm.controls; }

  maxLimit(event:any){
    //2021-09-03T00:00
    this.minDate = event.target.value;
  }

  createEvent(){

    this.submitted = true;

    // stop here if form is invalid
    if (this.eventForm.invalid) {
        return;
    }
    const data = {
      data: this.eventForm.value,
      uid:localStorage.getItem('id')
    };
    
    this.http.post(this.url+'create-event',data, this.httpOptions).subscribe((response:any)=>{
      if(response.flag){
        this.massage = response.msg;
        setTimeout(() => {
          this.router.navigate(['admin/event']);
        }, 2000);
      }
    },(error)=>{
      console.log('failure');
      console.log(error);
    });
    
  }

}
