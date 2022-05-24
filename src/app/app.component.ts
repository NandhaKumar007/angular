import { Component, HostListener } from '@angular/core';
import { CommonService } from './services/common.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Contact-App';

  reloadTheme() {
    if(document.getElementById("home_3")) document.getElementById("home_3").remove();
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "home_3";
    document.getElementsByTagName("body")[0].appendChild(script);
    script.src = 'assets/js/theme.min.js';
  }

  ngOnInit(): void 
  {
    // if(localStorage.getItem("customer_token")) this.router.navigate(["/home"]);
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  getWindowDetails() {
    this.commonService.scroll_x_pos = window.pageXOffset;
    this.commonService.scroll_y_pos = window.pageYOffset;
    this.commonService.screen_height = window.innerHeight;
    this.commonService.screen_width = window.innerWidth;
  }
  constructor(private commonService: CommonService, private router: Router) {
    this.getWindowDetails();
  }

}
