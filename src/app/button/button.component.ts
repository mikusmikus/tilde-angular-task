import { Component, EventEmitter, Input, OnInit, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent  {
  @Input() disabled = false;
  @Input() small  = false;
  @Input() color  = "primary";
  @Output() onClick = new EventEmitter<string>()

  handleClick(): void {
    this.onClick.emit('')
  }
  

}
