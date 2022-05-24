import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

scroll_x_pos: number; 
scroll_y_pos: number;
screen_width: number; 
screen_height: number;

  constructor() { }
}
