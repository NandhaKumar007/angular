import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {
  pageLoader: boolean; userStatus: boolean;

  showElement=true;

  constructor(
  private router: Router, private socialAuthService: SocialAuthService, private api: ApiService) { }

  ngOnInit() 
  {
    this.loader();
    this.userStatus = false;
    if(localStorage.getItem("customer_token")) {
      this.userStatus = true;
    }
    this.pageLoader = true;
    setTimeout(() => { this.pageLoader = false; }, 500);
  }


  loader(){
    this.showElement = true;
    setTimeout(() => {
      this.showElement = false;
    }, 500);
}

  socialSignIn(socialPlatform: string) {
    let socialPlatformProvider: any;
        if (socialPlatform == "facebook") {

            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        }
        else if (socialPlatform == "google") {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }
    
      this.socialAuthService.signIn(socialPlatformProvider).then((userData: any) => {
      console.log('userdata',userData);
      let form_data: any = { name: userData.name, email: userData.email, provider:userData.provider };
      console.log(form_data);
      form_data.cart_list = [];
      this.api.SOCIAL_LOGIN(form_data).subscribe(result => {
        console.log('result',result);
        if(result.status) 
        {
          localStorage.setItem("customer_token", result.token);
          localStorage.setItem("userid", result.customer_details._id);
          localStorage.setItem("useremail", result.customer_details.email);
          this.router.navigate(["/home"]);
        }
        else console.log("response", result);
      });
      
    }).catch((err) => console.log('login eror ------------------------',err));
  }

}
