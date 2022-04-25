import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  hasHeader:boolean = true;
  segment:any = [];
  constructor(private router:Router, private route:ActivatedRoute) { 
    // console.log(this.route.pathFromRoot[1].url);
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.segment = event?.url.split('/');
        var uri = this.segment[1];
        if(uri=='printing'){
          this.hasHeader = false;
        }
      }
    });
    
  }

  ngOnInit(): void {
  }

}
