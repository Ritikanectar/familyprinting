import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalConstants } from '../../../common/global-constants';

@Component({
  selector: 'app-colours',
  templateUrl: './colours.component.html',
  styleUrls: ['./colours.component.css']
})
export class ColoursComponent implements OnInit {

  url: string = GlobalConstants.apiURL;
  appurl: string = GlobalConstants.appurl;
  product: any = {'colors': {'color_name':'','color':''} };
  evid: any; user: any;
  productID: string = '';
  client: number = 0;
  pageLoaded: boolean = false;
  color: string = '';
  size: string = '';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.evid = this.route.snapshot.params.id;
    this.user = this.route.snapshot.params.user;
    this.client = this.route.snapshot.params.client;
    this.productID = this.route.snapshot.params.product;
    this.size = this.route.snapshot.params.size;

    this.http.get(this.url + 'get-product-property?product_id=' + this.productID).subscribe((data: any) => {
      this.product = data.products;
      console.log(this.product);
      this.pageLoaded = true;
    }, (error) => { console.log(error) });
  }

  ngOnInit(): void { }

  printNow(colorName:any) {
    //if (this.color != '') {
      //var proProp = this.productID + '__' + this.size + '__' + this.color;
      var proProp = this.productID + '__' + this.size + '__' + colorName;
      this.router.navigate(['/printing/' + this.evid + '/' + this.user + '/' + proProp + '/' + this.client]);
    /*} else {
      alert('Please select product color');
    }*/
    
  }
}
