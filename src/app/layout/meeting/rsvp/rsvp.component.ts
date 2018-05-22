import { Component, OnInit, Input ,OnChanges} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MeetingService } from '../meeting.service';
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivityService } from '../../activity/activity.service';
import { CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent } from "ng-auto-complete";

import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {
  APP_ID: string
  MASTER_KEY: string
  SERVER_URL: string
  docs: any
  docs1:any
  meetingID: string
  users1=[];
  users2=[];
  notFound:string
  notFound1:string
  username=[]
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.APP_ID = environment.APP_ID;
    this.MASTER_KEY =  environment.MASTER_KEY;
    //http://192.168.151.156:1337/parse/classes/rsvp?where={"meetingId":{"__type":"Pointer","className":"meeting","objectId":"URQLQIbQd3"},"status":2}

    this.activatedRoute.params.subscribe((params: Params) => {
      this.meetingID = params['objectId'];
    });

    //Not Attended Users
    this.SERVER_URL = environment.apiUrl+'/classes/rsvp?where={"meetingId":{"__type":"Pointer","className":"meeting","objectId":"'+this.meetingID+'"},"status":2}';
    this.http.get(this.SERVER_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': this.APP_ID,
        'X-Parse-REST-API-Key': this.MASTER_KEY,
        'X-Parse-Revocable-Session': '1'
      })
    }).subscribe(data => {
        console.log(data);
        this.docs=data['results']
        console.log(this.docs);

        if(this.docs.length==0){
          this.notFound="No Users in Not Attend Users."
        }
        else{ 
      data['results'].forEach(element => {
          //this.users1['reason']=element.reason
          console.log(element)
          this.SERVER_URL = environment.apiUrl+'/users/' + element.userId['objectId'];
          this.http.get(this.SERVER_URL, {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'X-Parse-Application-Id': this.APP_ID,
              'X-Parse-REST-API-Key': this.MASTER_KEY,
              'X-Parse-Revocable-Session': '1'
            })
          }).subscribe(data => {
            data['reason']=element.reason
            console.log(data)
            
           this.users1.push(data)
           
            console.log(this.users1)
          })
      });
    }
    })


    //Attended Users
    this.SERVER_URL = environment.apiUrl+'/classes/rsvp?where={"meetingId":{"__type":"Pointer","className":"meeting","objectId":"'+this.meetingID+'"},"status":1}';
    this.http.get(this.SERVER_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': this.APP_ID,
        'X-Parse-REST-API-Key': this.MASTER_KEY,
        'X-Parse-Revocable-Session': '1'
      })
    }).subscribe(data1 => {
        console.log(data1);
       

        this.docs1=data1['results']
        console.log(this.docs1);

        if(this.docs1.length==0){
          this.notFound1="No Users in Attend Users."
        }
        else{
      data1['results'].forEach(element => {
          
          console.log(element)
          this.SERVER_URL = environment.apiUrl+'/users/' + element.userId['objectId'];
          this.http.get(this.SERVER_URL, {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'X-Parse-Application-Id': this.APP_ID,
              'X-Parse-REST-API-Key': this.MASTER_KEY,
              'X-Parse-Revocable-Session': '1'
            })
          }).subscribe(data1 => {
            console.log(data1)
            
           this.users2.push(data1)
           
            console.log(this.users2)
          })
      });
    }
    })



   }

  ngOnInit() {
  }

  ngOnChanges(){

  }
}
