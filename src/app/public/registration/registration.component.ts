import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,FormBuilder,Validators} from '@angular/forms';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Router,ActivatedRoute} from '@angular/router';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GlobalConstants} from '../../common/global-constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  regForm !: FormGroup;
  submitted = false;
  massage = "";
  event = [{'name':'','id':''}];
  url:string = GlobalConstants.apiURL;
  appurl:string = GlobalConstants.appurl;
  evid:any; userid:any;
  layout:any = [];
  existCustomers:any = [];
  search:string = "";
  searchMsg:string = "Please enter name or email to search customers"
  closeResult: any;
  modalReference:any;
  pageLoaded:boolean=false;

  constructor(private http:HttpClient, private form:FormBuilder, private modalService:NgbModal, private router:Router, private route:ActivatedRoute) { 
    this.evid = this.route.snapshot.params.id;
    this.userid = this.route.snapshot.params.user;
    this.http.get(this.url+'get-reg-fields?event='+this.evid).subscribe((response:any)=>{
      if(response.flag){
        this.layout = response.reg;
        console.log(this.layout);
        this.layout.bg_image = this.appurl+response.reg.bg_file_path;
        $(".regbtn").css("background-color",this.layout.button_color);
        
        if (!this.layout.is_first_name) { const first_name = this.regForm.controls["first_name"]; first_name.clearValidators(); first_name.updateValueAndValidity(); }
        if (!this.layout.is_last_name) { const last_name = this.regForm.controls["last_name"]; last_name.clearValidators(); last_name.updateValueAndValidity(); }
        if (!this.layout.is_address_1) { const address_1 = this.regForm.controls["address_1"]; address_1.clearValidators(); address_1.updateValueAndValidity(); }
        if (!this.layout.is_phone) { const phone = this.regForm.controls["phone"]; phone.clearValidators(); phone.updateValueAndValidity(); }
        if (!this.layout.is_city) { const city = this.regForm.controls["city"]; city.clearValidators(); city.updateValueAndValidity(); }
        if (!this.layout.is_zip) { const zip = this.regForm.controls["zip"]; zip.clearValidators(); zip.updateValueAndValidity(); }
        if (!this.layout.is_email) { const email = this.regForm.controls["email"]; email.clearValidators(); email.updateValueAndValidity(); }
    //  else {
    //   firstNameControl.setValidators([Validators.required]);
    // }

        
      }
      this.pageLoaded=true;
    },(error)=>{
      console.log(error);
    });
  }

  customerId:any = '';

  open(content:any) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',windowClass : "termConditionModal",size:'lg'}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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


  getExistCustomers(){
    
    this.http.get(this.url+'search-customers?search='+this.search+'&event='+this.evid).subscribe((response:any)=>{
        if(response.flag){
          this.existCustomers = response.customers;
        }else{
          this.existCustomers = [];
          this.searchMsg = "No customers available for '"+this.search+"'";
        }
        //setTimeout(() => { }, 2000);
    },(error)=>{
      console.log(error);
    })
  }
  
  ngOnInit(): void {
    
    this.regForm = this.form.group({
      first_name: ['',Validators.required],
      last_name: ['',Validators.required],
      phone: ['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(12)]],
      city: ['',Validators.required],
      address_1: ['',Validators.required],
      address_2: [''],
      zip: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      event: this.route.snapshot.params.id
    });

    /**
     *  first_name: ['',this.layout.is_first_name? [Validators.required]:[]],
      last_name: ['',this.layout.is_last_name? [Validators.required]:[]],
      phone: ['',this.layout.is_phone? [Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(12)]:[]],
      city: ['',this.layout.is_city? [Validators.required]:[]],
      address_1: ['',this.layout.is_address_1? [Validators.required]:[]],
      address_2: [''],
      zip: ['',this.layout.is_zip? [Validators.required]:[]],
      email: ['',this.layout.is_email? [Validators.required,Validators.email]:[]],
      event: this.route.snapshot.params.id
     * 
     */

      

  }

  get f() { return this.regForm.controls; }

  register(){

    this.submitted = true;
    if (this.regForm.invalid) {
        return;
    }

    if(!$("#term_cond").is(":checked") && this.layout.is_terms_conditions && this.layout.is_terms_conditions==1){
      alert("Please accept terms & conditions in order to proceed");
      return;
    }

    this.http.post(this.url+'register',this.regForm.value).subscribe((response:any)=>{
        var regid = 0;
        if(response.flag){
          regid = response.reg_id;
          this.router.navigate(['/product/'+this.evid+'/'+this.userid+'/'+regid]);
        }else{
          alert(response.msg);
        }
    },(error)=>{
      console.log(error);
    });
  }

  goToProducts(){
    this.http.get(this.url+'search-customers?search='+this.search+'&event='+this.evid).subscribe((response:any)=>{
      if(response.flag){
         if(response.customers != null || response.customers.length > 0 || typeof response.customers !== 'undefined'){
          console.log('yesddddd');
          this.customerId = response.customers.reg_id;
          this.existCustomers = response.customers;
          this.router.navigate(['/product/'+this.evid+'/'+this.userid+'/'+this.customerId]);
        }else{
          console.log('No');
          this.existCustomers = [];
          this.searchMsg = "No customers available for '"+this.search+"'";
        }
      }else{
        console.log('No12');
        this.existCustomers = [];
        this.searchMsg = "No customers available for '"+this.search+"'";
      }
      //setTimeout(() => { }, 2000);
  },(error)=>{
    console.log(error);
  })
    // if(this.customerId!=""){
    //   this.router.navigate(['/product/'+this.evid+'/'+this.userid+'/'+this.customerId]);
    // }else{
    //   // alert("Please select customer");
    //   this.searchMsg = "No customers available for '"+this.search+"'";
    // }
  }

}
