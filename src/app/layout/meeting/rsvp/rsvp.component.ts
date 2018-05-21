import { Component, OnInit, Input ,OnChanges} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MeetingService } from '../meeting.service';
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivityService } from '../../activity/activity.service';
import { CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent } from "ng-auto-complete";
import { count } from 'rxjs/operator/count';
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
  meetingID: string

  notFound:string
  username=[]
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    //http://192.168.151.156:1337/parse/classes/rsvp?where={"meetingId":{"__type":"Pointer","className":"meeting","objectId":"URQLQIbQd3"},"status":2}

    this.activatedRoute.params.subscribe((params: Params) => {
      this.meetingID = params['objectId'];
    });

    this.SERVER_URL = environment.apiUrl+'/classes/rsvp';//where={"meetingId":{"__type":"Pointer","className":"meeting","objectId":"'+this.meetingID+'"},"status":2}';
    this.http.get(this.SERVER_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': this.APP_ID,
        'X-Parse-REST-API-Key': this.MASTER_KEY,
        'X-Parse-Revocable-Session': '1'
      })
    }).subscribe(data => {
        console.log(data);
    //     if(data['meetingUsers']==null){
    //       this.notFound="No person has been Attended yet."
    //     }
    //     else{ 
    //   data['meetingUsers'].forEach(element => {
    //       console.log(element)
    //       this.SERVER_URL = environment.apiUrl+'/users/' + element;
    //       this.http.get(this.SERVER_URL, {
    //         headers: new HttpHeaders({
    //           'Content-Type': 'application/json',
    //           'X-Parse-Application-Id': this.APP_ID,
    //           'X-Parse-REST-API-Key': this.MASTER_KEY,
    //           'X-Parse-Revocable-Session': '1'
    //         })
    //       }).subscribe(data => {
    //         //console.log(data)
            
    //        this.users1.push(data)
           
    //         console.log(this.users1)
    //       })
    //   });
    // }
    })

   }

  ngOnInit() {
  }

}
