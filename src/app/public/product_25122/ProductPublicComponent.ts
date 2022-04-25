import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router,ActivatedRoute} from '@angular/router';
import {GlobalConstants} from '../../common/global-constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductPublicComponent implements OnInit {
  
  url:string = GlobalConstants.apiURL;
  appurl:string = GlobalConstants.appurl;
  product:any = [];
  products:any = [];
  evid:any; user:any;
  productSize:string = '';
  productID:string = '';
  client:number = 0;
  sizes:any = [];
  pageLoaded:boolean = false;
  
  constructor(private http:HttpClient, private router:Router, private route:ActivatedRoute) { 
    this.evid = this.route.snapshot.params.id;
    this.user = this.route.snapshot.params.user;
    this.client = this.route.snapshot.params.client;
    this.http.get(this.url+'get-product-layout?event='+this.evid).subscribe((data:any)=>{
      this.product = data.productApp;
      this.product.bg_image = this.appurl+data.productApp.bg_file_path;
      this.products = data.products;
      //console.log(this.products);
      // const that = this;
      // if(this.products.other_size && this.products.other_size!=''){
      //   const szArr = this.products.other_size.split(',');
      //   $.each(szArr,function(k,v){
      //     that.sizes.push(v);
      //   });
      // }
      // if(this.products.size && this.products.size!=''){
      //   const szArr = this.products.size.split(',');
      //   console.log(this.products.size);
      //   $.each(szArr,function(k,v){
      //     that.sizes.push(v);
      //   });
      // }
      this.pageLoaded=true;
    },(error)=>{ console.log(error) });
  }
  
  ngOnInit(): void {
    /*var that = this;
    setTimeout(function () {
      that.getSplitedProd();
    }, 2000);*/
  }

  clearSelSize(){
    $('.sizes').val('');
    this.productSize = '';
  }
  clearSelID(id:string,event:any){
    this.productID=id;
    this.productSize = event.target.value;
    $('.sizes').val('');
    $('#sizes'+id).val(this.productSize);

  }

  newProducts:any = [];
  getSplitedProd(): any {
    if (this.products.length > 3) {
      var i, j, chunk = 2;
      let temparray: any = [];
      for (i = 0, j = this.products.length; i < j; i += chunk) {
        temparray[i] = this.products.slice(i, i + chunk);
      }
      this.newProducts = temparray.filter(function (el: any) {
        return el != null;
      });
    } else {
      this.newProducts[0] = this.products;
    }
    
    //console.log(this.newProducts);
    return this.newProducts;
  }

  getProductArr(key: any): any {
    return this.newProducts[key];
  }

  printNow(){
    /*if(this.productID==''){
      alert("Please select product");
    }else if(this.productSize==""){
      alert("Please select product size");
    }else{*/

    /* this.router.navigate(['/printing/'+this.evid+'/'+this.user+'/'+this.productSize+'/'+this.client]);*/
    this.router.navigate(['/product-size/' + this.evid + '/' + this.user + '/' + this.client + '/' + this.productID]);

    //}
    // alert(this.productID);
  }
}
