import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
declare let $: any;

@Component({
  selector: 'app-save-card',
  templateUrl: './save-card.component.html',
  styleUrls: ['./save-card.component.scss']
})
export class SaveCardComponent implements OnInit {

  keyboardRender: boolean = false;
  showElement=true;

  constructor(public commonService: CommonService) { 
    let _originalSize = $(window).width() + $(window).height()
    $(window).resize(() => {
      if($(window).width() + $(window).height() != _originalSize) {
        this.keyboardRender = true;
      }
      else {
        this.keyboardRender = false;
      }
    });
 
  }

  ngOnInit(): void {
    this.loader();
  }
  loader(){
    this.showElement = true;
    setTimeout(() => {
      this.showElement = false;
    }, 500);
}
}
