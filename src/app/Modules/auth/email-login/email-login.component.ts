import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
declare var $: any;

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {
  loginForm: any = {}; forgotForm: any = {};
  showElement=true;
  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(): void 
  {
    this.loader();
    // if(localStorage.getItem("customer_token")) this.router.navigate(["/home"]);
  }

  loader(){
    this.showElement = true;
    setTimeout(() => {
      this.showElement = false;
    }, 500);
}

  forgot_password()
  {
    this.forgotForm={};
    $('#forgotModal').modal("show");
  }

  onLogin() {
    this.loginForm.errorMsg = "";
    this.loginForm.submit = true;
    this.loginForm.cart_list = [];
    
    this.api.LOGIN(this.loginForm).subscribe(result => {
      this.loginForm.submit = false;
      console.log(result);
      if(result.status) 
      {
        localStorage.setItem("customer_token", result.token);
        localStorage.setItem("userid", result.customer_details._id);
        this.router.navigate(["/home"]);
      }
      else 
      {
        this.loginForm.errorMsg = result.message;
        console.log("response", result);
      }
    });
  }

  onForgot() {
    
    this.forgotForm.submit = true;
    console.log(this.forgotForm);
    this.api.FORGOT_REQUEST(this.forgotForm).subscribe((result) => {
      console.log(result);
      this.forgotForm.submit = false;
      this.forgotForm.req_status = result.status;
      this.forgotForm.alert_msg = result.message;
      if(!result.status) console.log("response", result);
    });

  }

}
