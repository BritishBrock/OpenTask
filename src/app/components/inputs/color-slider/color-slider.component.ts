
import { Component, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-color-slider',
  templateUrl: './color-slider.component.html',
  styleUrl: './color-slider.component.scss'
})



export class ColorSliderComponent {
/*
 --hue-wildcard: 180;
    --saturation-wildcard: 50%;
    --lightness-wildcard: 50%;

*/
constructor(private elRef:ElementRef){}
hueValue:any = 180;
saturationValue:any = 50;
lightnessValue:any = 50;
html!:HTMLElement;
@Output() colorEmiter:EventEmitter<any> = new EventEmitter();
ngOnInit(){
  this.html = this.elRef.nativeElement;

  if(!this.html)return;

  



   let hueSlider:any = document.getElementById("slider-hue");
  hueSlider!.oninput = ()=> {
    console.log(hueSlider)
    this.hueValue = hueSlider!.value;
    this.html.style.setProperty('--hue-wildcard', hueSlider!.value);
    this.updateTaskColor();
  }

  let saturationSlider:any = document.getElementById("slider-saturation");
  saturationSlider.oninput = ()=> {
    this.saturationValue = saturationSlider.value;
    this.html.style.setProperty('--saturation-wildcard', saturationSlider.value + '%');
    this.updateTaskColor();
  }

  let lightnessSlider:any = document.getElementById("slider-lightness");
  lightnessSlider.oninput = () =>{
   this.lightnessValue= lightnessSlider.value;
    this.html.style.setProperty('--lightness-wildcard', lightnessSlider.value + '%');
    this.updateTaskColor();
  }

}
updateTaskColor(){
  this.colorEmiter.emit(this.hslToHex(this.hueValue,this.saturationValue,this.lightnessValue))
}
 hslToHex(h:any, s:any, l:any) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n:any) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

}
