import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['../admin.component.css']
})
export class AdminHomeComponent implements OnInit {
  
  role:any = 0;
  constructor(private router:Router) {
    if (localStorage.getItem("token") === null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    $('.headerName').html("Dashboard");
    this.role = localStorage.getItem("user_type");
  }

}
