import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.scss'
})
export class TasklistComponent {

  constructor(private elRef:ElementRef) {
    
  }
  ngOnInit(){
    this.elRef.nativeElement.addEventListener("click",()=>{
        this.elRef.nativeElement.style.left="200px";
    })

    
  }
}
