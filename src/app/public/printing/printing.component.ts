import { Component, OnInit, Renderer2, Input, Output, EventEmitter, HostListener, HostBinding, 
         AfterViewInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router,ActivatedRoute} from '@angular/router';
import {GlobalConstants} from '../../common/global-constants';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnd, CdkDragStart, CdkDragMove } from '@angular/cdk/drag-drop';
import * as $ from 'jquery';
import 'jqueryui';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { fabric } from 'fabric';
import { jsPDF } from 'jspdf';
//import { exit } from 'process';
//import { exit } from 'process';


//import html2canvas from 'html2canvas';
// import { NgxCaptureService } from 'ngx-capture';

@Component({
  selector: 'app-printing',
  templateUrl: './printing.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./printing.component.css']
})
export class PrintingComponent implements OnInit, AfterViewInit {

  url:string = GlobalConstants.apiURL;
  appurl:string = GlobalConstants.appurl;
  productID:any = [];
  productSize:any = '';
  evID:any; userID:any;
  product:any = {'file':'','svg':''}; ///assets/img/tees-large.png
  gallery:any = [];
  cliparts:any = [];
  activeMenu:string = 'clipart';
  switchGal:boolean = true;
  galleryTitle:string = 'Gallery';
  initialPosition = { x: 100, y: 100 };
  position = { ...this.initialPosition };
  offset = { x: 0, y: 0 };
  movingOffset = { x: 0, y: 0 };
  endOffset = { x: 0, y: 0 };
  clientID:any = 0;
  aspectRatio = true;
  imBlockTop:any=0; imBlockLeft:any=0;
  imBlockTopBack:any=0;imBlockLeftBack:any=0;
  pScreenX:number=0; pScreenY:number=0;
  cScreenX:number=0; cScreenY:number=0;
  movementX:number=0; movementY:number=0;
  clickHold:boolean=false;
  myValue:any = 0;
  pageLoaded:boolean = false;
  hovered:number = -1; hoveredArtwork:number = -1;
  hoveredToggleProd:number = -1; hoveredToggleArt:number = -1; hoveredToggleTxt:number = -1;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + localStorage.getItem('token') }),
  };
  /*************** New Canvas Declarations ******************/
  canvas: any = undefined;
  textString: any='';
  sizenew: any = {
    width: 0,
    height: 0
  };
  OutputContent: any='';
  text:any = '';


  isDragging:any;selection:any;
  lastPosX:any;lastPosY:any; viewportTransform:any;
  vpt:any = [];

  @HostListener('document:click', ['$event'])
    clickout(event:any) {

      if($(event.target).closest('.fixedPic').length){

        let classArr:any = $(event.target).attr("class")?.split(" ");
        var clId = classArr[2];
        var i = classArr[3];
        var artworkImg = event.target.src;
        if(this.size[clId]==undefined || this.size[clId].height==undefined){
          this.size[clId] = {width:"100",height:"100"};
        }

        if(this.switchText=='Front'){

            if($(".imgArea").find('img').length){

              /***** If image canvas is open then plot artwork */
              let prp:any = $(".imgArea").find("img").attr('class')?.split(' ');
              var cl1 = prp[2];
              var cl2 = prp[3];
              
              var img:any = $(".imgArea").find("img");
              if(this.size && this.size[cl2] && this.size[cl2]){
                img.attr('width',this.size[cl2].width).attr('height',this.size[cl2].height);
              }
              var cont = "<div class='canvasImgDyna"+cl2+"' class='wakeUPImg "+cl2+"'>";
              $(img[0]).addClass("fixedPic");
              var that = this;
              if(img[0]!=undefined){
                that.frontUI[cl2] = {image:cont+img[0].outerHTML,style:'position:absolute; top:'+that.relativeY[cl2]+'px;left:'+that.relativeX[cl2]+'px; z-index:1; z-index: '+(that.reswitch[cl2])+';transform:rotate('+that.state[cl2]+'deg);'};
              }
              this.isresize = false; this.isclose=false;this.isok=false;
              $(".imgArea .imageArea"+cl2).remove("img");
              this.entryImg=false;
            }

            /***** Start editing artwork ******/
            this.cl[this.id] = i;
            if(this.size[i]==undefined || this.size[i].height==undefined){
              this.size[i] = {width:'100',height:'100'};
            }

            var cont2 = '<img src="'+artworkImg+'" class="imageArea'+i+' dynamicPic '+clId+' '+i+'" height="'+this.size[i].height+'" width="'+this.size[i].width+'" style="transform:rotate('+this.state[i]+'deg);left:'+(this.relativeX[i])+'px;top:'+(this.relativeY[i])+'px; z-index:'+(this.reswitch[i]==undefined? 0:this.reswitch[i])+'">';
            this.frontUIActive = cont2;
            
            setTimeout(() => { 
              $(".canvasImgDyna"+i).html("");
              this.imBlockLeft = this.relativeX[i];
              this.imBlockTop = this.relativeY[i];
              $("#imgBlock-"+i).css('width',this.size[i].width+'px');
              $("#imgBlock-"+i).css('height',this.size[i].height+'px');
              $("#imgBlock-"+i).append(cont2);
              this.isclose=true;this.isok=true; this.isresize=true;
            }, 100);

        }else{
          
          if($(".imgAreaBack").find('img').length){

            /***** If image canvas is open then plot artwork */
            let prp:any = $(".imgAreaBack").find("img").attr('class')?.split(' ');
            var cl1 = prp[2];
            var cl2 = prp[3];
            
            var img:any = $(".imgAreaBack").find("img");
            if(this.sizeBack && this.sizeBack[cl2] && this.sizeBack[cl2]){
              img.attr('width',this.sizeBack[cl2].width).attr('height',this.sizeBack[cl2].height);
            }
            var cont = "<div class='canvasImgDynaBack"+cl2+"' class='wakeUPImg "+cl2+"'>";
            $(img[0]).addClass("fixedPic");
            var that = this;
            if(img[0]!=undefined){
              that.BackUI[cl2] = {image:cont+img[0].outerHTML,style:'position:absolute; top:'+that.relativeYBack[cl2]+'px;left:'+that.relativeXBack[cl2]+'px; z-index:1; z-index: '+(that.reswitchBack[cl2])+';transform:rotate('+that.stateBack[cl2]+'deg);'};
            }
            this.isresizeBack = false; this.iscloseBack=false;this.isokBack=false;
            $(".imgAreaBack .imageAreaBack"+cl2).remove("img");
            this.entryImg=false;
          }

          /***** Start editing artwork ******/

          $(".canvasImgDynaBack"+i).html("");
          //this.ArworkIMG[clId] = undefined;
          this.cl[this.id] = i;

          if(this.sizeBack[i]==undefined || this.sizeBack[i].height==undefined){
            this.sizeBack[i] = {width:'100',height:'100'};
          }

          var cont2 = '<img src="'+artworkImg+'" class="imageAreaBack'+i+' dynamicPic '+clId+' '+i+'" height="'+this.sizeBack[i].height+'" width="'+this.sizeBack[i].width+'" style="transform:rotate('+this.stateBack[i]+'deg);left:'+(this.relativeXBack[i])+'px;top:'+(this.relativeYBack[i])+'px; z-index:'+(this.reswitchBack[i]==undefined? 0:this.reswitchBack[i])+'">';
          this.backUIActive = cont2;
          this.iscloseBack=true;this.isokBack=true; this.isresizeBack=true;
          
          setTimeout(() => { 
            this.imBlockLeftBack = this.relativeXBack[i];
            this.imBlockTopBack = this.relativeYBack[i];
            $("#imgBlockBack-"+i).css('width',this.sizeBack[i].width+'px');
            $("#imgBlockBack-"+i).css('height',this.sizeBack[i].height+'px');
            $("#imgBlockBack-"+i).append(cont2);
          }, 200);

      }
        this.checkImg();
    }
    
  }

  pColor: any = '';
  constructor(private http:HttpClient, private renderer:Renderer2,private router:Router, private route:ActivatedRoute, 
    private elementRef:ElementRef, private modalService:NgbModal, private activeModal:NgbActiveModal) {
    this.evID = this.route.snapshot.params.id;
    this.userID = this.route.snapshot.params.user;
    this.clientID = this.route.snapshot.params.client;
    this.productID = this.route.snapshot.params.product;
    var pidsz = this.productID.split('__');
    this.productID = pidsz[0];
    this.productSize = pidsz[1];
    this.pColor = pidsz[2];
   }
   
   switchMenu(menu:string){
      this.activeMenu = menu;
   }
   text1:string=''; text1Back:string=''; isresizeText:boolean = false; isresizeTextBack:boolean = false;
   text2:string=''; text2Back:string=''; isresizeText2:boolean = false; isresizeText2Back:boolean = false;

   addText1(event:any,id:any){
    
    if(this.switchText=='Front'){
      var str:any = $("#title1").val();
      this.text1 = str; 
      this.isresizeText = true;
     }else{
      var str:any = $("#title1Back").val();
      this.text1Back = str; 
      this.isresizeTextBack = true;
     }
   }

   addText2(event:any,id:any){
    if(this.switchText=='Front'){
      var str:any = $("#title2").val();
      this.text2 = str;
      this.isresizeText2 = true;
    }else{
      var str:any = $("#title2Back").val();
      this.text2Back = str;
      this.isresizeText2Back = true;
    }
   }

   state:any = [];
   closeResult: any;
   modalReference:any;
   relativeX:any = [];
   relativeY:any = [];
   ArworkIMG:any = [];
   size:any = []; 
   relativeXBack:any = [];
   relativeYBack:any = [];
   ArworkIMGBack:any = [];
   sizeBack:any = []; 

   text1X:any = ''; text1Y:any = '';
   text2X:any = ''; text2Y:any = '';

   text1XBack:any = ''; text1YBack:any = '';
   text2XBack:any = ''; text2YBack:any = '';
   //@ViewChild('dataContainer') dataContainer: ElementRef | undefined;

   open(content:any) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',windowClass : "assignGalModal"}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    // var html = "<img src='"+this.product.file+"' height='500' width='500' class='dynaImg'>";
    //  $(".svgDyno").append(html);
    const that = this;

    if(this.printLocation=='both' || this.printLocation=='front_only'){    
      var relativeX = this.relativeX;
      var ArtworkIMG = this.ArworkIMG;
      var relativeY = this.relativeY;
      var size = this.size;
      var reswitch = this.reswitch;
      var state = this.state;
      //----front canvas------
      var divimgfc= <HTMLInputElement>document.getElementById('dynaImgFC');
      var getelementtop = <HTMLInputElement>document.getElementById('fcanvastop');
      var getelementleft = <HTMLInputElement>document.getElementById('fcanvasleft');

      divimgfc.style.position = 'absolute';
      divimgfc.style.backgroundColor  = 'transparent';
      if(getelementtop.value == ''){
    
        divimgfc.style.top =  '10px';
        divimgfc.style.left = getelementleft.value+'px';
      }else{
        
        divimgfc.style.top =  getelementtop.value+'px';
        divimgfc.style.left = getelementleft.value+'px';
      }
      //-----Back canvas----------
      var divimgfb= <HTMLInputElement>document.getElementById('dynaImgBC');
      var getelementtopb = <HTMLInputElement>document.getElementById('bcanvastop');
      var getelementleftb = <HTMLInputElement>document.getElementById('bcanvasleft');


      divimgfb.style.position = 'absolute';
      divimgfb.style.backgroundColor  = 'transparent';
      if(getelementtopb.value == ''){
        divimgfb.style.top =  '10px';
        divimgfb.style.left = getelementleftb.value+'px';
      }else{
        divimgfb.style.top =  getelementtopb.value+'px';
        divimgfb.style.left = getelementleftb.value+'px';
      }


      //relativeX.reverse(); relativeY.reverse(); ArtworkIMG.reverse(); size.reverse(); reswitch.reverse(); state.reverse();
      // $.each(ArtworkIMG,function(key,val){
      //  for(var j=0; j<=ArtworkIMG.length;j++){
      for (var key in ArtworkIMG) {
        //var key = ArtworkIMG[j];
        // console.log(ArtworkIMG[key]);

        if(ArtworkIMG[key]!=undefined){
          if(size[key] ==undefined){
            size[key] = [];
            size[key].width = 90;
            size[key].height = 90;
          }
          // $(".svgDyno svg.prodSvg").append(parseSvg(
          //   '<image href="'+ArworkIMG[key]+'" height="'+size[key].height+'" width="'+size[key].width+'" transform="translate(30) rotate('+(state[key]=='default'? '0':state[key]=='rotated90'? '-90':state[key]=='rotated180'? '-180':state[key]=='rotated270'? '-270':state[key]=='rotated360'? '-360':'0')+' '+relativeX[key]+' '+relativeY[key]+')" x="'+relativeX[key]+'" y="'+relativeY[key]+'" (cdkDragEnded)="drop($event)" onclick="test()"></image>'
          // ));
          //$(".svgDyno").append("<img src='"+ArworkIMG[key]+"' height='"+size[key].height+"' width='"+size[key].width+"' style='transform:rotate("+(state[key]=='default'? '0':state[key]=='rotated90'? '-90deg':state[key]=='rotated180'? '-180deg':state[key]=='rotated270'? '-270deg':state[key]=='rotated360'? '-360deg':'0')+");left:"+(relativeX[key]-80)+"px;top:"+(relativeY[key]-10)+"px;' class='mvImg'>");
          $(".dynaImgFC").append("<img src='"+ArtworkIMG[key]+"' height='"+size[key].height+"' width='"+size[key].width+"' style='transform:rotate("+state[key]+"deg);left:"+(relativeX[key])+"px;top:"+(relativeY[key])+"px; z-index:"+(reswitch[key]==undefined? 0:reswitch[key])+"' class='mvImg'>");
        } 
      };

      if(this.text1X!=''){
        $(".dynaImgFC").append("<label style='left:"+(this.text1X)+"px;width:"+this.text1width+"px;top:"+(this.text1Y)+"px;font-size:"+this.text1Size+";color:"+this.text1Color+";font-family:"+this.textFamily+";letter-spacing:"+this.textSpacing+";font-weight:"+this.textweight+";position:absolute;' >"+this.text1+"</label>");
      }
      if(this.text2X!=''){
        $(".dynaImgFC").append("<label style='left:"+(this.text2X)+"px;wibackCandth:"+this.text2width+"px;top:"+(this.text2Y)+"px;font-size:"+this.text2Size+";color:"+this.text2Color+";font-family:"+this.textFamily2+";letter-spacing:"+this.textSpacing2+";font-weight:"+this.textweight2+";position:absolute;' >"+this.text2+"</label>");
      }
      
    }

    if(this.printLocation=='both' || this.printLocation=='back_only'){
      console.log(this.relativeXBack);
      $.each(this.relativeXBack,function(key,val){
        if(that.ArworkIMGBack[key]!=undefined){
          if(that.sizeBack[key] ==undefined){
            that.sizeBack[key] = [];
            that.sizeBack[key].width = 90;
            that.sizeBack[key].height = 90;
          }
          $(".dynaImgBC").append("<img src='"+that.ArworkIMGBack[key]+"' height='"+that.sizeBack[key].height+"' width='"+that.sizeBack[key].width+"' style='transform:rotate("+that.stateBack[key]+"deg);left:"+(that.relativeXBack[key])+"px;top:"+(that.relativeYBack[key])+"px; z-index:"+(that.reswitchBack[key]==undefined? 1:that.reswitchBack[key])+"'' class='mvImg'>");
        } 
      });
      if(this.text1XBack!=''){
        $(".dynaImgBC").append("<label style='left:"+(this.text1XBack)+"px;width:"+this.text1widthBack+"px;top:"+(this.text1YBack)+"px;font-size:"+this.text1SizeBack+";color:"+this.text1ColorBack+";font-family:"+this.textFamilyBack+";letter-spacing:"+this.textSpacingBack+";font-weight:"+this.textweightBack+";position:absolute;' >"+this.text1Back+"</label>");
      }
      if(this.text2XBack!=''){
        $(".dynaImgBC").append("<label style='left:"+(this.text2XBack)+"px;width:"+this.text2widthBack+"px;top:"+(this.text2YBack)+"px;font-size:"+this.text2SizeBack+";color:"+this.text2ColorBack+";font-family:"+this.textFamily2Back+";letter-spacing:"+this.textSpacing2Back+";font-weight:"+this.textweight2Back+";position:absolute;' >"+this.text2Back+"</label>");
      }

      
    }
    // $(".svgDyno svg.prodSvg").append(this.parseSvg(
    //   '<image href="http://localhost:8000/uploads/'+x1.artwork_image+'" height="150" width="150" (cdkDragEnded)="drop($event)" onclick="test()" cdkDrag style="height: 200px;width: 200px;" x="'+this.relativeX+'" y="'+this.relativeY+'"></image>'
    // ));
    //  $(".svgDyno svg.prodSvg").find("rect").remove();
     //var parser = new DOMParser();
     //this.OutputContent = parser.parseFromString(this.OutputContent, "application/xml");
     //  $(".svgDyno").find('.prodSvg').css("width","500px");
    //  $(".svgDyno").find('.prodSvg').css("height","500px");
    var widthfcanvase = <HTMLInputElement>document.getElementById('fcanvaswidth');
    var heightfcanvase = <HTMLInputElement>document.getElementById('fcanvasheight');
    var backwidthfcanvase = <HTMLInputElement>document.getElementById('bcanvaswidth');
    var backheightfcanvase = <HTMLInputElement>document.getElementById('bcanvasheight');
    
     this.OutputContent = this.canvas.toSVG();

     $("#dynaImgFC").html(this.OutputContent);

     
     $("#dynaImgBC").html(this.canvasBack.toSVG());
     

    var x = document.getElementsByTagName("svg") ;

    for (let i = 0; i < x.length; i++) {
      let element = x[i];
      if(i == 0 && widthfcanvase.value != '' && heightfcanvase.value != ''){
        element.style.width = widthfcanvase.value+'';
        element.style.height = heightfcanvase.value;
      }
      if(i == 1 && backwidthfcanvase.value != '' && backheightfcanvase.value != ''){
        element.style.width = backwidthfcanvase.value+'';
        element.style.height = backheightfcanvase.value;
      }
      
    }  
    
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

  initPos:any = {x:'',y:''}; initPosBack:any = {x:'',y:''};
  onStart(event:any,i:any=0) {
    if(i!='text1' && i!='text2'){
      if(this.switchText=='Front'){
        var pos = $('.clpart'+i).position();
        this.initPos.x = pos.left;
        this.initPos.y = pos.top;
      }else{
        var pos = $('.clpart'+i).position();
        this.initPosBack.x = pos.left;
        this.initPosBack.y = pos.top;
      }
    }
    // //console.log('started output:', event);
     //console.log('started output X:'+this.initPos.x+' Y: '+this.initPos.y);
  }
  
  onStop(event:any,i:any=0) {
    if(i=='text1'){
      if(this.switchText=='Front'){
        this.text1X = $("#text1Label").position()!.left;
        this.text1Y = $("#text1Label").position()!.top;
      }else{
        this.text1XBack = $("#text1LabelBack").position()!.left;
        this.text1YBack = $("#text1LabelBack").position()!.top;
      }
    }else if(i=='text2'){
      if(this.switchText=='Front'){
        this.text2X = $("#text2Label").position()!.left;
        this.text2Y = $("#text2Label").position()!.top;
      }else{
        this.text2XBack = $("#text2LabelBack").position()!.left;
        this.text2YBack = $("#text2LabelBack").position()!.top;
      }
    }else{
      if(this.switchText=='Front'){
        this.relativeX[i] = $(".imageArea"+i).parent().position()!.left; 
        this.relativeY[i] = $(".imageArea"+i).parent().position()!.top; 
        this.ArworkIMG[i] = $(".imageArea"+i).attr("src");
        console.log("relativeX : "+this.relativeX[i]+" & relativeY : "+this.relativeY[i]);
      }else{
        this.relativeXBack[i] = $(".imageAreaBack"+i).parent().position()!.left; 
        this.relativeYBack[i] = $(".imageAreaBack"+i).parent().position()!.top; 
        this.ArworkIMGBack[i] = $(".imageAreaBack"+i).attr("src");
      }
    }
    
    // var p = $(".svgCont svg").first();
    // var position = p.position();
    // var wd:any = $(".svgCont svg").width();
    // var ht:any = $(".svgCont svg").height();
    // var cellIndexX = event.target.cellIndex;
    // var cellIndexY = event.target.rowIndex;
    // var positioningX = this.movingOffset.x*(wd);
    // var positioningY = this.movingOffset.y*(ht);
    //var pos = $(".svgCont svg").position();
    // var wd:any = $(".prodIMG").width();
    // var ht:any = $(".prodIMG").height();
    // this.relativeX[i] = ($(".clpartImg"+i+" img").offset()!.left- $(".svgContv").position()!.left)*0.7; //  
    // this.relativeY[i] = ($(".clpartImg"+i+" img").offset()!.top- $(".svgContv").position()!.top)*2.5; // 
    // this.relativeX[i] = ($(".imageArea"+i).offset()!.left- $(".imageArea"+i).parent().offset()!.left); 
    //alert($(".imageArea"+i).parent().position()!.left+' i '+i);
    //this.relativeY[i] = ($(".imageArea"+i).offset()!.top- $(".prodIMG").offset()!.top)+10; 
    //console.log("x:"+relativeX+" y:"+relativeY);
    // console.log("left: " + this.movingOffset.x + ", top: " + this.movingOffset.y );
    //console.log('stopped output:', this.movingOffset);
  }

  onMoving(event:any,i:any) {
    this.movingOffset.x = event.x;
    this.movingOffset.y = event.y;
  }

  onMoveEnd(event:any,i:any) {
    this.endOffset.x = event.x;
    this.endOffset.y = event.y;
  }

  rotation:number = 0; rotationBack:number = 0;
  timeoutHandler:any;
  stateBack:any = [];

  mousedown(i:any,event:any){
    this.timeoutHandler = setInterval(() => {
      if(this.switchText=="Front"){
        this.rotation += 3;
        // $(".clpartImg"+i+" img").css("transform","rotate(-"+this.rotation+"deg)");
        $(".imageArea"+i).css("transform","rotate(-"+this.rotation+"deg)");
        this.state[i] = this.rotation;
      }else{
        this.rotationBack += 3;
        $(".imageAreaBack"+i).css("transform","rotate(-"+this.rotationBack+"deg)");
        this.stateBack[i] = this.rotationBack;
      }
      
    }, 100);

  } 
  mouseup(i:any,event:any){
    if (this.timeoutHandler) {
      clearInterval(this.timeoutHandler);
      //this.rotation = 0;
      this.timeoutHandler = null;
    }
  }


  mousemoveNew(i:any,event:any){
    if(this.clickHold){
      this.movementX = event.screenX - this.pScreenX;
      this.movementY = event.screenY - this.pScreenY;
      this.pScreenX = event.screenX;
      this.pScreenY = event.screenY;
      console.log('movementX : '+this.movementX+'*** movementY : '+this.movementY);
    }
    // console.log(this.longPressing);
     console.log(this.clickHold);
  }

  mousedownNew(i:any,event:any){
    //if(this.clickHold){
    //  this.clickHold = true;
      // console.log(this.pressing);
      // console.log(this.longPressing);
      this.movementX = event.screenX - this.pScreenX;
      this.movementY = event.screenY - this.pScreenY;
      this.pScreenX = event.screenX;
      this.pScreenY = event.screenY;
    //}
  }
  mouseupNew(i:any,event:any){
    // console.log('movementX : '+this.movementX+'*** movementY : '+this.movementY);
    this.clickHold=false;
  }

  text1Size:any = "15px"; text1SizeBack:any = "15px";
  text2Size:any = "15px"; text2SizeBack:any = "15px";
  text1width:any = "";text1widthBack:any = "";
  text2width:any = "";text2widthBack:any = "";
  width:any=0;height:any=0;

  onResizeStart(event:any,i:any=0) {
    if(i=='text1'){
      if(this.switchText=="Front"){
        this.text1Size = (event.size.height)+'px';
        this.text1width = event.size.width;
        $("#text1Label").css('width',"auto");
      }else{
        this.text1SizeBack = event.size.height+'px';
        this.text1widthBack = event.size.width;
        $("#text1LabelBack").css('width',"auto");
      }
    }else if(i=='text2'){
      if(this.switchText=="Front"){
        this.text2Size = event.size.height+'px';
        this.text2width = event.size.width;
        $("#text2Label").css('width',"auto");
      }else{
        this.text2SizeBack = event.size.height+'px';
        this.text2widthBack = event.size.width;
        $("#text2LabelBack").css('width',"auto");
      }
    }else{
      if(this.switchText=="Front"){
        if(this.width!=event.size.width){
          event.size.height = event.size.width;
          this.width = event.size.width;
        }if(this.height!=event.size.height){
          event.size.width = event.size.height;
          this.height = event.size.height;
        }
        
        this.size[i] = event.size;
        $('.imgArea img').attr("style","width:"+this.size[i].width+"px;height:"+this.size[i].height+"px;");
        $('.imageArea'+i).css("transform","rotate("+this.state[i]+"deg)");
      }else{
        if(this.width!=event.size.width){
          event.size.height = event.size.width;
          this.width = event.size.width;
        }if(this.height!=event.size.height){
          event.size.width = event.size.height;
          this.height = event.size.height;
        }
        this.sizeBack[i] = event.size;
        $('.imgAreaBack img').attr("style","width:"+this.sizeBack[i].width+"px;height:"+this.sizeBack[i].height+"px;");
        $('.imageAreaBack'+i).css("transform","rotate("+this.stateBack[i]+"deg)");
      }
    }
  }

  onResizing(event:any,i:any=0) {
    if(i=='text1'){
      if(this.switchText=="Front"){
        this.text1Size = event.size.height+'px';
        this.text1width = event.size.width;
        $("#text1Label").css('width',"auto");
      }else{
        this.text1SizeBack = event.size.height+'px';
        this.text1widthBack = event.size.width;
        $("#text1LabelBack").css('width',"auto");
      }
    }else if(i=='text2'){
      if(this.switchText=="Front"){
        this.text2Size = event.size.height+'px';
        this.text2width = event.size.width;
        $("#text2Label").css('width',"auto");
      }else{
        this.text2SizeBack = event.size.height+'px';
        this.text2widthBack = event.size.width;
        $("#text2LabelBack").css('width',"auto");
      }
    }else{
      if(this.switchText=="Front"){
        if(this.width!=event.size.width){
          event.size.height = event.size.width;
          this.width = event.size.width;
        }if(this.height!=event.size.height){
          event.size.width = event.size.height;
          this.height = event.size.height;
        }
        // event.size.height=event.size.width;
        this.size[i] = event.size;
        $('.imgArea img').attr("style","width:"+this.size[i].width+"px;height:"+this.size[i].height+"px;");
        $('.imageArea'+i).css("transform","rotate("+this.state[i]+"deg)");
      }else{
        if(this.width!=event.size.width){
          event.size.height = event.size.width;
          this.width = event.size.width;
        }if(this.height!=event.size.height){
          event.size.width = event.size.height;
          this.height = event.size.height;
        }
        this.sizeBack[i] = event.size;
        $('.imgAreaBack img').attr("style","width:"+this.sizeBack[i].width+"px;height:"+this.sizeBack[i].height+"px;");
        $('.imageAreaBack'+i).css("transform","rotate("+this.stateBack[i]+"deg)");
      }
    }
  }

  onResizeStop(event:any,i:any=0) {
    console.log(event);
    if(i=='text1'){
      if(this.switchText=="Front"){
        this.text1Size = event.size.height+'px';
        this.text1width = event.size.width;
        $("#text1Label").css('width',"auto");
      }else{
        this.text1SizeBack = event.size.height+'px';
        this.text1widthBack = event.size.width;
        $("#text1LabelBack").css('width',"auto");
      }
    }else if(i=='text2'){
      if(this.switchText=="Front"){
        this.text2Size = event.size.height+'px';
        this.text2width = event.size.width;
        $("#text2Label").css('width',"auto");
      }else{
        this.text2SizeBack = event.size.height+'px';
        this.text2widthBack = event.size.width;
        $("#text2LabelBack").css('width',"auto");
      }
    }else{
      if(this.switchText=="Front"){
      
        if(this.width!=event.size.width){
          event.size.height = event.size.width;
          this.width = event.size.width;
        }if(this.height!=event.size.height){
          event.size.width = event.size.height;
          this.height = event.size.height;
        }
      // event.size.height=event.size.width;
      this.size[i] = event.size;
      $('.imgArea img').attr("style","width:"+this.size[i].width+"px;height:"+this.size[i].height+"px;");
      $('.imageArea'+i).css("transform","rotate("+this.state[i]+"deg)");
      }else{
        if(this.width!=event.size.width){
          event.size.height = event.size.width;
          this.width = event.size.width;
        }if(this.height!=event.size.height){
          event.size.width = event.size.height;
          this.height = event.size.height;
        }
        this.sizeBack[i] = event.size;
        $('.imgAreaBack img').attr("style","width:"+this.sizeBack[i].width+"px;height:"+this.sizeBack[i].height+"px;");
        $('.imageAreaBack'+i).css("transform","rotate("+this.stateBack[i]+"deg)");
      }
    }
  }

  text1Color:any = "#000000"; textFamily:any; textSpacing:string='2px'; textweight:string='normal';
  text2Color:any = "#000000"; textFamily2:any; textSpacing2:string='2px'; textweight2:string='normal';

  text1ColorBack:any = "#000000"; textFamilyBack:any; textSpacingBack:string='2px'; textweightBack:string='normal';
  text2ColorBack:any = "#000000"; textFamily2Back:any; textSpacing2Back:string='2px'; textweight2Back:string='normal';

  addColorTextOld(color:any){
    if(this.activetxt=='text1'){
      if(this.switchText=="Front"){
        this.text1Color = color;
      }else{
        this.text1ColorBack = color;
      }
    }else{
      if(this.switchText=="Front"){
        this.text2Color = color;
      }else{
        this.text2ColorBack = color;
      }
    }
  }

  testMouse(){
    console.log('test');
  }

  addFontFamilyOld(event:any){
    if(this.activetxt=='text1'){
      if(this.switchText=="Front"){
        this.textFamily = event.target.value;
      }else{
        this.textFamilyBack = event.target.value;
      }
    }else{
      if(this.switchText=="Front"){
        this.textFamily2 = event.target.value;
      }else{
        this.textFamily2Back = event.target.value;
      }
    }
  }

  addFontStyleOld(event:any){
    if(this.activetxt=='text1'){
      if(this.switchText=="Front"){
        this.textweight = event.target.value;
      }else{
        this.textweightBack = event.target.value;
      }
    }else{
      if(this.switchText=="Front"){
        this.textweight2 = event.target.value;
      }else{
        this.textweight2Back = event.target.value;
      }
    }
  }

  addFontSpaceOld(event:any){
    if(this.activetxt=='text1'){
      if(this.switchText=="Front"){
        this.textSpacing = event.target.value+"px";
      }else{
        this.textSpacingBack = event.target.value+"px";
      }
    }else{
      if(this.switchText=="Front"){
        this.textSpacing2 = event.target.value+"px";
      }else{
        this.textSpacing2Back = event.target.value+"px";
      }
    }
  }

  activetxt:string = 'text1';
  switchTextFun(txt:string){
    this.activetxt = txt;
  }

  parseSvg(s:any):any {
    var div= document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    div.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg">'+s+'</svg>';
    var frag= document.createDocumentFragment();
    var test1 = <any>div.firstChild;
    while (test1.firstChild)
        frag.appendChild(test1.firstChild);
    return frag;
  }

  drop($event: CdkDragEnd){
  //   console.log($event.source);
  //  console.log($event.source.getFreeDragPosition());
    this.offset = { ...(<any>$event.source._dragRef)._passiveTransform };

    this.position.x = this.initialPosition.x + this.offset.x;
    this.position.y = this.initialPosition.y + this.offset.y;

    // var pos = $("svg").position();
    // console.log("x:"+pos.left+" y:"+pos.top);
    //console.log(this.position, this.initialPosition, this.offset);
  }

  dragMoved(event: CdkDragMove) {
    var pos = `> Position X: ${event.pointerPosition.x} - Y: ${event.pointerPosition.y}`;
    console.log(pos);
  }

  id:any = 0;
  cl:any = [];
  zindex:number = 1;
  frontUI:Array<any> = [];

  plotImage(event:any){

    if (!$(event.target).closest('.dynamicPic').length && !$(event.target).closest('.imgArea').length && 
    !$(event.target).closest('.mat-slider').length && !$(event.target).closest('.rotate-slider').length) {
      if(this.switchText=='Front'){

        var img:any = $(".imgArea").find(".imageArea"+this.cl[this.id]);
        if(this.size && this.size[this.cl[this.id]]){
          img.attr('width',this.size[this.cl[this.id]].width).attr('height',this.size[this.cl[this.id]].height);
        }
        
        var cont = "<div class='canvasImgDyna"+this.cl[this.id]+"' class='wakeUPImg "+this.cl[this.id]+"'>";
        $(img[0]).addClass("fixedPic");
        
        var that = this;
        //this.frontUI.push({image:cont+img[0].outerHTML,style:'position:absolute;z-index:1;top:'+this.relativeY[this.cl[this.id]]+'px;left:'+this.relativeX[this.cl[this.id]]+'px; z-index: '+(this.reswitch[this.cl[this.id]])+';'+$(img[0].outerHTML).attr('style')});
        if(img[0]!=undefined){
          that.frontUI[that.cl[that.id]] = {image:cont+img[0].outerHTML,style:'position:absolute; top:'+that.relativeY[that.cl[that.id]]+'px;left:'+that.relativeX[that.cl[that.id]]+'px; z-index:1; z-index: '+(that.reswitch[that.cl[that.id]])+';transform:rotate('+that.state[that.cl[that.id]]+'deg);'}; // +$(img[0].outerHTML).attr('style')
        }
        
        this.isresize = false; this.isclose=false;this.isok=false;
        $(".imgArea .imageArea"+this.cl[this.id]).remove("img");
        this.entryImg=false;
      }else{
        var img:any = $(".imgAreaBack").find(".imageAreaBack"+this.cl[this.id]);
        if(this.sizeBack && this.sizeBack[this.cl[this.id]] && this.sizeBack[this.cl[this.id]]){
          img.attr('width',this.sizeBack[this.cl[this.id]].width).attr('height',this.sizeBack[this.cl[this.id]].height)
        }
        var cont = "<div class='canvasImgDynaBack"+this.cl[this.id]+"' class='wakeUPImg "+this.cl[this.id]+"'>";
        $(img[0]).addClass("fixedPic");
        var that = this;

        //this.BackUI.push({image:cont+img[0].outerHTML,style:'position:absolute;z-index:1;top:'+this.relativeYBack[this.cl[this.id]]+'px;left:'+this.relativeXBack[this.cl[this.id]]+'px; z-index: '+(this.reswitchBack[this.cl[this.id]])+';'+$(img[0].outerHTML).attr('style')});
        if(img[0]!=undefined){
          that.BackUI[that.cl[that.id]] = {image:cont+img[0].outerHTML,style:'position:absolute;z-index:1;top:'+this.relativeYBack[this.cl[this.id]]+'px;left:'+this.relativeXBack[this.cl[this.id]]+'px; z-index: '+(this.reswitchBack[this.cl[this.id]])+';transform:rotate('+that.stateBack[that.cl[that.id]]+'deg);'}; // +$(img[0].outerHTML).attr('style')
        }
        this.isresizeBack = false; this.iscloseBack=false;this.isokBack=false;
        $(".imgAreaBack .imageAreaBack"+this.cl[this.id]).remove("img");
        this.entryImgBack=false;
      }
    }
  }

  closeImage(){
    if(this.switchText=='Front'){
      $(".imageArea"+this.cl[this.id]).css("position","absolute");
      $(".imageArea"+this.cl[this.id]).css("z-index",this.zindex);
      $(".imgArea .imageArea"+this.cl[this.id]).remove("img");
      this.ArworkIMG[this.cl[this.id]] = undefined;
      this.isresize = false; this.isclose=false;this.isok=false;
      this.entryImg=false;
    }else{
      $(".imageAreaBack"+this.cl[this.id]).css("position","absolute");
      $(".imageAreaBack"+this.cl[this.id]).css("z-index",this.zindex);
      $(".imgAreaBack .imageAreaBack"+this.cl[this.id]).remove("img");
      this.ArworkIMGBack[this.cl[this.id]] = undefined;
      this.isresizeBack = false; this.iscloseBack=false;this.isokBack=false;
      this.entryImgBack=false;
    }
  }

  reswitch:any = []; reswitchBack:any = [];
  reswitchClipart(event: any){

    console.log(event.value);

    var delta = event.value;
    /*var zoom = this.canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;*/
    this.canvas.setZoom(delta);
    /*opt.e.preventDefault();
    opt.e.stopPropagation();*/

    if(this.switchText=='Front'){
     // if(this.reswitch.length>0 && this.reswitch[this.cl[this.id]]!=undefined){
        //if(this.reswitch[this.cl[this.id]]==0){
          this.reswitch[this.cl[this.id]] = event.value;
        // }else{
        //   this.reswitch[this.cl[this.id]] = 0;
        // }
      // }else{
      //   this.reswitch[this.cl[this.id]] = event.value;
      // }
      $("#imgBlock-"+this.cl[this.id]).css("z-index",this.reswitch[this.cl[this.id]]);
    }else{
      this.reswitchBack[this.cl[this.id]] = event.value;
      $("#imgBlockBack-"+this.cl[this.id]).css("z-index",this.reswitchBack[this.cl[this.id]]);
    }
  }

  

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  duplicateID:any = [];
  dupCnt:number = 0;
  entryImg:boolean=false;
  entryImgBack:boolean = false;
  frontUIActive:any;
  backUIActive:any;
  BackUI:any = [];
  addImageOnSvg(x1:any,i:any){
    
    $(".imgArea").css("width","100px");
    $(".imgArea").css("height","100px");
      var tempID = this.id; 
      if(this.duplicateID.includes(i)){
        this.id = this.id+''+this.dupCnt;
        i = i+''+this.dupCnt;
        this.dupCnt++;
      }
      this.duplicateID.push(i);
      if(this.cl[tempID]==undefined){
        this.cl[tempID] = i;
      }
      if(this.switchText=='Front'){
        
        if(this.entryImg){ 
          var img:any = $(".imgArea").find(".imageArea"+this.cl[tempID]);
          if(this.size && this.size[this.cl[tempID]] && this.size[this.cl[tempID]]){
            img.attr('width',this.size[this.cl[tempID]].width).attr('height',this.size[this.cl[tempID]].height);
          }
          img.attr('title','X: '+this.relativeX[this.cl[tempID]]+' | Y: '+this.relativeY[this.cl[tempID]]);
          var cont = "<div class='canvasImgDyna"+this.cl[tempID]+"' style='position:absolute;z-index:1;top:"+this.relativeY[this.cl[tempID]]+"px;left:"+this.relativeX[this.cl[tempID]]+"px;'>";
          $("#canvasArea").append(cont);
          $(img[0]).addClass("fixedPic");
          this.frontUI.push({image:cont+img[0].outerHTML,style:'position:absolute;z-index:1;top:'+this.relativeY[this.cl[tempID]]+'px;left:'+this.relativeX[this.cl[tempID]]+'px;'+$(img[0].outerHTML).attr('style')});
          cont += "</div>";
          // if($("#canvasArea .canvasImgDyna"+this.cl[tempID]).find("img").length <=0){
          //   $("#canvasArea .canvasImgDyna"+this.cl[tempID]).append(img);
          // }
          $(".imageArea"+this.cl[tempID]).css("position","absolute");
          $(".imageArea"+this.cl[tempID]).css("z-index",this.zindex);
          $(".imgArea .imageArea"+this.cl[tempID]).remove("img");
        }
        this.entryImg = true;
        this.id = i;
        this.cl[this.id] = i;
        setTimeout(() => {
          var cont2 = '<img src="'+this.appurl+x1.artwork_image+'" class="imageArea'+i+' dynamicPic '+this.cl[tempID]+' '+i+'" height="100" width="100">';
          this.frontUIActive = cont2;
          $("#imgBlock-"+i).append(cont2);
          //this.frontUI.push(cont2);
          //console.log(this.frontUI);
        }, 500);

      }else{
         if(this.entryImgBack){
          var img:any = $(".imgAreaBack").find(".imgAreaBack"+this.cl[tempID]);
          if(this.sizeBack && this.sizeBack[this.cl[tempID]] && this.sizeBack[this.cl[tempID]]){
            img.attr('width',this.sizeBack[this.cl[tempID]].width).attr('height',this.sizeBack[this.cl[tempID]].height)
          }
          var cont = "<div class='canvasImgDynaBack"+this.cl[tempID]+"' style='position:absolute;z-index:1;top:"+this.relativeYBack[this.cl[tempID]]+"px;left:"+this.relativeXBack[this.cl[tempID]]+"px;'>";
          $("#canvasAreaBack").append(cont);
          $(img[0]).addClass("fixedPic");
          this.BackUI.push({image:cont+img[0].outerHTML,style:'position:absolute;z-index:1;top:'+this.relativeY[this.cl[tempID]]+'px;left:'+this.relativeX[this.cl[tempID]]+'px;'+$(img[0].outerHTML).attr('style')});
          cont += "</div>";
          $(".imageAreaBack"+this.cl[tempID]).css("position","absolute");
          $(".imageAreaBack"+this.cl[tempID]).css("z-index",this.zindex);
          $(".imgAreaBack .imageAreaBack"+this.cl[tempID]).remove("img");
        }
        this.entryImgBack = true;
        this.id = i;
        this.cl[this.id] = i;
        setTimeout(() => {
          var cont2 = '<img src="'+this.appurl+x1.artwork_image+'" class="imageAreaBack'+i+' dynamicPic '+this.cl[tempID]+' '+i+'" height="100" width="100">';
          this.backUIActive = cont2;
          $("#imgBlockBack-"+i).append(cont2);
          //this.BackUI.push(cont2);
        }, 500);
    }

    // this.elementRef.nativeElement.querySelector('image')
    //                             .addEventListener('click', this.test.bind(this));

    // (cdkDragEnded)="drop($event)" cdkDrag [style.top.px]="initialPosition.y"
    //     [style.left.px]="initialPosition.x" (cdkDragMoved)="dragMoved($event)"
    this.checkImg();
  }

  
  isresize:boolean=false;
  isclose:boolean = false;
  isok:boolean = false;

  isresizeBack:boolean=false;
  iscloseBack:boolean = false;
  isokBack:boolean = false;

  checkImg(): any{
    if(this.scale=='non_scalable'){
      this.isresize = false;
      this.isresizeBack = false;
    }else{
      if(this.switchText=='Front'){
        this.isresize = true;
      }else{   
        this.isresizeBack = true;
      }
    }
    if(this.switchText=='Front'){
      this.isclose = true;
      this.isok = true;  
    }else{   
      this.iscloseBack = true;
      this.isokBack = true;
    }
    
  }

  inBounds = true;
  edge = {
    top: true,
    bottom: true,
    left: true,
    right: true
  };

  checkEdge(event:any) {
    this.edge = event;
    console.log('edge:', event);
  }

  uiElement:any = {tile_color:''};
  preview:any = {preview:'',preview_file:''};
  isBoth:boolean = false;
  switchView:any; switchText:any='Front'; activeText:any='Back';
  fCanvasWidth:any; bCanvasWidth:any;
  fCanvasHeight:any; bCanvasHeight:any;
  frontProduct:string=''; backProduct:string='';
  printLocation:string = 'both'; scale:string = "scalable";
  username:string = '';
  eventname:string ='';
  front_canvas_actual_width = 0;
  front_canvas_actual_height = 0;
  back_canvas_actual_width = 0;
  back_canvas_actual_height = 0;
  
  addLayer(){
    var activeObject = this.canvas.getActiveObject() == null ? '' : this.canvas.getActiveObject();
    this.canvas.sendToBack(activeObject);
    this.canvas.renderAll();
    // canvas.sendToBack(myObject)
    //canvas.bringForward(myObject)
    //canvas.bringToFront(myObject)    
   }

  addText() {

    let textString = this.textString;
    this.text = new fabric.IText(textString, {
      left: 10,
      top: 10,
      fontFamily: 'helvetica',
      angle: 0,
      fill: '#000000',
      scaleX: 0.5,
      scaleY: 0.5,
      fontWeight: '',
      hasRotatingPoint: true, borderColor: 'red',
    });
    this.extend(this.text, this.randomId());
    if (this.switchText == "Front") {
      this.canvas.add(this.text);
    } else {
      this.canvasBack.add(this.text);
    }

    this.selectItemAfterAdded(this.text);
    this.textString = '';
}

