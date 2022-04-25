// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Renderer2, Input, Output, EventEmitter, HostListener, HostBinding, 
  AfterViewInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router,ActivatedRoute} from '@angular/router';
import {GlobalConstants} from '../../../common/global-constants';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnd, CdkDragStart, CdkDragMove } from '@angular/cdk/drag-drop';
import * as $ from 'jquery';
import 'jqueryui';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { fabric } from 'fabric';

@Component({
  selector: 'app-previewfront',
  templateUrl: './previewfront.component.html',
  styleUrls: ['./previewfront.component.css']
})
export class PreviewfrontComponent implements OnInit {
url:string = GlobalConstants.apiURL;
appurl:string = GlobalConstants.appurl;
urldata: any = { event: '', user: '', product: '', client: '', productSize: '', orderNum: '', productColor: ''};
product:any = {prod_type:''}; print:any = []; user:any = {first_name:'',last_name:'',email:''}
fonts: any = [];
productImg: any = [];

constructor(private http:HttpClient, private router:Router, private route:ActivatedRoute) {
  this.urldata.event = this.route.snapshot.params.id;
  this.urldata.user = this.route.snapshot.params.user;
  this.urldata.client = this.route.snapshot.params.client;
  this.urldata.product = this.route.snapshot.params.product;

  /*var productIDSZ = this.urldata.product.split('_');
  this.urldata.product = productIDSZ[0];
  this.urldata.productSize = productIDSZ[1];*/

  var productIDSZ = this.urldata.product.split('__');
  this.urldata.product = productIDSZ[0];
  this.urldata.productSize = productIDSZ[1];
  this.urldata.productColor = productIDSZ[2];

  this.http.post(this.url+'get-print-prop',this.urldata).subscribe((data:any)=>{
    console.log(data);
    this.product = data.product;
    this.print = data.print;
    this.user = data.user;
    this.fonts = data.font;
    this.productImg = data.productImage;
    this.urldata.orderNum = data.recieptNum;
    this.urldata.canvas_front_width = this.product.canvas_front_width
    this.urldata.canvas_front_height = this.product.canvas_front_height
    this.urldata.canvas_back_width = this.product.canvas_back_width
    this.urldata.canvas_back_height = this.product.canvas_back_height
  },(error)=>{ console.log(error) });
}

printReciept() {
  window.print();
}

getHtml(htmlDt: any,id:any) {
  $("#" + id).html(htmlDt);
  /*return 1;*/
}

createOrder(){
  this.http.post(this.url+'create-order',this.urldata).subscribe((data:any)=>{
    if(data.flag){
      this.router.navigate(['/thank-you/'+this.urldata.event+'/'+this.urldata.user]);
    }
    console.log(data);
  },(error)=>{ console.log(error) });
}

ngOnInit(): void {
}


}

