import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder,Validators,FormGroup,FormControl} from '@angular/forms';
import {GlobalConstants} from '../../common/global-constants';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['../admin.component.css']
})
export class ArtworkComponent implements OnInit {

  gallery:any;
  url:string = GlobalConstants.apiURL;
  appurl:string = GlobalConstants.appurl;
  httpOptions = {
    headers: new HttpHeaders({'Accept':'application/json', 'Authorization': "Bearer " + localStorage.getItem('token') }),
  };
  cliparts:any = []; headerName:any;
  artworkForm !: FormGroup;
  galleryName:string = '';

  constructor(private router:ActivatedRoute,private http:HttpClient,private form:FormBuilder, private modalService:NgbModal) { 
    this.gallery = this.router.snapshot.params.gallery;
  }

  ngOnInit(): void {
    this.headerName = 'ARTWORKS';
    $('.headerName').html(this.headerName);
    this.http.get(this.url+'get-cliparts?gallery='+this.gallery,this.httpOptions).subscribe((data:any)=>{
      this.cliparts = data.cliparts;
      if(this.cliparts.length<=0){
        $(".noData").html('No Artwork Added');
      }
      this.galleryName = data.gallery.title;
    });
    
    this.artworkForm = this.form.group({
      artwork:[''],
    });
  }

  closeResult: any;
  modalReference:any;
  artworkId:number = 0;

  open(content:any,id:number) {
    this.artworkId = id;
    this.preview=false;
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',windowClass : "artworkModal"}).result.then((result) => {
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

   
   preview:boolean = false;
   onFileSelectReplace(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      var reader = new FileReader();
      this.preview=true;
      this.artworkForm.get('artwork')!.setValue(file);
      reader.onload = function(e:any) {
        $('.frontblock').attr('src', e.target.result);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

   replaceArtwork(){

    var formData:any = new FormData();
    formData.append('uid',localStorage.getItem("id"));
    formData.append('artwork', this.artworkForm.get('artwork')!.value);
    formData.append('artwork_id', this.artworkId);
    formData.append('gallery', this.gallery);
    this.http.post(this.url+'replace-artwork', formData, this.httpOptions).subscribe((response:any)=>{
      if(response.flag){
        this.modalService.dismissAll();
        this.cliparts = response.cliparts;
        this.preview=false;
      }
      alert(response.msg);
    },(error)=>{
      console.log(error);
    });
   }


  deleteArtwork(aid:any){
    var conf = confirm("Artwork will permanently delete.Are you sure?");
    if(conf){
      this.http.get(this.url+'delete-cliparts?id='+aid+'&gallery='+this.gallery,this.httpOptions).subscribe((data:any)=>{
        this.cliparts = data.cliparts;
        setTimeout(() => {
          if(this.cliparts.length<=0){
            $(".noData").html('No Artwork Added');
          }
        }, 1000);
        
      });
    }
  }

}
