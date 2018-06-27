import { Component, OnInit, Input ,OnChanges, EventEmitter, Output} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MeetingService } from '../meeting.service';
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivityService } from '../../activity/activity.service';
import { CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent } from "ng-auto-complete";
import { count } from 'rxjs/operator/count';
import { environment } from '../../../../environments/environment';

var FCM = require('fcm-push');
@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss'],
  providers:[MeetingService]
})
export class InvitationsComponent implements OnInit {
  @Input() incomingData: boolean;
  @Output() outgoingData = new EventEmitter<string>();
  hidden:boolean =true
  @Input()
  invited_user: boolean = true;

  @Output()
  change: EventEmitter<boolean> = new EventEmitter<boolean>();
  APP_ID: string
  MASTER_KEY: string
  SERVER_URL: string
  docs: any
  meetingID: string
  meetingName:string
  meetingDate:string
  nCnt: number = 0;
  users1=[]
  gridSelected: any;
  unique1 = []
  send =[]
  username=[]
  defaultSettings = {
    columns: {
     
      firstName: {
        title: 'First Name'
      },
      lastName: {
        title: 'Last Name'
      },
      username: {
        title: 'User Email'
      },
      desigNation: {
        title: 'Designation'
      },
      phonenumber: {
        title: 'Phone Number'
      },
      location: {
        title: 'Location'
      },
      tags:{
        title:'Department'
      }
    },
    mode: 'external', // inline|external|click-to-edit
    selectMode: 'multi', // single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [],
      position: 'right', // left|right
    },
    filter: {
      inputClass: '',
    },
    edit: {
      inputClass: '',
      editButtonContent: 'Edit',
      saveButtonContent: 'Update',
      cancelButtonContent: 'Cancel',
      confirmSave: true,
    },
    add: {
      inputClass: '',
      addButtonContent: 'Add New',
      createButtonContent: 'Create',
      cancelButtonContent: 'Cancel',
      confirmCreate: true,
    },
    delete: {
      deleteButtonContent: 'Delete',
      confirmDelete: false,
    },
    attr: {
      id: '',
      class: 'table table-striped table-bordered',
    },
    noDataMessage: 'No data found',
    
