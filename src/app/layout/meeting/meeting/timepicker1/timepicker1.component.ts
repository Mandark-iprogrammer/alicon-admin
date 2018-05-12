import { Component, ViewChild, ElementRef, AfterViewInit,Input } from '@angular/core';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';
@Component({
  template:'<ngb-timepicker [name]="cell.getId()"  (ngModelChange)="fromStructure($event)"  [size]="small" [(ngModel)]="time1" name="endTime" [spinners]="true" #startTime [meridian]="true" required [ngModelOptions]="{standalone: false}" ></ngb-timepicker>'
})
export class Timepicker1Component extends DefaultEditor implements AfterViewInit {

  ngAfterViewInit() {
   
  }
  @ViewChild('endTime') edTime: ElementRef;
  constructor() { 
    super();
  }

  ngOnInit() {
  }

  fromStructure(event){
    this.cell.newValue =event;
 }
}
