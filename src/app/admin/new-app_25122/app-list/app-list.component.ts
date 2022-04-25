import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {GlobalConstants} from '../../../common/global-constants';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['../../admin.component.css']
})

export class AppListComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + localStorage.getItem('token') }),
  };
  url:string = GlobalConstants.apiURL;
  dtOptions: DataTables.Settings = {};
  appData = [{'event_id':'','app_name':'','link':'','event_type':'','app_type':'','created_date':'','client_name':'','app_status':'','wl_id':null,'rg_id':null,'pr_id':null,'pd_id':null,'pv_id':null,'ty_id':null,'ui_id':null}];
  products:any; headerName:any;

  constructor(private formBuilder : FormBuilder, private http:HttpClient, private router:Router) { 
    if (localStorage.getItem("token") === null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {

    this.headerName = 'APP LIST';
    $('.headerName').html(this.headerName);
    var that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
              .post(that.url+'get-app-list',dataTablesParameters,this.httpOptions)
              .subscribe((result:any) => {
                that.appData = result.event.aaData;
                console.log(result);
                  callback({
                      recordsTotal: result.event.iTotalRecords, // result.recordsTotal
                      recordsFiltered: result.event.iTotalDisplayRecords, //result.recordsFiltered
                      data: [],
                  });
              });
      },
      columns: [
          { data: "app_name" },
          { data: "event_type" },
          { data: "app_type" },
          { data: "created_date" },
          { data: "client" },
          { data: "app_status" },
          // { data: "app_link" },
          { data: "action" }
      ],
  };

  }

}
