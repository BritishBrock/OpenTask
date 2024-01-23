import { Component, Input } from '@angular/core';
import { DragServiceService } from '../../Services/DragService/drag-service.service';

@Component({
  selector: 'app-action-component',
  templateUrl: './action-component.component.html',
  styleUrl: './action-component.component.scss'
})
export class ActionComponentComponent {
  @Input() nativeElement?:HTMLElement;

constructor(private DragService:DragServiceService){}

  ngOnInit(){
    console.log(this.nativeElement)
    if(this.nativeElement) {
     
      this.nativeElement.addEventListener("mousedown",(event:any)=>{
        
        if(!this.DragService.htmlElementSelected)
        this.DragService.selectHTMLElement(this.nativeElement!);

      })
      this.nativeElement.addEventListener("mouseup",(event:any)=>{
        if(this.DragService.htmlElementSelected)
        this.DragService.clearSelectedHTMLElement();
      })
    }
  }
}
