import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageLoader: boolean; 
  userStatus: boolean;
  cardlist : any = []; 
  contactlist : any = []; 
  imgBaseUrl = environment.img_baseurl;
  cardForm: any = { phone: [{}], email: [{}], socialmedia: [{}], tags:[{}] };
  imgURL: any;
  userid: any;
  contact_card:any=[];
  search_bar:any;
  showElement=true;

  constructor(private router: Router, private api: ApiService) {  }

  ngOnInit() {
    this.loader();
    this.userid=localStorage.getItem("userid")

    this.pageLoader = true;
    if(localStorage.getItem("customer_token")) 
    {
      this.api.CONTACTLIST().subscribe(result => {
        this.contact_card = result.data;
      });

      this.api.CARDLIST().subscribe(result => {
        if(result.status)
        {
          this.cardlist = result.data.sort((a, b) => 0 - (a._id > b._id ? 1 : -1));
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
    else 
    {
        this.router.navigate(["/login"]);
    }
     //search
     let searchBar: any = document.querySelector('.search-bar');
    //  if(this.menu_items.length){      
       document.querySelector('.js-search').addEventListener("click",function(e) {
         let searchInput: any = document.querySelector(".search-input");
         searchBar.classList.add('open');
        searchInput.focus(); searchInput.value="";
         document.querySelector('.js-search').classList.add('d-none');
       }, false);
       document.querySelector(".close-search").addEventListener("click",function(e) {
         searchBar.classList.remove('open');
         document.querySelector('.js-search').classList.remove('d-none');
       }, false);
     }

     onLogout() {
      localStorage.removeItem("customer_token");
      sessionStorage.clear();
      this.ngOnInit();
    }

    loader(){
      this.showElement = true;
      setTimeout(() => {
        this.showElement = false;
      }, 500);
  }


    fileChangeListener(event) {
      if(event.target.files && event.target.files[0]) { 
        console.log(event.target.files[0].name);
        this.cardForm.logoname = event.target.files[0].name;
        let reader = new FileReader();
        reader.onload = (event: ProgressEvent) => {
          this.cardForm.image = (<FileReader>event.target).result;
          this.cardForm.img_change = true;
          this.imgURL = reader.result; 
        }
        reader.readAsDataURL(event.target.files[0]);
      }
    }

    upload() 
  {
      this.cardForm.submit = true;    
      this.cardForm.user_id = localStorage.getItem("userid");
      this.cardForm.useremail = localStorage.getItem("useremail");

      this.api.UPLOAD_LOGO(this.cardForm).subscribe(result => {
        console.log(result)
      
      });
  }




  }

  


