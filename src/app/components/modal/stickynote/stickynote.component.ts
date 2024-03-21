import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { StickyNote } from '../../../Models/stickyNote/stickyNote';

@Component({
  selector: 'app-stickynote',
  templateUrl: './stickynote.component.html',
  styleUrl: './stickynote.component.scss'
})
export class StickynoteComponent {
  @Input() stickyNote!:StickyNote;
  @ViewChild("canvas")canvas!:ElementRef;
  isDrawing:boolean = false;
  c?:HTMLCanvasElement

  ngAfterViewInit(){
    this.c = <HTMLCanvasElement>this.canvas.nativeElement;
    if(!this.c)return;
    let ctx = this.c.getContext("2d");
    ctx!.fillStyle = "white";
    ctx?.fillRect(0, 0, 500, 500)
    this.c.addEventListener("mousedown",()=>{
      this.isDrawing = true;
    })
    window.addEventListener("mouseup",()=>{
      this.isDrawing = false;
    })
    this.c.addEventListener("touchstart",()=>{
      this.isDrawing = true;
    })
    window.addEventListener("touchend",()=>{
      this.isDrawing = false;
    })

    this.c.addEventListener("mousemove",(event:any)=>{
  
    })
   
  }


  draw(event:any){

    this.c = <HTMLCanvasElement>this.canvas.nativeElement;
    if(!this.c)return;
    let ctx = this.c.getContext("2d");

    if(!this.isDrawing)return;
    if(!ctx)return;
    if(!this.c)return;
    console.log(event);
     ctx.beginPath();
     ctx?.arc(event.layerX,event.layerY,2,0,2 * Math.PI)
     ctx.fillStyle = "black";
     ctx?.fill();
  }
  drawPhone(event:any){
    this.c = <HTMLCanvasElement>this.canvas.nativeElement;
    if(!this.c)return;
    let ctx = this.c.getContext("2d");
    event.preventDefault();
    if(!this.isDrawing)return;
    if(!ctx)return;
    if(!this.c)return;
     ctx.beginPath();
     var touch = event.targetTouches[0];
     ctx?.arc((touch.pageX - this.c.getBoundingClientRect().x), (touch.pageY - this.c.getBoundingClientRect().y),2,0,2 * Math.PI)
     ctx.fillStyle = "black";
     ctx?.fill();
  }

  saveDrawing(){
     if(!this.c) return;
    this.stickyNote.image = this.c.toDataURL("image/jpeg");
    // const imgData = this.c.getContext("2d")!.getImageData(0, 0, 500, 500);
    // const pix = imgData.data;
    // const pixLen = pix.length;
    // for (let pixel = 0; pixel < pixLen; pixel += 4) {
    //   console.log(pix[pixel]);
    // }
  }
}
