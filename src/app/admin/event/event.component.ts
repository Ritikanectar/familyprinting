import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpHeaders,HttpClient} from '@angular/common/http';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {GlobalConstants} from '../../common/global-constants';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['../admin.component.css'],
  providers: [DatePipe]
})
export class EventComponent implements OnInit {
  
  url:string = GlobalConstants.apiURL;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + localStorage.getItem('token') }),
  };
  headerName:any;
  dtOptions: any = {};
  closeResult: any;
  modalReference:any;
  event:any = [];
  appType:any = [];
  eventType:any = [];
  executive:any = [{'name':'','id':0}];
  events = [{'app_name':'','event_type':'','start_datetime':'','end_datetime':'','event_place':'','event_id':'','name':'','client':''}];
  eventForm!: FormGroup;
  submitted = false;
  exec:string = ""; message:string = "";
  eventId:number = 0;
  today:any;
 // stores = [{ 'storeName': '', 'storeId': '' }];

  constructor(private router:Router, private formBuilder : FormBuilder, private datePipe: DatePipe,
    private http:HttpClient, private modalService:NgbModal, private activeModal:NgbActiveModal) {
    if (localStorage.getItem("token") === null) {
      this.router.navigate(['/login']);
    }
    var d = new Date();    ;
    this.today = d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2)+"T00:00";
    //alert(this.today);
   }

  ngOnInit(): void {

    this.headerName = 'Events';
    $('.headerName').html(this.headerName);
    var that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback:any) => {
        that.http
              .post(that.url+'get-events',dataTablesParameters,this.httpOptions)
              .subscribe((result:any) => {
                that.events = result.event.aaData;
                  callback({
                      recordsTotal: result.event.iTotalRecords, // result.recordsTotal
                      recordsFiltered: result.event.iTotalDisplayRecords, //result.recordsFiltered
                      data: [],
                  });
              });
      },
      columns: [
          { data: "event_name" },
          { data: "client" },
          { data: "event_type" },
          { data: "builder" },
          { data: "start_datetime" },
          { data: "end_datetime" },
          { data: "event_place" },
          { data: "options" },
      ],
      // dom: 'Bfrtip',
      // buttons: [ 'print', 'excel', 'pdf' ]
      // lengthMenu: [[25, 100, -1,4,5,9,7,8], [25, 100, -1,4,5,9,7,8]],
      // pageLength: 25,
     
    };

    this.eventForm = this.formBuilder.group({
      app_name: ['', Validators.required],
      app_type: ['', Validators.required],
      event_type: [''],
      start_date: ['', Validators.required],
      end_date: ['', [Validators.required]],
      orientation: ['', [Validators.required]],
      location: ['', [Validators.required]],
      exec: ['', Validators.required],
     // stores: ['', Validators.required],
      client: ['', Validators.required],
      order_prefix: ['', Validators.required]
    });

    this.http.post(this.url+'get-event-dd', {} , this.httpOptions).subscribe((response:any)=>{
        console.log(response);
        this.appType = response.ap_type;
        this.eventType = response.ev_type;
        this.executive = response.executive;
       // this.stores = response.stores;
    },(error)=>{ console.log(error); });
  }

  printPage() {
    window.print();
  }

  httpOptionsExp = {
    headers: new HttpHeaders({ 'Content-Type': 'application/text', 'Authorization': "Bearer " + localStorage.getItem('token') }),
  };

  excelExport(){
      this.http.post(this.url+'export-event',{},this.httpOptionsExp).subscribe((data:any)=>{
      console.log(data);
      },(error)=>{ console.log(error) });
  }

  open(content:any,evID:any) {

    this.eventId = evID;
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',windowClass : "eventViewModal"}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
    this.http.post(this.url+'get-event',{event_id:evID},this.httpOptions).subscribe((data:any)=>{
      this.event = data.event;
      console.log(this.event);
      this.eventForm.patchValue({app_name:data.event.app_name,location: data.event.event_place,
                                 app_type:data.event.app_type,event_type:data.event.event_type,
                                 start_date:data.event.start_date,end_date:data.event.end_datetime,
                                 order_prefix: data.event.order_prefix,
                                 orientation:data.event.orientation,exec:data.event.exec,client:data.event.client
                                });
    },(error)=>{ console.log(error) });
   }
   
   maxLimit(event:any){
    this.event.start_date = event.target.value;
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

  uid:any = "";
  checkAuth() : any{
    this.uid = localStorage.getItem("id");
    if(this.uid == undefined || this.uid != 1){
      return "";
    }
    return "Exist";
  }

  get f() { return this.eventForm.controls; }

  createEvent(){

    this.submitted = true;
    if (this.eventForm.invalid) {
        return;
    }

    const data = {
      data: this.eventForm.value,
      event_id: this.eventId,
      uid:localStorage.getItem('id')
    };
    
    this.http.post(this.url+'update-event',data, this.httpOptions).subscribe((response:any)=>{
      if(response.flag){
        this.events=response.events;
        this.modalService.dismissAll();
      }
      alert(response.msg);
    },(error)=>{
      console.log('failure');
      console.log(error);
    });
    
  }

  deleteEvent(evid:any) : any{

    //var return_value=prompt("Password:");
    var return_value=confirm("Do you want to delete this event?");
    //if(return_value==="confirm@123"){
    if(return_value){
          this.http.post(this.url+'delete-events',{event_id:evid},this.httpOptions).subscribe((result:any)=>{
            if(result.flag){
              alert(result.msg);
              this.events = result.event;
            }else{
              alert(result.error);
            }
          },(error)=>{
            console.log(error);
          });
    }else{
      return false;
    }
    
  }

}
