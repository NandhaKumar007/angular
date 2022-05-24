import { Directive } from '@angular/core';

@Directive({
  selector: '[appDeferTheme]'
})

export class DeferThemeDirective {

  constructor() { }

  public ngAfterViewInit () {
    if(document.getElementById("theme_min")) document.getElementById("theme_min").remove();
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "theme_min";
    document.getElementsByTagName("body")[0].appendChild(script);
    script.src = 'assets/js/theme.min.js';
  }

}