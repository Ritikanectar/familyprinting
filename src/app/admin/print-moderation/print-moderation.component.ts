import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {GlobalConstants} from '../../common/global-constants';

@Component({
  selector: 'app-print-moderation',
  templateUrl: './print-moderation.component.html',
  styleUrls: ['../admin.component.css']
})
export class PrintModerationComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + localStorage.getItem('token') }),
  };
  url:string = GlobalConstants.apiURL;
  appurl:string = GlobalConstants.appurl;
  dtOptions: DataTables.Settings = {};
  printData = [{ 'order_id': '','reciept_id':'','app_name':'','product_name':'','first_name':'','last_name':'','created_date':'','email':'','status':''}];
  frontProduct:any; backProduct:any; headerName:any;
  events:any = [];
  constructor(private formBuilder : FormBuilder, private http:HttpClient, private router:Router,
    private modalService: NgbModal, private activeModal: NgbActiveModal, private location: Location) {
    if (localStorage.getItem("token") === null) {
      this.router.navigate(['/login']);
    }
    this.http.post(this.url+'get-events',{},this.httpOptions).subscribe((result:any) => {
      this.events = result.event.aaData;
      console.log(this.events);
    });
   }
   activeEvent:any = '';
  ngOnInit(): void {
    this.headerName = 'PRINT MODERATION';
    $('.headerName').html(this.headerName);
    var that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      searching: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
              .post(that.url+'get-order-list?event='+this.activeEvent,dataTablesParameters,this.httpOptions)
              .subscribe((result:any) => {
                  console.log(result);
                  that.printData = result.orders.aaData;
                  callback({
                      recordsTotal: result.orders.iTotalRecords, // result.recordsTotal
                      recordsFiltered: result.orders.iTotalDisplayRecords, //result.recordsFiltered
                      data: [],
                  });
              });
      },
      columns: [
          { data: "reciept_id" },
          { data: "event_name" },
          { data: "product_name" },
          { data: "first_name" },
          { data: "email" },
          { data: "status" },
          { data: "created_date" },
          { data: "action" }
      ],
  };

  }
  
  eventFilter(){
    this.activeEvent = $("#eventfilter").val();
   
    if (this.activeEvent != '' && this.dtOptions!=undefined) {
      let test:any = this.dtOptions;
      $('#tablePreview').DataTable().column(1).search(this.activeEvent).draw();
    } else {
        alert('typeDropdown ELSE');
    }
  }

  printingDesign() {

    this.location.go(this.url + 'get-design-pdf');

    /*this.http.get(this.url + 'get-design-pdf', this.httpOptions).subscribe((data: any) => {
      console.log(data);
    }, (error) => { console.log(error) });*/
  }

  printPreview(){
    window.print();
  }
  closeResult: any;
  modalReference:any;
  urldata:any = {event:'',user:'',product:'',client:''};
  product:any = {prod_type:''}; print:any = []; sizeArr:any = []; user:any = {first_name:'',last_name:'',email:''}
  fonts:any = [];
  orderProp:any = [];
  productImg: any = [];

  open(content:any,order:any) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',windowClass : "prod-pre-modal"}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.urldata.event = order.event_id;
    this.urldata.user = order.reg_id;
    this.urldata.client = order.reg_id;
    this.urldata.product = order.product_id;
    this.urldata.order_id = order.order_id;
    this.urldata.productColor = order.product_color;
    this.urldata.pdf_file_name = order.pdf_file_name;

    this.http.post(this.url+'get-print-prop',this.urldata).subscribe((data:any)=>{
      console.log(data);
      this.product = data.product;
      this.print = data.print;
      this.sizeArr = data.sizeArr;
      this.user = data.user;
      this.fonts = data.font;
      this.orderProp = data.order;
      this.productImg = data.productImage;
      this.urldata.orderNum = data.recieptNum;
      //setsvg(this.sizeArr.frontcsswidth,this.sizeArr.frontcssheight,this.sizeArr.backcsswidth,this.sizeArr.backcssheight);
      //setsvg(fwidth:any,fheight:any,bwidth:any,bheight:any){
        
//}
    },(error)=>{ console.log(error) });
  }

    getHtml(htmlDt: any, id: any) {
      $("#" + id).html(htmlDt);
      var x = document.getElementsByTagName("svg") ;
  console.log(x.length);
  if(x.length === 0 ){}else{
        for (let i = 0; i < x.length; i++) {
          console.log('innnnngg');
          let element = x[i];
          if(i == 0 && this.sizeArr.frontcsswidth != '' && this.sizeArr.frontcssheight != ''){
            console.log(this.sizeArr.frontcsswidth);
            console.log(this.sizeArr.frontcssheight);
            element.style.width = this.sizeArr.frontcsswidth;
            element.style.height = this.sizeArr.frontcssheight;
          }
          if(i == 1 && this.sizeArr.backcsswidth != '' && this.sizeArr.backcssheight != ''){
            console.log(this.sizeArr.backcsswidth);
            console.log(this.sizeArr.backcssheight);
            element.style.width = this.sizeArr.backcsswidth;
            element.style.height = this.sizeArr.backcssheight;
          }
          
        }}
     // return 1;
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

}
