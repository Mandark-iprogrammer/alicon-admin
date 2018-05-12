import { Component, ViewChild, ElementRef, AfterViewInit,Input } from '@angular/core';

import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';

@Component({
  template: `
    Type: <select name="type" #type [name]="cell.getId()"  (change)="onChange($event)" [ngClass]="inputClass" class="from-control">
    <option value='' hidden>Select</option>
    <option value="presentation">PRESENTATION</option>
    <option value="q&a">Q&A</option>
    <option value="travel">TRAVEL</option>
    <option value="teamBreak">Break</option>
    
    </select><br>
    Subtype:<select name="subtype" #subtype [name]="cell.getId()" (change)="updateValue($event)" [ngClass]="inputClass" class="from-control">
    <option value='' hidden>Select</option>
    <option value="Presentation">PRESENTATION</option>
    <option value="q&a">Q&A</option>
    <option value="car">CAR</option>
    <option value="walk">WALK</option>
    <option value="auto">RICKSHAW</option>
    <option value="tea">TEA</option>
    <option value="lunch">LUNCH</option>
    </select>
    
  `,
})
export class CustomEditorComponent extends DefaultEditor {

  @ViewChild('tyoe') type: ElementRef;
  @ViewChild('subtype') subtype: ElementRef;
  @ViewChild('htmlValue') htmlValue: ElementRef;
 

  constructor() {
    super();
    
  }

 
  onChange(event){
    console.log(event.target.value)
    this.subtype = event.target.value;
    // if(event.target.value==="presentation"){
    //     this.type.nativeElement.innerHTML("Presentation")
    // }
    
  }

  updateValue(event) {
    console.log(event.target.value);
    this.type = event.target.value;
    this.cell.newValue = this.subtype+'-'+this.type;
  }
  
  //  getUrlName(): string {
  //    return this.type.nativeElement.innerText;
  // }

  //  getUrlHref(): string {
  //    return this.subtype.nativeElement.innerText;
  //  }
}
// type: <input [ngClass]="inputClass"
//             #type
//             class="form-control short-input"
//             [name]="cell.getId()"
//             [disabled]="!cell.isEditable()"
//             [placeholder]="cell.getTitle()"
//             (click)="onClick.emit($event)"
           
//             (keydown.enter)="onEdited.emit($event)"
//             (keydown.esc)="onStopEditing.emit()"><br>

// SubType: <input [ngClass]="inputClass"
//             #subtype
//             class="form-control short-input"
//             [name]="cell.getId()"
//             [disabled]="!cell.isEditable()"
//             [placeholder]="cell.getTitle()"
//             (click)="onClick.emit($event)"
            
//             (keydown.enter)="onEdited.emit($event)"
//             (keydown.esc)="onStopEditing.emit()">
//     <div [hidden]="true" [innerHTML]="cell.getValue()" #htmlValue></div>