    pager: {
      display: true,
      perPage: 15,
    },
    rowClassFunction: () => ""
  };


  notFound:string
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private meeting : MeetingService
  ) {
   
    this.APP_ID = environment.APP_ID;
    this.MASTER_KEY =  environment.MASTER_KEY;
    this.SERVER_URL = environment.apiUrl+'/users?where={"isAdmin":false}'

    this.http.get(this.SERVER_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': this.APP_ID,
        'X-Parse-REST-API-Key': this.MASTER_KEY,
        'X-Parse-Revocable-Session': '1'
      })
    }).subscribe(data => {
      this.docs = data['results']
      
    })


    this.ngOnChanges();
   
  }


  ngOnInit() {
   
  }
  ngOnChanges(){
    this.users1.length=0; 
    this.activatedRoute.params.subscribe((params: Params) => {
      
      this.meetingID = params['objectId'];
    });
   // this.router.navigate(['/meeting',this.meetingID]);


    this.SERVER_URL = environment.apiUrl+'/classes/meeting/' + this.meetingID;
    this.http.get(this.SERVER_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': this.APP_ID,
        'X-Parse-REST-API-Key': this.MASTER_KEY,
        'X-Parse-Revocable-Session': '1'
      })
    }).subscribe(data => {
        //console.log(data['meetingUsers']);
        if(data['meetingUsers']==null){
          this.notFound="No person has been invited yet."
        }
        else{ 
      data['meetingUsers'].forEach(element => {
          //console.log(element)
          this.SERVER_URL = environment.apiUrl+'/users/' + element;
          this.http.get(this.SERVER_URL, {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'X-Parse-Application-Id': this.APP_ID,
              'X-Parse-REST-API-Key': this.MASTER_KEY,
              'X-Parse-Revocable-Session': '1'
            })
          }).subscribe(data => {
         
           this.users1.push(data)
           
          })
      });
     }
    })
  }

   onUserRowSelect(event){
    this.hidden=false;
    if(event.isSelected===null){
      this.username.length=0;
      this.gridSelected = event.selected;
      if(event.selected.length==0){
      
        this.username.length=0;
      }
      for(var i=0;i<event.selected.length;i++){
        this.send.push(event.selected[i].objectId)
        this.username.push(event.selected[i].username)
      }
  
    }
    else if(event.isSelected===true){ 
      this.gridSelected = event.selected;      
       this.send.push(event.data.objectId)
       this.username.push(event.data.username)
    }
    else if(event.isSelected==false){
      var i = this.send.indexOf(event.data.objectId);
      if(i != -1) {
        this.send.splice(i, 1);
      }
      var k=this.username.indexOf(event.data.username);
      if(k != -1){
        this.username.splice(k, 1);
      }

    }
           
    }
    abc(){
      
      if( this.send.length==0){
        this.toastr.error('Select atleast one user');
        return false
      }
     
      this.activatedRoute.params.subscribe((params: Params) => {
        this.meetingID = params['objectId'];
      });
      //console.log(this.send)
     
      let arr = 
        {
          "meetingUsers": {"__op":"AddUnique", "objects": this.send
        }
      }

           this.SERVER_URL = environment.apiUrl+'/classes/meeting/' + this.meetingID;
           this.http.get(this.SERVER_URL, {
             headers: new HttpHeaders({
               'Content-Type': 'application/json',
               'X-Parse-Application-Id': this.APP_ID,
               'X-Parse-REST-API-Key': this.MASTER_KEY,
               'X-Parse-Revocable-Session': '1'
             })
           }).subscribe(data => {
            this.meetingName=data['name'];
            this.meetingDate=this.dataformat(data['meetingDate']['iso'])

      this.send.forEach(element => {
       // console.log(element)
        this.SERVER_URL = environment.apiUrl+'/users/' + element;
        this.http.get(this.SERVER_URL, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Parse-Application-Id': this.APP_ID,
            'X-Parse-REST-API-Key': this.MASTER_KEY,
            'X-Parse-Revocable-Session': '1'
          })
        }).subscribe(data => {
          // console.log(data)
          if(data['deviceToken']){
         //  console.log(data['deviceToken'])

           var serverKey = 'AAAA-vhQn20:APA91bFRNikSzNXPGklpEB6SU12TWeihUrFFz60gBoGSQjnUHyncEjDHK07q1X_sJu3aLtsYfY4IQk52WwUMDLjVpp6lpoDXZfMJZW33dqaNkUkzXT_Yai26S-ktRHA9lhTpDn297Yi-';
           var fcm = new FCM(serverKey); 
          var message = {
            // registration_ids: ['emqR_8IaqyY:APA91bEOFP9T5pD2OPrVur4Fu7CSLM5Kbitek2IE8mFZ4o1AkJMuJ7Wl54OhvwbesnTpaXvH2R0_QaFds6s-yC1iAygBAuAGgJKYDRNJ4laONtDjyoqB29cJWWD6Q7Y3Qp6AK6eYvHVs','fDyP9x0uTBU:APA91bHxw7mBWf9uzEKIetyOhno6jcDBDTOmN8aLYfGibBSRUT7YIqCirKGLqXcnCXKSxYEIvEPvhn-9w4umaaiNnwzzcImOVa6RYy2U0Z9qmTWXnIKkwrleL-sL38FEd1R6AeQ6SPOA'], // required fill with device token or topics
           // registration_ids: ['db48-2il2eU:APA91bE_fXzj3MbG4o7sfBOwEenYXjMWmOypCi9iuOroZFcXrhzURvgsmC9jrdJWafQ076cTkieLzOV8u2uCBy_iocsTDX9It0CZWOWC6dR5eMuwHxnf7BKfM3FKKuyPCOu67la7qbm3'], // required fill with device token or topics 
            to:data['deviceToken'],
            collapse_key: 'AIzaSyB01w4EI-nHaTiY3r3bmpO7zz170RbfbBA', 
             data: {
                 your_custom_data_key: 'AIzaSyDt24Juf1hToQ2ILBQxNQcglnPrI5VqIxI',
                 "meetingDate":this.meetingDate,
                 "ObjectId":this.meetingID,
                 "meetingText":"This meeting is published"
             },
             notification: {
                 title: this.meetingName,
                 body:"This meeting is published"
                                 
             }
           };

           fcm.send(message, function(err, response){
             if (err) {
                 console.log("Something has gone wrong!");
                 console.log(err)
                 
                 this.toastr.error("Notification Not Sent");
              //   this.mytemplateForm1.reset();
                // this.ngOnChanges();
             } else {
                 console.log("Successfully sent with response: ", response);
              }
           });
        }
      
        })
    });
  });
  this.hidden=true;
    this.SERVER_URL = environment.apiUrl+'/classes/meeting/' + this.meetingID
      return this.http.put(this.SERVER_URL, arr, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Parse-Application-Id': this.APP_ID,
          'X-Parse-REST-API-Key': this.MASTER_KEY,
        })
      }).subscribe(
        res => console.log(res),
        err => console.log(err),
        () => {
         // this.change.emit(this.invited_user);
          this.toastr.success('Invivation Sent Successsfully');
          this.ngOnChanges();
          this.send.length==0;
          
          this.username.length=0;
        })
        
     //   evt.stopPropagation();
    }

    fetchNews(event)
    { 
      if(event.activeId=="ngb-tab-4"){
        this.username.length=0;
      }
    
    }

    doubleClick(event){
      
      console.log(event)
    }


    dataformat(date1: string) {
      let date = new Date(date1);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let dt = date.getDate();
      return dt + '/' + month + '/' + year;
    }

    OnRemove(id:any){
      if (window.confirm('Are you sure want to Remove?')) {
      console.log(id)
      var abc=[];
      abc.push(id)
      this.activatedRoute.params.subscribe((params: Params) => {
        this.meetingID = params['objectId'];
      });
      let arr = 
      {
        "meetingUsers": {"__op":"Remove", "objects": abc }
      }

      this.SERVER_URL = environment.apiUrl+'/classes/meeting/' + this.meetingID
      return this.http.put(this.SERVER_URL, arr, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Parse-Application-Id': this.APP_ID,
          'X-Parse-REST-API-Key': this.MASTER_KEY,
        })
      }).subscribe(
        res => console.log(res),
        err => console.log(err),
        () => {
          this.toastr.success('Invitation Remove');
          this.ngOnChanges();
   })
  }
  }

}



