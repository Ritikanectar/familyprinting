import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalConstants } from '../../../common/global-constants';

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.css']
})
export class SizesComponent implements OnInit {

  url: string = GlobalConstants.apiURL;
  appurl: string = GlobalConstants.appurl;
  product: any = [];
  evid: any; user: any;
  productID: string = '';
  client: number = 0;
  pageLoaded: boolean = false;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.evid = this.route.snapshot.params.id;
    this.user = this.route.snapshot.params.user;
    this.client = this.route.snapshot.params.client;
    this.productID = this.route.snapshot.params.product;

    this.http.get(this.url + 'get-product-property?product_id=' + this.productID+'&event='+this.evid).subscribe((data: any) => {
      this.product = data.products;
      console.log(this.product);
      this.pageLoaded = true;
    }, (error) => { console.log(error) });
  }

  ngOnInit(): void { }

}
