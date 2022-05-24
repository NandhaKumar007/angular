import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import { VCard } from 'ngx-vcard';
import { VCardEncoding } from 'ngx-vcard';
import { VCardFormatter } from 'ngx-vcard';
declare var $: any;

@Component({
  selector: 'app-mycontact',
  templateUrl: './mycontact.component.html',
  styleUrls: ['./mycontact.component.scss']
})
export class MycontactComponent implements OnInit {

  cardid : any; userid : any;
  card_details: any = {};
  imgBaseUrl = environment.img_baseurl;
  cardurl = environment.cardurl;
  public vCardEncoding: typeof VCardEncoding = VCardEncoding;
  public vCard: VCard ;
  public vCardString : any;

  btn_alert1=false;
  btn_alert2=false;
  showElement = true;

  constructor(public commonService: CommonService,private api: ApiService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() 
  {
    
    this.loader();


    const routeParams = this.activeRoute.snapshot.params;
    console.log(routeParams)
    this.cardid = routeParams.cardid;
    this.userid = routeParams.userid;

    this.api.CONTACT_DETAILS({ cardid: this.cardid, userid : this.userid }).subscribe(result => {
      console.log(result);

      if(result.status == true)
      {
        this.card_details = result.data;
        console.log("card details", this.card_details);
        console.log("card details 123123123123", this.card_details.email[0].emailvalue);
        this.vCard = { name: { firstNames: this.card_details.name, lastNames: '' }, telephone:[{ value: this.card_details.phone[0].phonevalue,  param: {  type: 'cell' }}], email:[this.card_details.email[0].emailvalue]  };
        this.vCardString = VCardFormatter.getVCardAsString(this.vCard);
        
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

  sendcard()
  {
    // let sendurl = '/receive-card/'+this.card_details._id+'/'+this.card_details.name;
    let sendurl = '/send-card/'+this.card_details._id+'/'+this.card_details.name;
    console.log(sendurl);
    this.router.navigate([sendurl]);
  }

  webshare()
  {
    let shareurl = this.cardurl+'/receive-card/'+this.card_details._id+'/'+this.card_details.name;
    let sharetext = this.card_details.name + '-' + this.card_details.company;
    if (navigator.share) {
      navigator.share({
        title: 'My Card',
        text: sharetext,
        url: shareurl
      }).then(() => {
        console.log('Thanks for sharing!');
      })
      .catch(err => {
        console.log(`Couldn't share because of`, err.message);
      });
    } else {
      console.log(shareurl);
      console.log('web share not supported');
    }
  }

  delete()
  {
    
    $('#deleteModal').modal("show");
  }
  contact_delete(){
    this.api.MYCONTACT_DELETE({cardid:this.cardid,userid:this.userid}).subscribe((result)=>{
console.log("delete card result",result)
if(result.status == true){
  // this.router.navigate(["/home"]);
  if(result.message === "customer removed successfully"){
    this.btn_alert1=true;
    this.btn_alert2=false;
    setTimeout(()=>this.router.navigate(["/home"]),1000)
    
    // this.router.navigate(["/home"]);
  }else{
    this.btn_alert1=false;
    this.btn_alert2=true;
  }
}else{
  console.log("contact no deleted")
}
    })
  }

  

}
