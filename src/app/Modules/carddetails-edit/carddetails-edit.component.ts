import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { CommonService } from '../../services/common.service';  
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import Pickr from '@simonwep/pickr';
declare let $: any;

@Component({
  selector: 'app-carddetails-edit',
  templateUrl: './carddetails-edit.component.html',
  styleUrls: ['./carddetails-edit.component.scss']
})
export class CarddetailsEditComponent implements OnInit {
  pageLoader: boolean; userStatus: boolean;
  public files: any[]; imgURL: any; logoimage : any;
  cardid : any; cardbg : String; cardcolor : String; 
  card_details: any = {};
  imgBaseUrl = environment.img_baseurl;
  btn_alert1=false;
  btn_alert2=false;
  btnloder = false;

  // public innerHeight: any;
  // public screenHeight: any;
  // public screenWHeight: any

  // isFocused: boolean  = false;

//   @HostListener('window:resize', ['$event'])
// onResize(event) {
//   this.innerHeight = window.innerHeight;
//   this.screenHeight = screen.availHeight;
//   this.screenWHeight = screen.height;
//   console.log('this. inner width', this.innerHeight)
// }

// @HostListener('window:popstate', ['$event'])
//   onPopState(event) {
//     this.innerHeight = event;
//     console.log('Back button pressed');
//   }


keyboardRender: boolean = false;
showElement=true;

  constructor(public commonService: CommonService,private api: ApiService, private router: Router, private activeRoute: ActivatedRoute) { 
    let _originalSize = $(window).width() + $(window).height()
    $(window).resize(() => {
      if($(window).width() + $(window).height() != _originalSize) {
        this.keyboardRender = true;
      }
      else {
        this.keyboardRender = false;
      }
    });
 
  }

  ngOnInit() 
  {
    this.loader();
    const routeParams = this.activeRoute.snapshot.params;
    this.cardid = routeParams.id;
    this.api.CARD_DETAILS({ cardid: this.cardid }).subscribe(result => {
      console.log(result);
      if(result.status == true)
      {
        this.card_details = result.data;
        this.logoimage = result.data.logoimage;
        this.card_details.logoimage = this.imgBaseUrl + result.data.logoimage;
        console.log("card details", this.card_details);
      }
    });


    const pickr = new Pickr({
      el: '.color-picker',
      default: '#000000',
      theme: 'nano',
      lockOpacity: true,
      useAsButton : true,
  
      swatches: [
        'rgba(255, 255, 255, 1)',
        'rgba(233, 30, 99, 0.95)',        
      ],
  
      components: {
        preview: true,
        opacity: true,
        hue: true,
  
        interaction: {
          hex: true,
          rgba: true,
          input: true,
          clear: true,
          save: true,
        }
      }
    });

    const pickr1 = new Pickr({
      el: '.color-picker1',
      default: '#000000',
      theme: 'nano',
      lockOpacity: true,
      useAsButton : true,
  
      swatches: [
        'rgba(255, 255, 255, 1)',
        'rgba(233, 30, 99, 0.95)',        
      ],
  
      components: {
        preview: true,
        opacity: true,
        hue: true,
  
        interaction: {
          hex: true,
          rgba: true,
          input: true,
          clear: true,
          save: true,
        }
      }
    });

    pickr.on('change', (color, instance) => {
    this.cardbg = color.toRGBA().toString(2);    
    this.card_details.cardcolor =  color.toRGBA().toString(2);
    })

    pickr1.on('change', (color, instance) => {
      this.cardcolor = color.toRGBA().toString(2); 
      this.card_details.textcolor = color.toRGBA().toString(2); 
    })
  }

  fileChangeListener(event) {
    if(event.target.files && event.target.files[0]) { 
      console.log(event.target.files[0].name);
      this.card_details.logoname = event.target.files[0].name;
      let reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.card_details.image = (<FileReader>event.target).result;
        this.card_details.logoimage = (<FileReader>event.target).result;
        this.card_details.img_change = true;
        this.imgURL = reader.result; 
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onUpdate() 
  {
    this.btnloder=true;
      console.log("form card details", this.card_details);
      if(!this.card_details.img_change)
      {
        this.card_details.logoimage = this.logoimage;
      }
    
      this.card_details.submit = true;    
      this.card_details.user_id = localStorage.getItem("userid");
      this.card_details.useremail = localStorage.getItem("useremail");
      this.api.UPDATE_MYCARD(this.card_details).subscribe(result => {     
      this.card_details.submit = false;

      if(result.status ) 
      {
        // this.router.navigate(["/home"]);
        if(result.message === "your card updated successfully"){
          this.btn_alert1=true;
          this.btn_alert2=false;
          this.btnloder=false;
          setTimeout(()=>this.router.navigate(["/home"]),1000)
        }else{
          this.btn_alert1=false;
          this.btn_alert2=true;
        }
      }
      else 
      {
      this.card_details.errorMsg = result.message;
      console.log("response", result);
      }
      });
  }


  loader(){
    this.showElement = true;
    setTimeout(() => {
      this.showElement = false;
    }, 500);
}
  // changeClass(event) {
  //   console.log('event triggered', event);
  //   if(event  === 'focus') {
  //     this.isFocused = true;
  //   } else {
  //     this.isFocused = false;
  //   }
  // }'

  


}