// this.SERVER_URL = environment.apiUrl+'/classes/meeting/' + this.meetingID;
//      this.http.get(this.SERVER_URL, {
//        headers: new HttpHeaders({
//          'Content-Type': 'application/json',
//          'X-Parse-Application-Id': this.APP_ID,
//          'X-Parse-REST-API-Key': this.MASTER_KEY,
//          'X-Parse-Revocable-Session': '1'
//        })
//      }).subscribe(data => {
//          console.log(data['meetingUsers']);
//           data['meetingUsers'].forEach(element => {
//            console.log(element)
//            this.SERVER_URL = environment.apiUrl+'/users/' + element;
//            this.http.get(this.SERVER_URL, {
//              headers: new HttpHeaders({
//                'Content-Type': 'application/json',
//                'X-Parse-Application-Id': this.APP_ID,
//                'X-Parse-REST-API-Key': this.MASTER_KEY,
//                'X-Parse-Revocable-Session': '1'
//              })
//            }).subscribe(data => {
//               console.log(data)
//              if(data['deviceToken']){
//               console.log(data['deviceToken'])

//               var serverKey = 'AAAA-vhQn20:APA91bFRNikSzNXPGklpEB6SU12TWeihUrFFz60gBoGSQjnUHyncEjDHK07q1X_sJu3aLtsYfY4IQk52WwUMDLjVpp6lpoDXZfMJZW33dqaNkUkzXT_Yai26S-ktRHA9lhTpDn297Yi-';
//               var fcm = new FCM(serverKey); 
//              var message = {
//                // registration_ids: ['emqR_8IaqyY:APA91bEOFP9T5pD2OPrVur4Fu7CSLM5Kbitek2IE8mFZ4o1AkJMuJ7Wl54OhvwbesnTpaXvH2R0_QaFds6s-yC1iAygBAuAGgJKYDRNJ4laONtDjyoqB29cJWWD6Q7Y3Qp6AK6eYvHVs','fDyP9x0uTBU:APA91bHxw7mBWf9uzEKIetyOhno6jcDBDTOmN8aLYfGibBSRUT7YIqCirKGLqXcnCXKSxYEIvEPvhn-9w4umaaiNnwzzcImOVa6RYy2U0Z9qmTWXnIKkwrleL-sL38FEd1R6AeQ6SPOA'], // required fill with device token or topics
//               // registration_ids: ['db48-2il2eU:APA91bE_fXzj3MbG4o7sfBOwEenYXjMWmOypCi9iuOroZFcXrhzURvgsmC9jrdJWafQ076cTkieLzOV8u2uCBy_iocsTDX9It0CZWOWC6dR5eMuwHxnf7BKfM3FKKuyPCOu67la7qbm3'], // required fill with device token or topics 
//                to:data['deviceToken'],
//                collapse_key: 'AIzaSyB01w4EI-nHaTiY3r3bmpO7zz170RbfbBA', 
//                 data: {
//                     your_custom_data_key: 'AIzaSyDt24Juf1hToQ2ILBQxNQcglnPrI5VqIxI'
//                 },
//                 notification: {
//                     title: frm1.title,
//                     body: frm1.body
//                 }
//               };

//               fcm.send(message, function(err, response){
//                 if (err) {
//                     console.log("Something has gone wrong!");
//                     console.log(err)
//                     this.toastr.error("Notification Not Send Successfully");
//                     this.mytemplateForm1.reset();
//                     this.ngOnChanges();
//                 } else {
//                     console.log("Successfully sent with response: ", response);
                   
                   
//                 }
//               });

//                 //  fcm.send(message)
//                 // .then(function(response){
//                 //     console.log("Successfully sent with response: ", response);
//                 // })
//                 // .catch(function(err){
//                 //     console.log("Something has gone wrong!");
//                 //     console.error(err);
//                 // })

//              }
//             // this.users1.push(data)
//              //  console.log(this.users1)
//            })
//        });
//        this.toastr.success('Notification Sent Succssfully');
//      }
     
//     )


