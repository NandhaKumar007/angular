import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMaxlength]'
})
export class MaxlengthDirective {

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])

  onKeyDown(event: KeyboardEvent) {
    let maxlength = this.el.nativeElement.maxlength;
    console.log("-------", maxlength)
  }

}
