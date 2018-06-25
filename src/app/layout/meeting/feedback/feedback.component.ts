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
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
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
  constructor( private http: HttpClient,
    private toastr: ToastrService,
    public router: Router,
    private activatedRoute: ActivatedRoute) { 
      this.APP_ID = environment.APP_ID;
      this.MASTER_KEY =  environment.MASTER_KEY;
      //http://192.168.151.156:1337/parse/classes/rsvp?where={"meetingId":{"__type":"Pointer","className":"meeting","objectId":"URQLQIbQd3"},"status":2}
  
      this.activatedRoute.params.subscribe((params: Params) => {
        this.meetingID = params['objectId'];
      });
      this.users2.length=0;
      this.users1.length=0;
          //Meeting Comments
    this.SERVER_URL = environment.apiUrl+'/classes/comments?where={"meetingId":{"__type":"Pointer","className":"meeting","objectId":"'+this.meetingID+'"},"isActivityFeedback":false}';
    this.http.get(this.SERVER_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': this.APP_ID,
        'X-Parse-REST-API-Key': this.MASTER_KEY,
        'X-Parse-Revocable-Session': '1'
      })
    }).subscribe(data => {
     //   console.log(data);
        this.docs=data['results']
        //console.log(this.docs);

        if(this.docs.length==0){
          this.notFound="No Comments For Meeting."
        }
        else{ 
          this.docs.forEach(element => {
          //this.users1['reason']=element.reason
          //console.log(element)
          this.SERVER_URL = environment.apiUrl+'/users/' + element.userId['objectId'];
          this.http.get(this.SERVER_URL, {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'X-Parse-Application-Id': this.APP_ID,
              'X-Parse-REST-API-Key': this.MASTER_KEY,
              'X-Parse-Revocable-Session': '1'
            })
          }).subscribe(data => {
            data['description']=element.description
            data['rating']=element.rating
            data['name']=element.username
           // console.log(data)
            
           this.users1.push(data)
           
           // console.log(this.users1)
          })
      });
    }
    })

    //Comments for Activity
    this.SERVER_URL = environment.apiUrl+'/classes/comments?where={"meetingId":{"__type":"Pointer","className":"meeting","objectId":"'+this.meetingID+'"},"isActivityFeedback":true}';
    this.http.get(this.SERVER_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': this.APP_ID,
        'X-Parse-REST-API-Key': this.MASTER_KEY,
        'X-Parse-Revocable-Session': '1'
      })
    }).subscribe(data => {
        //console.log(data);
        this.docs=data['results']
        //console.log(this.docs);

        if(this.docs.length==0){
          this.notFound1="No Comments For Activity."
        }
        else{ 
          this.docs.forEach(element => {
          //this.users1['reason']=element.reason
          //console.log(element)
          
          let orderby={
            "order":"sequenceNumber"
          } 
          //?where={"objectbwId":"uExJvpoE"}&order=sequenceNumber
          this.SERVER_URL = environment.apiUrl+'/classes/activity/' + element.activityId['objectId'];
       //  this.SERVER_URL = environment.apiUrl+'/classes/activity?where={"objectId":"'+element.activityId['objectId']+'"}';
          this.http.get(this.SERVER_URL, {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'X-Parse-Application-Id': this.APP_ID,
              'X-Parse-REST-API-Key': this.MASTER_KEY,
              'X-Parse-Revocable-Session': '1'
            })
          }).subscribe(data1 => {
            //console.log(data1)
            this.docs1=data1
          this.SERVER_URL = environment.apiUrl+'/users/' + element.userId['objectId'];
          this.http.get(this.SERVER_URL, {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'X-Parse-Application-Id': this.APP_ID,
              'X-Parse-REST-API-Key': this.MASTER_KEY,
              'X-Parse-Revocable-Session': '1'
            })
          }).subscribe(data => {
            data['description']=element.description
            data['rating']=element.rating
            data['name']=element.username
            data['sequenceNumber']= parseInt(data1['sequenceNumber'])
            data['section']= data1['section']
             this.users2.push(data)
            //console.log(this.users2.sort)
          })
        })
      });
    }
    })
 }
  ngOnInit() {
  }
}