addColorText(color:any){
  this.text.set({ fill: color });
  if (this.switchText == "Front")
    this.canvas.renderAll();
  else
    this.canvasBack.renderAll();
  
}
addFontFamily(event:any){
  //if(this.switchText=="Front"){
    this.text.set({fontFamily: event.target.value});
  if (this.switchText == "Front")
    this.canvas.renderAll();
  else
    this.canvasBack.renderAll();
  //}else{}
}
addFontStyle(event:any){
  this.text.set({fontWeight: event.target.value});
  if (this.switchText == "Front")
    this.canvas.renderAll();
  else
    this.canvasBack.renderAll();
}
addFontSpace(event:any){
  this.text.set({charSpacing: event.target.value});
  if (this.switchText == "Front")
    this.canvas.renderAll();
  else
    this.canvasBack.renderAll();
}
//////////////////////////////////////////////////////////////////////////////////

draggingfront(){
    
    var el = document.querySelector('#frontCan');
    dragElement(el);

    function dragElement(elmntd:any) {
      
      var posd1 = 0, posd2 = 0, posd3 = 0, posd4 = 0;
      elmntd.onmousedown = dragMouseDown;
      
      function dragMouseDown(e:any) {
        
        e = e || window.event;
        var classList =  e.target.classList;
        if(classList[0].indexOf('upper-canvas') == -1){
          e.preventDefault();
          // get the mouse cursor position at startup:
          posd3 = e.clientX;
          posd4 = e.clientY;
          elmntd.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          elmntd.onmousemove = elementDragn;
        }
      }
    
      function elementDragn(e:any) {
        
        e = e || window.event;
        console.log(e);
        var classList =  e.target.classList;
        if(classList[0].indexOf('upper-canvas') == -1){
          e.preventDefault();
          // calculate the new cursor position:
          posd1 = posd3 - e.clientX;
          posd2 = posd4 - e.clientY;
          posd3 = e.clientX;
          posd4 = e.clientY;
          // set the element's new position:
          elmntd.style.top = (elmntd.offsetTop - posd2) + "px";
          elmntd.style.left = (elmntd.offsetLeft - posd1) + "px";
          //----front canvas----
          var divftop = <HTMLInputElement>document.getElementById('fcanvastop');
          var divfleft = <HTMLInputElement>document.getElementById('fcanvasleft');
          var varone = elmntd.offsetLeft - posd1;
          if (varone >= 0) {
            var vartwo = varone+45;
          }else{
            var vartwo = varone-85;
          }
          
          divftop.value  = (elmntd.offsetTop - posd2) + 'px';
          divfleft.value  = vartwo + "px";
          console.log('top '+(elmntd.offsetTop - posd2));
          console.log('varone '+varone);
          console.log('afteradd '+vartwo);
          // var parentOffset = $('#frontimg').offset();
          // var position = elmntd.offsetLeft - posd1;
          // var xPos =  parentOffset.left - position;
          // console.log('left '+xPos);
          
         
        }
      }
    
      function closeDragElement() {
        /* stop moving when mouse button is released:*/
        elmntd.onmouseup = null;
        elmntd.onmousemove = null;
        
      }
    }
}
draggingback(){
    
  var el = document.querySelector('#backCan');
  dragElement(el);

  function dragElement(elmntd:any) {
    
    var posd1 = 0, posd2 = 0, posd3 = 0, posd4 = 0;
    elmntd.onmousedown = dragMouseDown;
    
    function dragMouseDown(e:any) {
      
      e = e || window.event;
      var classList =  e.target.classList;
      if(classList[0].indexOf('upper-canvas') == -1){
        e.preventDefault();
        // get the mouse cursor position at startup:
        posd3 = e.clientX;
        posd4 = e.clientY;
        elmntd.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        elmntd.onmousemove = elementDragn;
      }
    }
  
    function elementDragn(e:any) {
      
      e = e || window.event;
      var classList =  e.target.classList;
      if(classList[0].indexOf('upper-canvas') == -1){
        e.preventDefault();
        // calculate the new cursor position:
        posd1 = posd3 - e.clientX;
        posd2 = posd4 - e.clientY;
        posd3 = e.clientX;
        posd4 = e.clientY;
        // set the element's new position:
        elmntd.style.top = (elmntd.offsetTop - posd2) + "px";
        elmntd.style.left = (elmntd.offsetLeft - posd1) + "px";
        //-----back canvas--------
        var divftop = <HTMLInputElement>document.getElementById('bcanvastop');
        var divfleft = <HTMLInputElement>document.getElementById('bcanvasleft');
        var varone = elmntd.offsetLeft - posd1;
        if (varone >= 0) {
          var vartwo = varone+45;
        }else{
          var vartwo = varone-85;
        }
        
        divftop.value  = (elmntd.offsetTop - posd2) + 'px';
        divfleft.value  = vartwo + "px";
      }
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      elmntd.onmouseup = null;
      elmntd.onmousemove = null;
      
    }
  }
}
// --------End----------------
  removeObjCanvas() {

    if (this.switchText == "Front") {
      var activeObject = this.canvas.getActiveObject() == null ? '' : this.canvas.getActiveObject();
      let activeGroup: any = '';
      try {
        activeGroup = this.canvas.getActiveObjects() == null ? '' : this.canvas.getActiveObjects();
      } catch (e) {
        console.log(e);
      }

      if (activeObject != '') {
        //if (confirm('Are you sure?')) {
        this.canvas.remove(activeObject);
        //}
      }
      if (activeGroup != {}) {
        // if (confirm('Are you sure?')) {
        // var objectsInGroup = activeGroup.getObjects();
        // this.canvas.discardActiveGroup();
        var that = this;
        activeGroup.forEach(function (object: any) {
          that.canvas.remove(object);
        });
        // }
      }
    } else {
      var activeObject = this.canvasBack.getActiveObject() == null ? '' : this.canvasBack.getActiveObject();
      let activeGroup: any = '';
      try {
        activeGroup = this.canvasBack.getActiveObjects() == null ? '' : this.canvasBack.getActiveObjects();
      } catch (e) {
        console.log(e);
      }

      if (activeObject != '') {
        this.canvasBack.remove(activeObject);
      }
      if (activeGroup != {}) {
        var that = this;
        activeGroup.forEach(function (object: any) {
          that.canvasBack.remove(object);
        });
      }
    }
  
}

  extend(obj:any, id:any) {
      var that = this;
      obj.toObject = (function (toObject) {
        return function () {
          return fabric.util.object.extend(toObject.call(that), {
            id: id
          });
        };
      })(obj.toObject);
  }
  //======= this is used to generate random id of every object ===========
  randomId() {
      return Math.floor(Math.random() * 999999) + 1;
  }
  //== this function is used to active the object after creation ==========
  selectItemAfterAdded(obj:any) {
      this.canvas.discardActiveObject().renderAll();
      this.canvas.setActiveObject(obj);
  }

  addFigure(figure:any) {
    let add: any;
    switch (figure) {
      case 'rectangle':
        add = new fabric.Rect({
          width: 200, height: 100, left: 10, top: 10, angle: 0,
          fill: '#3f51b5'
        });
        break;
      case 'square':
        add = new fabric.Rect({
          width: 100, height: 100, left: 10, top: 10, angle: 0,
          fill: '#4caf50'
        });
        break;
      case 'triangle':
        add = new fabric.Triangle({
          width: 100, height: 100, left: 10, top: 10, fill: '#2196f3'
        });
        break;
      case 'circle':
        add = new fabric.Circle({
          radius: 50, left: 10, top: 10, fill: '#ff5722'
        });
        break;
    }
    this.extend(add, this.randomId());
    this.canvas.add(add);
    this.selectItemAfterAdded(add);
}

