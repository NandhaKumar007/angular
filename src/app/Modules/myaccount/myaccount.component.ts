import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from '../../services/common.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})

export class MyaccountComponent implements OnInit {
count:any;
accountdetails:any;
length:any;
  myprofile: any={};
  public files: any[]; imgURL: any;
  myprofile_data: any;
  pro_image: any;
  my_userid: any;
  my_data: any;
  imgBaseUrl = environment.img_baseurl;
  myprofile_img = false;
  no_myprofile = true;
  showElement=true;

  constructor(public commonService: CommonService,public api:ApiService, public activaterout:ActivatedRoute,public router:Router) { }

  ngOnInit(): void {
    this.loader();
    this.accountdetails=this.activaterout.snapshot.params;
    this.my_userid=this.accountdetails.id
    console.log("params",this.accountdetails.id)

    // this.mydata();

    this.api.CARDLIST().subscribe((result :any)=>{
      this.length=result.data.length;
      console.log("length",result)
      this.my_data= result.user_data.profile_image;
        this.pro_image = this.imgBaseUrl + result.user_data.profile_image;
      console.log("pro img",this.my_data)
      if(this.my_data){
        this.myprofile_img = true;
        this.no_myprofile = false;
      }else{
        this.myprofile_img = false;
        this.no_myprofile = true;
      }
    })

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
      this.myprofile.logoname= event.target.files[0].name;
      let reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.myprofile.image= (<FileReader>event.target).result;
        this.myprofile.img_change= true;
        this.imgURL = reader.result; 
        console.log("image",this.myprofile.logoname)
        this.add_pro();
      }
      reader.readAsDataURL(event.target.files[0]);
      
    }
  }
add_pro(){
  this.api.ADD_PROFILE(this.myprofile).subscribe(result =>{
    console.log("profile",result)
    this.myprofile_data=result.data.profile_image;
    console.log("profile",this.myprofile_data)
    if(result.status == true){
      location.reload();
    }
  })
}
// mydata(){
//   this.api.MY_VALUE().subscribe(data =>{
//       console.log("my data" ,data)
//     })
// }

}
