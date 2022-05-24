import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-email-verifiy',
  templateUrl: './email-verifiy.component.html',
  styleUrls: ['./email-verifiy.component.scss']
})
export class EmailVerifiyComponent implements OnInit {
  token: any;
  tokenn: any;
  id: any;
  value: any;
  val: any;
  truee=true;
  falsee=false;
  showElement=true;

  constructor(public rout:ActivatedRoute,public apiservice:ApiService) { }

  ngOnInit(): void {
    this.loader();
    this.id=this.rout.snapshot.params
    this.tokenn=this.id.token;
    console.log("toooooooooo",this.id)
    this.apiservice.EMAIL_VERIFY(this.id).subscribe((result)=>
      {
        console.log("email",result);
        if(result.status == true){
          this.truee=true;
        }else{
          this.falsee=true;
          this.truee=false;
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
