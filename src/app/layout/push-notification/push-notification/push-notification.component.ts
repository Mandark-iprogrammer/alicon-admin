import { Component, OnInit, Input} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { Router,Params,ActivatedRoute } from '@angular/router';


import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent} from "ng-auto-complete";
var FCM = require('fcm-push');


@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss']
})
export class PushNotificationComponent implements OnInit {
  APP_ID :string
  MASTER_KEY :string
  SERVER_URL : string
  docs:any
  arr=[];
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public router: Router,
    private activatedRoute: ActivatedRoute,

  ) { 
    this.arr.length=0;

  }

  ngOnInit() {
  }

  publish(ti:string,bod:string ){

    console.log(ti)
    console.log(bod)
   
    this.APP_ID = "129837njlasdjfpoia2p83u4jnlkj"
    this.MASTER_KEY = "Elkl1j23l809uljn3lkj48unkjnkjh4234"
    this.SERVER_URL = 'http://13.126.191.252:1337/parse/users'
    this.http.get(this.SERVER_URL,{
         headers:new HttpHeaders({
          'Content-Type':'application/json',
          'X-Parse-Application-Id':this.APP_ID,
          'X-Parse-REST-API-Key':this.MASTER_KEY,
          'X-Parse-Revocable-Session':'1'
      })
      }).subscribe(data => {
           console.log(data)       
          this.docs=data['results']
          console.log(this.docs)
          this.docs.forEach(element => {
              if(element.deviceToken){
              //console.log(element.deviceToken)
             // this.arr.push(element.deviceToken)
              var serverKey = 'AAAA-vhQn20:APA91bFRNikSzNXPGklpEB6SU12TWeihUrFFz60gBoGSQjnUHyncEjDHK07q1X_sJu3aLtsYfY4IQk52WwUMDLjVpp6lpoDXZfMJZW33dqaNkUkzXT_Yai26S-ktRHA9lhTpDn297Yi-';
              var fcm = new FCM(serverKey); 
             var message = {
               // registration_ids: ['emqR_8IaqyY:APA91bEOFP9T5pD2OPrVur4Fu7CSLM5Kbitek2IE8mFZ4o1AkJMuJ7Wl54OhvwbesnTpaXvH2R0_QaFds6s-yC1iAygBAuAGgJKYDRNJ4laONtDjyoqB29cJWWD6Q7Y3Qp6AK6eYvHVs','fDyP9x0uTBU:APA91bHxw7mBWf9uzEKIetyOhno6jcDBDTOmN8aLYfGibBSRUT7YIqCirKGLqXcnCXKSxYEIvEPvhn-9w4umaaiNnwzzcImOVa6RYy2U0Z9qmTWXnIKkwrleL-sL38FEd1R6AeQ6SPOA'], // required fill with device token or topics
              // registration_ids: ['db48-2il2eU:APA91bE_fXzj3MbG4o7sfBOwEenYXjMWmOypCi9iuOroZFcXrhzURvgsmC9jrdJWafQ076cTkieLzOV8u2uCBy_iocsTDX9It0CZWOWC6dR5eMuwHxnf7BKfM3FKKuyPCOu67la7qbm3'], // required fill with device token or topics 
               to:element.deviceToken,
               collapse_key: 'AIzaSyB01w4EI-nHaTiY3r3bmpO7zz170RbfbBA', 
                data: {
                    your_custom_data_key: 'AIzaSyDt24Juf1hToQ2ILBQxNQcglnPrI5VqIxI'
                },
                notification: {
                    title: ti,
                    body: bod
                }
              };
     
     
              //callback style
              fcm.send(message, function(err, response){
                if (err) {
                    console.log("Something has gone wrong!");
                } else {
                    console.log("Successfully sent with response: ", response);
                }
              });

              fcm.send(message)
    .then(function(response){
        console.log("Successfully sent with response: ", response);
    })
    .catch(function(err){
        console.log("Something has gone wrong!");
        console.error(err);
    })

              }
          });
     })

       // console.log(this.arr)
         // this.toastr.success('New Record Published Successfully','Meeting Register');
           
       
       
 
    }
 
}
