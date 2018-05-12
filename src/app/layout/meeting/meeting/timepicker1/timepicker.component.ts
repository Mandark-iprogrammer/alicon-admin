import { Component, ViewChild, ElementRef, AfterViewInit,Input } from '@angular/core';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';
@Component({
  template:'<ngb-timepicker [name]="cell.getId()"  (change)="onChange($event)" (ngModelChange)="fromStructure($event)" (keyup)="updateValue()" [size]="small" [(ngModel)]="time1" name="startTime" [spinners]="true" #startTime [meridian]="true" required [ngModelOptions]="{standalone: false}" ></ngb-timepicker>'
})
export class TimepickerComponent extends DefaultEditor implements AfterViewInit {

  @ViewChild('startTime') stTime: ElementRef;
  constructor() { 
    super();
  }
  datevalue: any;
  ngOnInit() {
    
  }
  ngAfterViewInit() {
   
  }

  fromStructure(event){
     this.cell.newValue =event;
  }
 
}
