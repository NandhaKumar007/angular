import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-pwd-recovery',
  templateUrl: './pwd-recovery.component.html',
  styleUrls: ['./pwd-recovery.component.scss']
})
export class PwdRecoveryComponent implements OnInit {
  pwdForm: any = {};
  recoveryStatus: boolean = true;
  responseData: string;
  params: any = {};
  showElement=true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private activeRoute: ActivatedRoute, private router: Router, private api: ApiService   
  ) { }

  ngOnInit(): void {
    this.loader();
    this.activeRoute.params.subscribe((params: Params) => {
      this.params = params;
      console.log(this.params);
      if(this.params.token && this.params.token!='') {
        console.log(this.params);
        this.api.VALIDATE_FORGOT_REQUEST({ temp_token: this.params.token }).subscribe(result => {
          console.log(result);
          this.recoveryStatus = result.status;
          this.responseData = result.message;
          if(!result.status) console.log("response", result);
        });
      }
      else {
        this.recoveryStatus = false;
        this.responseData = "Invalid Recovery Link";
      }
    });
  }

  loader(){
    this.showElement = true;
    setTimeout(() => {
      this.showElement = false;
    }, 500);
}
  onPwdUpdate() {
    this.pwdForm.submit = true;
    this.api.UPDATE_PWD({ temp_token: this.params.token, new_pwd: this.pwdForm.password }).subscribe(result => {
      this.pwdForm.submit = false;
      console.log(result);
      this.recoveryStatus = result.status;
      this.responseData = result.message;
      if(result.status && isPlatformBrowser(this.platformId)) {
        localStorage.removeItem("customer_token");
        this.router.navigate(['/login']);
      }
      else console.log("response", result);
    });
  }

}
