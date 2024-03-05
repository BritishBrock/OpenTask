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
    let ctx = this.c.getContext("2d");
    ctx!.fillStyle = "white";
    ctx?.fillRect(0, 0, 500, 500)
    this.c.addEventListener("mousedown",()=>{
      this.isDrawing = true;
    })
    window.addEventListener("mouseup",()=>{
      this.isDrawing = false;
    })

    this.c.addEventListener("mousemove",(event:any)=>{
     if(!this.isDrawing)return;
     if(!ctx)return;
     if(!this.c)return;
      ctx.beginPath();
      ctx?.arc((event.x-this.c.offsetLeft -550 ), (this.c.offsetTop -event.y +50) *-1,2,0,2 * Math.PI)
      ctx.fillStyle = "black";
      ctx?.fill();
    })
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