ExportToContent(input:any) {
  if(input == 'json'){
    this.OutputContent = JSON.stringify(this.canvas);
  }else if(input == 'svg'){
   this.OutputContent = this.canvas.toSVG();
  }
}

getBGCanvas(){
  /*var that = this;
  var canvas:any = new fabric.Canvas('mainCanvas');
  canvas.setWidth(650);
  canvas.setHeight(650);

  fabric.Image.fromURL(this.product.file, function(img:any) {
    // add background image
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
       scaleX: canvas.width / img.width,
       scaleY: canvas.height / img.height,
      backgroundImageStretch: true
    });
 });
*/


}


addImageCanvas(x:any,i:any){
  //if(this.canvas==undefined){
  //  this.canvas = new fabric.Canvas('canvas');

  var HideControls = {
    'tl': true,
    'tr': false,
    'bl': true,
    'br': true,
    'ml': true,
    'mt': true,
    'mr': true,
    'mb': true,
    'mtr': true
  };


  if (this.switchText == "Front") {
    this.canvas.setWidth(this.fCanvasWidth);
    this.canvas.setHeight(this.fCanvasHeight);
    var that = this;
    ///assets/img/80.png
    fabric.util.loadImage('/assets/uploads/' + x.artwork_image, function (myImg:any) {
      //i create an extra var for to change some image properties
      /*var img1 = myImg.set({ left: 0, top: 0 });
      */
      var img1 = new fabric.Image(myImg);
      that.canvas.add(img1);
      img1.scaleToHeight(150);
      img1.scaleToWidth(150);
      img1.crossOrigin = "anonymous";
      img1.setOptions({ borderColor: 'red' });
      img1.setControlsVisibility(HideControls);
    });

    this.canvas.on('mouse:down', function (event: any) {
      if (that.canvas.getActiveObject()) {
        //alert(event.target);
      }
    });

    
  } else {
    this.canvasBack.setWidth(this.bCanvasWidth);
    this.canvasBack.setHeight(this.bCanvasHeight);
    var that = this;
    fabric.Image.fromURL('/assets/uploads/' + x.artwork_image, function (myImg:any) {
      var img1 = myImg.set({ left: 0, top: 0 });
      img1.scaleToHeight(150);
      img1.scaleToWidth(150);
      img1.setOptions({ borderColor: 'red' });
      that.canvasBack.add(img1);
      img1.setControlsVisibility(HideControls);
    }.bind(this),{
      crossOrigin: 'anonymous'
    });

    this.canvasBack.on('mouse:down', function (event: any) {
      if (that.canvasBack.getActiveObject()) {}
    });
  }

    

  function addDeleteBtn(x: any, y: any) {
    $(".deleteBtn").remove();
    var btnLeft = x - 10;
    var btnTop = y - 10;
    var deleteBtn = '<img src="assets/img/delete.png" class="deleteBtn" style="position:absolute;top:' + btnTop + 'px;left:' + btnLeft + 'px;cursor:pointer;width:25px;height:25px;background-color:#fcfcfc; padding:5px; border-radius:15px; "/>';
    $(".canvas-container").append(deleteBtn);
  }

  this.canvas.on('object:selected', function (e:any) {
    addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
  });
  this.canvasBack.on('object:selected', function (e: any) {
    addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
  });

  var that = this;
  this.canvas.on('mouse:down', function (e:any) {
    if (!that.canvas.getActiveObject()) {
      $(".deleteBtn").remove();
    }
  });
  this.canvasBack.on('mouse:down', function (e: any) {
    if (!that.canvasBack.getActiveObject()) {
      $(".deleteBtn").remove();
    }
  });

  
  this.canvas.on('mouse:down', function(opt:any) {
    var evt = opt.e;
    if (evt.altKey === true) {
      that.isDragging = true;
      that.selection = false;
      that.lastPosX = evt.clientX;
      that.lastPosY = evt.clientY;
    }
  });

  this.canvas.on('mouse:move', function(opt:any) {
    if (that.isDragging) {
      var e = opt.e;
      var vpt = that.canvas.viewportTransform;
      console.log(vpt);
      vpt[4] += e.clientX - that.lastPosX;
      vpt[5] += e.clientY - that.lastPosY;
      //that.canvas.requestRenderAll();
      that.lastPosX = e.clientX;
      that.lastPosY = e.clientY;
    }
  });
  this.canvas.on('mouse:up', function(opt:any) {
    // on mouse up we want to recalculate new interaction
    // for all objects, so we call setViewportTransform
    that.canvas.setViewportTransform(that.canvas.viewportTransform);
    that.isDragging = false;
    that.selection = true;
  });
  

  this.canvas.on('object:modified', function (e:any) {
    addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
  });
  this.canvasBack.on('object:modified', function (e: any) {
    addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
  });

  this.canvas.on('object:scaling', function (e:any) {
    $(".deleteBtn").remove();
  });
  this.canvas.on('object:moving', function (e:any) {
    $(".deleteBtn").remove();
  });
  this.canvas.on('object:rotating', function (e:any) {
    $(".deleteBtn").remove();
  });
  $(document).on('click', ".deleteBtn", function () {
    if (that.canvas.getActiveObject()) {
      that.canvas.remove(that.canvas.getActiveObject());
      $(".deleteBtn").remove();
    }
  });

  this.canvasBack.on('object:scaling', function (e: any) {
    $(".deleteBtn").remove();
  });
  this.canvasBack.on('object:moving', function (e: any) {
    $(".deleteBtn").remove();
  });
  this.canvasBack.on('object:rotating', function (e: any) {
    $(".deleteBtn").remove();
  });
  $(document).on('click', ".deleteBtn", function () {
    if (that.canvasBack.getActiveObject()) {
      that.canvasBack.remove(that.canvasBack.getActiveObject());
      $(".deleteBtn").remove();
    }
  });

 
}

  prodClr: any = {frontview:'',backview:''};
  canvasBack: any;

  ngOnInit(): void {

    var that = this;
    // that.draggingfront();
    // that.draggingback();
    fabric.Object.prototype.set({
      transparentCorners: false,
      borderColor: '#ff00ff',
      cornerColor: '#ff0000'
    });
    //setTimeout(function(){
      //if (that.switchText=="Front"){
        that.canvas = new fabric.Canvas('canvas', {
        hoverCursor: 'pointer',
        selection: true,
        //controlsAboveOverlay: true,
          selectionBorderColor: 'black'
        });

        that.canvasBack = new fabric.Canvas('canvasBack', {
          hoverCursor: 'pointer',
          selection: true,
          selectionBorderColor: 'black'
        });
     //} 
   // },1000);
   //-------------------------------------

   //=====Canvas inner zomming======
   that.canvas.on('mouse:wheel', function(opt: any) {
    var delta = opt.e.deltaY;
    var zoom = that.canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    that.canvas.setZoom(zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  })
  
  // -------------------------
  that.canvasBack.on('mouse:wheel', function(opt: any) {
    var delta = opt.e.deltaY;
    var zoom = that.canvasBack.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    that.canvasBack.setZoom(zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  })
// ========Canvas zooming event============

var fcanvaszooming = <HTMLInputElement>document.getElementById("frontCan");
fcanvaszooming.addEventListener("wheel", function(opt: any) {
  var widthfcanvas = <HTMLInputElement>document.getElementById('fcanvaswidth');
  var heightfcanvas = <HTMLInputElement>document.getElementById('fcanvasheight');

  var gbcr = $('.upper-canvas')[0].getBoundingClientRect();
    
    var elwidth = gbcr.width;
    var elheight = gbcr.height;
    if (opt.deltaY < 0)
  {
    //'scrolling up'
    var rightwidth = elwidth+58;
    var rightheight = elheight+58;
  }
  else if (opt.deltaY > 0)
  {
    //'scrolling down'
    var rightwidth = elwidth-58;
    var rightheight = elheight-58;
  }else{
    var rightwidth = elwidth;
    var rightheight = elheight;
  }
  widthfcanvas.value = rightwidth+'px';
  heightfcanvas.value = rightheight+'px';

})

// back canvas

var bcanvaszooming = <HTMLInputElement>document.getElementById("backCan");
bcanvaszooming.addEventListener("wheel", function(optb: any) {
  console.log('back');
  var widthbcanvas = <HTMLInputElement>document.getElementById('bcanvaswidth');
  var heightbcanvas = <HTMLInputElement>document.getElementById('bcanvasheight');

  var gbcrb = $('.upper-canvas')[1].getBoundingClientRect();
    
    var elbwidth = gbcrb.width;
    var elbheight = gbcrb.height;
    if (optb.deltaY < 0)
  {
    //'scrolling up'
    var rightbwidth = elbwidth+58;
    var rightbheight = elbheight+58;
  }
  else if (optb.deltaY > 0)
  {
    //'scrolling down'
    var rightbwidth = elbwidth-58;
    var rightbheight = elbheight-58;
  }else{
    var rightbwidth = elbwidth;
    var rightbheight = elbheight;
  }
  widthbcanvas.value = rightbwidth+'px';
  heightbcanvas.value = rightbheight+'px';

})

//=========End Canvas Move===========
    this.textString = null;
    this.OutputContent = null;
    
    console.log("user_id:" + this.userID,"product_id:"+this.productID, "psize:"+ this.productSize, "pColor:"+ this.pColor);

    this.http.post(this.url + 'get-product-details', { event_id: this.evID, user_id: this.userID, product_id: this.productID, psize: this.productSize, pColor: this.pColor, client_id:this.clientID }).subscribe((data: any) => {

      if(data.flag){
        this.product = data.product;
        this.prodClr = data.prod_colors;
        
        this.printLocation = data.productProp.print_location;
        this.scale = data.productProp.product_option;
        this.username = data.registration.first_name+' '+data.registration.last_name;
        this.eventname = data.eventData.app_name;
        
        $.each(data.prod_colors, function (k, rows: any) {
          
          if (rows.frontview_file != '') {
            that.prodClr.frontview = that.appurl + rows.frontview_file;
            var fwidth = (rows.resize_front_width);
            var fheight = (rows.resize_front_height);
            var ftop = (rows.front_canvas_top);
            var fleft = (rows.front_canvas_left);
            var fscal = 'scale('+rows.front_canvas_transform+')';
            $("#frontCan").show();
            $("#frontCan").css({"top":ftop});
            $("#frontCan").css({"left":fleft});
            $("#fcanvastop").val(ftop);
            $("#fcanvasleft").val(fleft);
            that.fCanvasWidth = fwidth;
            that.fCanvasHeight = fheight;
            that.canvas.setWidth(fwidth);
            that.canvas.setHeight(fheight);
            // that.canvas.style.width = fwidth+'cm';
            // that.canvas.style.height = fheight+'cm';

          } else if (rows.backview_file != '') {
            that.prodClr.backview = that.appurl + rows.backview_file;
            var bwidth = (rows.resize_back_width);
            var bheight = (rows.resize_back_height);
            that.bCanvasWidth = bwidth;
            that.bCanvasHeight = bheight;
            that.canvasBack.setWidth(bwidth);
            that.canvasBack.setHeight(bheight);
            var btop = (rows.back_canvas_top);
            var bleft = (rows.back_canvas_left);
            var bscal = 'scale('+rows.back_canvas_transform+')';
            $("#backCan").css({"top":btop});
            $("#backCan").css({"left":bleft});
            $("#bcanvastop").val(btop);
            $("#bcanvasleft").val(bleft);
          }
        });
        if(this.printLocation=='back_only'){
          this.product.file = this.appurl+data.product.backview_file;
          this.backProduct = this.appurl+data.product.backview_file;
          this.switchText = "Back";
        }else if(this.printLocation=='front_only'){
          this.product.file = this.appurl+data.product.frontview_file;
          this.frontProduct = this.appurl+data.product.frontview_file;
          this.switchText = "Front";
        }else{
          this.product.file = this.appurl+data.product.frontview_file;
          this.switchView = this.appurl+data.product.backview_file;
          this.frontProduct = this.appurl+data.product.frontview_file;
          this.backProduct = this.appurl+data.product.backview_file;
          this.switchText = "Front";
          this.activeText = "Back";
          this.isBoth = true;
        }
        this.product.svg = data.frontSvg;
        this.uiElement = data.uiElement;
        this.preview = data.preview;
        
        this.gallery = data.gallery;
      }
      this.pageLoaded=true;
    },(error:any)=>{ console.log(error) });

    var that = this;
    setTimeout(function(){
      that.getBGCanvas();
    },2000);
  }


  switchProductView(side:string){
    var tempView = this.product.file;
    $(".deleteBtn").css("display","none");
    if(side=='Front'){
      this.product.file = this.switchView;
      this.switchView = tempView;
      this.switchText = "Back";
      this.activeText = "Front";
    }else{
      this.product.file = this.switchView;
      this.switchView = tempView;
      this.switchText = "Front";
      this.activeText = "Back";
    }
  }

  switchToGal(){
    this.galleryTitle = 'Gallery';
    this.switchGal = true;
  }

  getCliparts(galID:any,title:string){
    this.galleryTitle = title;
    this.http.post(this.url+'get-artwork-by-gallery',{gallery_id:galID}).subscribe((data:any)=>{
      if(data.flag){
        this.cliparts = data.artworks;
        this.switchGal = false;
      }
    },(error:any)=>{ console.log(error) });
  }

  // @ViewChild('htmlContentHolder', { static: false,read: ElementRef }) htmlContentHolder!: ElementRef;
  // @ViewChild('canvas', { static: false,read: ElementRef }) canvas!: ElementRef;
  // @ViewChild('downloadLink', { static: false,read: ElementRef }) downloadLink!: ElementRef; //ElementRef | undefined

  ngAfterViewInit(): void {
    //console.log(this.downloadLink);
  }

  print:any = {front:{width:[],height:[],size:[],image:[],left:[],top:[],right:[],rotate:[],zindex:[],text1:{},text2:{}},
               back:{width:[],height:[],size:[],image:[],left:[],top:[],right:[],rotate:[],zindex:[],text1:{},text2:{}}};

              
  saveProduct(){


    //--------PDF--------------------
//     var pdf = new jsPDF({
//       orientation: 'p', // landscape
//       unit: 'pt', // points, pixels won't work properly
//        format: [1064.891, 765.354] // set needed dimensions for any element 612(21.59)*792(27.94),25*35.567
//      // format: [data.pageheight, data.pagewidth] // set needed dimensions for any element 612(21.59)*792(27.94)
      
//     }); 
//     if(this.printLocation == 'back_only'){
//       var imgData = this.canvasBack.toDataURL("image/jpeg", 1.0);
//       pdf.text(this.eventname+'     '+this.username+'     Back     '+this.product.name+'     '+this.pColor+'     '+this.productSize, 5, 15);
//       pdf.addImage(imgData, 'JPEG', 80, 80, this.canvasBack.width, this.canvasBack.height);
      
//     }
//     else if(this.printLocation == 'front_only'){
//         var imgData = this.canvas.toDataURL("image/jpeg", 1.0);
//         pdf.text(this.eventname+'     '+this.username+'     Front     '+this.product.name+'     '+this.pColor+'     '+this.productSize, 5,15);
//         pdf.addImage(imgData, 'JPEG', 80, 80, this.canvas.width, this.canvas.height);
      
//     }else if(this.printLocation == 'both'){
     
//       const img1 = this.canvas.toDataURL({ multiplier: 4 });
//       const img2  = this.canvasBack.toDataURL({ multiplier: 4 });
//       pdf.text(this.eventname+'     '+this.username+'     Front     '+this.product.name+'     '+this.pColor+'     '+this.productSize,3,15);
//       //pdf.addImage(img1, "JPEG", 0, 0, data.pagewidth, data.pageheight);
//       pdf.addImage(img1, 'JPEG', 0, 20, this.front_canvas_actual_width, this.front_canvas_actual_height);
//       pdf.addPage();
//      pdf.text(this.eventname+'     '+this.username+'     Back     '+this.product.name+'     '+this.pColor+'     '+this.productSize, 3, 15);
//       //pdf.addImage(img2, "JPEG",  0, 0, this.prodClr, data.pageheight);
//      pdf.addImage(img2, 'JPEG', 0, 20, this.back_canvas_actual_width, this.back_canvas_actual_height);
//     }
// //     console.log(pdf.getPageInfo);
// // console.log(pdf.fill);
//     pdf.save();

    //---------------------Save PDF File-----------------------

    //exit;
  // return false;


    var that = this;
    var getelementtop = <HTMLInputElement>document.getElementById('fcanvastop');
    var getelementleft = <HTMLInputElement>document.getElementById('fcanvasleft');
    var getelementtopb = <HTMLInputElement>document.getElementById('bcanvastop');
    var getelementleftb = <HTMLInputElement>document.getElementById('bcanvasleft');

    var getelementwidth = <HTMLInputElement>document.getElementById('fcanvaswidth');
    var getelementheight = <HTMLInputElement>document.getElementById('fcanvasheight');
    var getelementwidthb = <HTMLInputElement>document.getElementById('bcanvaswidth');
    var getelementheightb = <HTMLInputElement>document.getElementById('bcanvasheight');

    this.print['front'] = this.canvas.toSVG();
    this.print['back'] = this.canvasBack.toSVG();

    this.print['front_png'] = this.canvas.toDataURL({ multiplier: 4 });
    this.print['back_png'] = this.canvasBack.toDataURL({ multiplier: 4 });

    this.print['size'] = this.productSize;
    this.print['color'] = this.pColor;
    this.print['event_id'] = this.evID;
    this.print['user_id'] = this.userID;
    this.print['product_id'] = this.productID;
    this.print['client'] = this.route.snapshot.params.client;
    this.print['view'] = this.switchText;
    this.print['canvas_front_width'] = this.fCanvasWidth;
    this.print['canvas_front_height'] = this.fCanvasHeight;
    this.print['canvas_back_width'] = this.bCanvasWidth;
    this.print['canvas_back_height'] = this.bCanvasWidth;
    

    if(getelementtopb.value != ''){
    
      this.print['top_pos_back'] = getelementtopb.value;
    }else{
      
      this.print['top_pos_back'] = "0px";
    }
    if(getelementleftb.value != ''){
      this.print['left_pos_back'] = getelementleftb.value;
    }else{
      this.print['left_pos_back'] = "0px";
    }
    if(getelementtop.value != ''){
      this.print['top_pos_front'] = getelementtop.value;
    }else{
      this.print['top_pos_front'] = "0px";
    }
    if(getelementleft.value != ''){
      this.print['left_pos_front'] = getelementleft.value;
    }else{
      this.print['left_pos_front'] = "0px";
    }

    if(getelementwidth.value != ''){
      this.print['width_pos_back'] = getelementwidth.value;
    }else{
      this.print['width_pos_back'] = "0px";
    }
    if(getelementheight.value != ''){
      this.print['height_pos_back'] = getelementheight.value;
    }else{
      this.print['height_pos_back'] = "0px";
    }
    if(getelementwidthb.value != ''){
      this.print['width_pos_front'] = getelementwidthb.value;
    }else{
      this.print['width_pos_front'] = "0px";
    }
    if(getelementheightb.value != ''){
      this.print['height_pos_front'] = getelementheightb.value;
    }else{
      this.print['height_pos_front'] = "0px";
    }
    if(this.prodClr.length == 2){
      if(this.prodClr[0].front_canvas_height == 0){
        this.back_canvas_actual_height = this.prodClr[0].back_canvas_height*28.346;
        this.back_canvas_actual_width = this.prodClr[0].back_canvas_width*28.346;
      }else{
        this.front_canvas_actual_height = this.prodClr[0].front_canvas_height*28.346;
        this.front_canvas_actual_width = this.prodClr[0].front_canvas_width*28.346;
      }
      if(this.prodClr[1].front_canvas_width == 0){
        this.back_canvas_actual_height = this.prodClr[1].back_canvas_height*28.346;
        this.back_canvas_actual_width = this.prodClr[1].back_canvas_width*28.346;
      }else{
        this.front_canvas_actual_height = this.prodClr[1].front_canvas_height;
        this.front_canvas_actual_width = this.prodClr[1].front_canvas_width;
      }
    }else{
      if(this.prodClr[0].front_canvas_height == 0){
        this.back_canvas_actual_height = this.prodClr[0].back_canvas_height*28.346;
        this.back_canvas_actual_width = this.prodClr[0].back_canvas_width*28.346;
      }else{
        this.front_canvas_actual_height = this.prodClr[0].front_canvas_height*28.346;
        this.front_canvas_actual_width = this.prodClr[0].front_canvas_width*28.346;
      }

    }
    
    
console.log(this.print);
    //@ViewChild('mymodal', { static: false,read: ElementRef }) mymodal!: ElementRef;
    this.http.post(this.url+'create-print-prop',this.print).subscribe((data:any)=>{
      if(data.flag){
console.log(data);

        //--------PDF--------------------
        

        var pdf = new jsPDF({
          orientation: data.orientation, // landscape
          unit: 'pt', // points, pixels won't work properly
          // format: [792, 612] // set needed dimensions for any element 612(21.59)*792(27.94)
          format: [data.pageheight,data.pagewidth] // set needed dimensions for any element 612(21.59)*792(27.94) 
          // pageheight: 1008.182182 = 35.56
          // pagewidth: 611.99014 = 21.58
          
        }); 
        if(this.printLocation == 'back_only'){
          var imgData = this.canvasBack.toDataURL("image/jpeg", 1.0);
          pdf.text(this.eventname+'     '+this.username+'     Back     '+this.product.name+'     '+this.pColor+'     '+this.productSize, 3, 15);
          pdf.addImage(imgData, 'JPEG', 0, 20, this.back_canvas_actual_width, this.back_canvas_actual_height);
          
        }
        else if(this.printLocation == 'front_only'){
            var imgData = this.canvas.toDataURL("image/jpeg", 1.0);
            pdf.text(this.eventname+'     '+this.username+'     Front     '+this.product.name+'     '+this.pColor+'     '+this.productSize, 3,15);
            pdf.addImage(imgData, 'JPEG', 0, 20, this.front_canvas_actual_width, this.front_canvas_actual_height);
          
        }else if(this.printLocation == 'both'){
          //console.log(this.back_canvas_actual_width+' '+this.back_canvas_actual_height+' '+this.front_canvas_actual_width+' '+this.front_canvas_actual_height);
          const img1 = this.canvas.toDataURL({ multiplier: 4 });
          const img2  = this.canvasBack.toDataURL({ multiplier: 4 });
          pdf.text(this.eventname+'     '+this.username+'     Front     '+this.product.name+'     '+this.pColor+'     '+this.productSize, 3,15);
          //pdf.addImage(img1, "JPEG", 0, 0, data.pagewidth, data.pageheight);
          pdf.addImage(img1, 'JPEG', 0, 20, this.front_canvas_actual_width, this.front_canvas_actual_height);
          pdf.addPage();
         pdf.text(this.eventname+'     '+this.username+'     Back     '+this.product.name+'     '+this.pColor+'     '+this.productSize, 3, 15);
          //pdf.addImage(img2, "JPEG",  0, 0, this.prodClr, data.pageheight);
          pdf.addImage(img2, 'JPEG', 0, 20, this.back_canvas_actual_width, this.back_canvas_actual_height);
        }
console.log(pdf.getPageInfo);
console.log(pdf.fill);
            //---------------------Save PDF File-----------------------

            var blob = pdf.output('blob');
            var formData = new FormData();
            formData.append('pdf', blob);
            formData.append('filename',data.pdffilename);
            formData.append('orderid',data.orderid);
              

            // ------------------------------------------
            this.http.post(this.url+'save-pdf',formData).subscribe((data:any)=>{
              if(data.flag){
                this.modalService.dismissAll();
                var productIDSZ = this.productID + '__' + this.productSize + '__' + this.pColor;
                // this.router.navigate(['/confirm-order/'+this.evID+'/'+this.userID+'/'+productIDSZ+'/'+this.route.snapshot.params.client]);
                //this.router.navigate(['/preview/'+this.evID+'/'+this.userID+'/'+productIDSZ+'/'+this.route.snapshot.params.client]);
                this.router.navigate(['/thank-you/'+this.evID+'/'+this.userID+'_'+data.eventType]);
              }
            },(error)=>{
              console.log('failure');
              console.log(error);
              return false;

            });


            //-------------End Save PDF File----------------------------
            //pdf.save("download.pdf");


            //-------End PDF------------------
        
      }
    },(error:any)=>{ console.log(error) });

    // html2canvas(this.htmlContentHolder.nativeElement,{allowTaint: true,useCORS:false}).then(canvas => {
    //   this.canvas.nativeElement.src = canvas.toDataURL();
    //   this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
    //   this.downloadLink.nativeElement.download = 'marble-diagram.png';
    //   this.downloadLink.nativeElement.click();
    // });
  }  
  rotateSlider:number = 0;
  formatLabelRotate(value: number) {
    return value+"°";
  }

  rotateArt(event: any){
    console.log(this.state);
    if(this.switchText=='Front'){
      $(".imageArea"+this.cl[this.id]).css("transform","rotate("+event.value+"deg)");
      this.state[this.cl[this.id]] = event.value;
      // this.reswitch[this.cl[this.id]] = event.value;
      // $("#imgBlock-"+this.cl[this.id]).css("z-index",this.reswitch[this.cl[this.id]]);
    }else{
      $(".imageAreaBack"+this.cl[this.id]).css("transform","rotate("+event.value+"deg)");
      this.stateBack[this.cl[this.id]] = event.value;
    }
  }

}
