import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {
  cardid : any;
  card_details: any = {};
  qr_valies:any={};
  imgBaseUrl = environment.img_baseurl
  
  showElement=true;
  myuserid: any;

  constructor(public commonService: CommonService,private api: ApiService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loader();

    this.myuserid = localStorage.getItem("userid")

    const routeParams = this.activeRoute.snapshot.params;
    this.cardid = routeParams.id;
    this.api.CARD_DETAILS({ cardid: this.cardid }).subscribe(result => {
      console.log(result);
      if(result.status == true)
      {
        this.card_details = result.data;
        console.log("card details", this.card_details);
 
        this.qr_valies=JSON.stringify({type:"exchange_card",card_id:this.cardid,userid:this.card_details.user_id})
        console.log("qrdata",this.qr_valies)
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


  loader(){
    this.showElement = true;
    setTimeout(() => {
      this.showElement = false;
    }, 500);
}
}
