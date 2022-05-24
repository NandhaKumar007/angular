import { Component, OnInit, ɵConsole } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-receive-card',
  templateUrl: './receive-card.component.html',
  styleUrls: ['./receive-card.component.scss']
})
export class ReceiveCardComponent implements OnInit {
  cardid : any;
  card_details: any = {};
  mycontact : any = {};
  imgBaseUrl = environment.img_baseurl
  scannresult: string;
  scanned_value:any={};
  enterd_code: any={};
  pins: any;
  pininvalid=false;
  btnloder: boolean;
  showElement=true;
  ex_alart_t=false;
  ex_alart_f=false;
  se_alart_t=false;
  se_alart_f=false;
  constructor(public commonService: CommonService,private api: ApiService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void 
  {
    this.loader();
    const routeParams = this.activeRoute.snapshot.params;
    this.cardid = routeParams.id;
    this.api.CARD_DETAILS({ cardid: this.cardid }).subscribe(result => {
      console.log(result);
      if(result.status == true)
      {
        this.card_details = result.data;
        console.log(this.card_details)
        
      }
      else
      {
        if(result.message =="Invalid user")
          {
            localStorage.removeItem("customer_token");
            sessionStorage.clear();
            this.router.navigate(["/login"]);
          }
      }
    });
  }
  savecontact()
  {

    // console.log("card details", this.card_details);
    // this.mycontact.card_id = this.card_details._id;
    // this.mycontact.cardname = this.card_details.name;
    // this.mycontact.company = this.card_details.company;
    // this.mycontact.designation = this.card_details.designation;
    this.btnloder=true;
    this.pins = this.enterd_code.pin1 + this.enterd_code.pin2 + this.enterd_code.pin3 + this.enterd_code.pin4 + this.enterd_code.pin5 + this.enterd_code.pin6;
  
    this.api.ADD_CONTACT_IN_CODE({pin_no:this.pins}).subscribe(result => {
    
      this.btnloder=false;
      if(result.status == true)
      {
        this.se_alart_t=false;
        this.se_alart_f=true;
        setTimeout(()=>this.router.navigate(["/home"]),1000)
        this.pininvalid=false;
      }else{
        this.ex_alart_t=false;
        this.ex_alart_f=false;
      }
      if(result.message == "Invalid Pin"){
        this.pininvalid=true;
        this.se_alart_t=false;
        this.se_alart_f=false;
      }
      if(result.message == "Already saved"){
        this.se_alart_t=true;
        this.se_alart_f=false;
        setTimeout(()=>this.router.navigate(["/home"]),1000)
      }
    });
  }
  handleQrCodeResult(result:string){

    this.scanned_value=JSON.parse(result)
    this.api.ADD_CONTACT(this.scanned_value).subscribe((result)=>{
if(result.message == "already saved"){
  this.ex_alart_t=true;
  this.ex_alart_f=false;
  setTimeout(()=>this.router.navigate(["/home"]),1000)
}else{
  this.ex_alart_t=false;
  this.ex_alart_f=true; 
}
if(result.message == "Exchange card Saved Successfully"){
  this.ex_alart_t=false;
  this.ex_alart_f=true;
  setTimeout(()=>this.router.navigate(["/home"]),1000)
}
if(result.message == "recivecard already saved"){
  this.se_alart_t=true;
  this.se_alart_f=false;
  setTimeout(()=>this.router.navigate(["/home"]),1000)
}
if(result.message == "recive card successfully"){
  this.se_alart_t=false;
  this.se_alart_f=true;
  setTimeout(()=>this.router.navigate(["/home"]),1000)
}
    })
    }


    move(e:any, p:any, c:any, n:any){
      var length = c.value.length;
      var maxlength = c.getAttribute('maxlength');
      if(length == maxlength){
        if(n != ""){
          n.focus();
        }
      }
      if(e.key === "Backspace"){
        if( p != ""){
          this.pininvalid=false;
          p.focus();
        }
      }
    }


    loader(){
      this.showElement = true;
      setTimeout(() => {
        this.showElement = false;
      }, 500);
  }
}
