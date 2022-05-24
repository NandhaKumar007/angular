import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-send-card',
  templateUrl: './send-card.component.html',
  styleUrls: ['./send-card.component.scss']
})
export class SendCardComponent implements OnInit {

  cardid : any;
  card_details: any = {};
  imgBaseUrl = environment.img_baseurl;
  cardurl = environment.cardurl;
  qrcodeurl: any = String;
  randomnumber : any;
  before_copy = true;
  after_copy = false;
  timeralert = false;
  subscribeTimer: number;
  timeLeft: number;
  interval: number;
  count: number;
  showElement=true;
  myuserid: string;


  constructor(public commonService: CommonService,private api: ApiService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loader();
    // console.log(random.length);
    this.myuserid= localStorage.getItem("userid")
    const routeParams = this.activeRoute.snapshot.params;
    this.cardid = routeParams.id;
    this.randomString();
    console.log('cardddddd',this.cardid)
    
  }

  
 
  sendcard()
  {
    // console.log('send card url',this.qrcodeurl);
    window.location.href = this.cardurl+this.card_details.qrcodeurl;
    // this.router.navigate([this.card_details.qrcodeurl]);

  }

  randomString()
  {
    this.randomnumber = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    console.log(this.randomnumber);

     /**get card details */
     this.api.SEND_CARD_DETAILS({ cardid: this.cardid,temp_codes:this.randomnumber }).subscribe(result => {
      console.log(result);
      this.timeralert=false;
    this.timerstart();
    
    this.before_copy = true;
    this.after_copy = false; 
      if(result.status == true)
      {
        this.card_details = result.data;
        // this.qrcodeurl = this.cardurl+"receive-card/"+this.card_details._id;
        this.card_details.qrcodeurl = JSON.stringify({type:"receive_card",cardid:this.card_details._id});
        console.log(this.card_details.qrcodeurl);
        console.log("card details", this.card_details);
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
  
  // randomString() {
  //   const chars = '0123456789';
  //   const stringLength = 6;
  //   let randomstring = '';
  //   for (let i = 0; i < stringLength; i++) {
  //   const rnum = Math.floor(Math.random() * chars.length);
  //   console.log(rnum);
  //   randomstring += chars.substring(rnum, rnum + 1);
  //   console.log(randomstring)
  //  }
  //   // this.codeGenerated = randomstring;
  //   // return 0;
  //  }
  
  copy_button(){
    this.before_copy = false;
    this.after_copy = true; 
  }


  loader(){
    this.showElement = true;
    setTimeout(() => {
      this.showElement = false;
    }, 500);
}


timerstart(){
  /**timer start */
  this.timeLeft = 100; 
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        if(this.timeLeft == 0){
          clearInterval(this.interval)
          this.timeralert=true;
          // if(this.timeralert=true){
          //   this.randomString();
          //   this.timerstart();
          // }else{
          //   console.log("error")
          // }
        }else{       
        }
      } else {
      }
    },1000)
  
}


}
