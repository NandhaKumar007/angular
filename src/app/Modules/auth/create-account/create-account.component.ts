import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  registerForm: any = {};
  showElement=true;

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.loader();
  }

  onRegister() {
    this.registerForm.submit = true;
    console.log('regform',this.registerForm);
   
    this.api.REGISTER(this.registerForm).subscribe(result => {
      this.registerForm.submit = false;
      console.log(result);
      if(result.status) 
      {
        // localStorage.setItem("customer_token", result.token);
        // localStorage.setItem("userid", result.data._id);
        this.router.navigate(["/login"]);
      }
      else 
      {
        this.registerForm.errorMsg = result.message;
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

}
