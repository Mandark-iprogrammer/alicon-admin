import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MeetingService } from '../meeting.service';
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivityService } from '../../activity/activity.service';
import { CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent } from "ng-auto-complete";
import { environment } from '../../../../environments/environment';
import {NgbTimeStruct,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter"
import { NgbDateNativeAdapter } from "./ngb-d-datepicker-dapter"
var FCM = require('fcm-push');

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
  providers: [MeetingService, ActivityService,{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter},
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
  
})

export class MeetingComponent implements OnInit {
  time: NgbTimeStruct = {hour: 13, minute: 30, second: 0};

  source: any;

  defaultSettingsMeetings = {
    columns: {
      name: {
        title: 'Meeting Name'
      },
      remark: {
        title: 'Remark'
      },
      venue: {
        title: 'Venue'
      },
      meetingDate: {
        title: 'Meeting Date'
      },
      startTime: {
        title: 'Meeting Start Time'
      },
      isPublished: {
        title: 'Published'
      }
    },
    mode: 'inline', // inline|external|click-to-edit
    selectMode: 'single', // single|multi
    hideHeader: false,

    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: true,
      delete: false,
      custom: [],
      position: 'right', // left|right
    },
    filter: {
      inputClass: 'fa fa-search',
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
      perPage: 10,
    },
    rowClassFunction: () => ""
  };


  defaultSettingsActivity = {
    columns: {
      section: {
        title: 'Activity Section',
        filter: false
      },
      presentationPlace: {
        title: 'Presentation Place',
        filter: false
      },
      indianStaff: {
        title: 'Indian Staff',
        filter: false
      },
      startTime: {
        title: 'Start Time',
        filter: false
      },
      endTime: {
        title: 'End Time',
        filter: false
      },
      type: {
        title: 'Activity Type',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [{ value: 'Presentation', title: 'PRESENTATION' }, { value: 'q&a', title: 'Q&A' }, {
              value: 'Travel', title: 'TRAVEL'
            }, { value: 'BreakTime', title: 'BREAK-TIME' }, { value: 'Break Time with Team', title: 'BREAK TIME WITH TEAM' }]
          }
        },
        filter: false
      }

    },
    mode: 'inline', // inline|external|click-to-edit
    selectMode: 'single', // single|multi
    hideHeader: false,

    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: true,
      edit: true,
      delete: true,
      custom: [],
      position: 'right', // left|right
    },
    filter: {
      inputClass: 'fa fa-search ',


    },
    edit: {
      inputClass: '',
      editButtonContent: '<i class="fa fa-fw fa-edit"></i>',
      saveButtonContent: 'Update',
      cancelButtonContent: 'Cancel',
      confirmSave: true,
    },
    add: {
      inputClass: '',
      addButtonContent: '<i class="fa fa-fw fa-plus"></i>',
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
      perPage: 10,
    },
    rowClassFunction: () => ""
  };


  defaultSettingsUsers = {
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
      }
    },
    mode: 'inline', // inline|external|click-to-edit
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

  public show: boolean = false;
  public show1: boolean = false;
  public show2: boolean = true;

  APP_ID: string
  MASTER_KEY: string
  SERVER_URL: string
  docs: any
  docs1: any
  docs2: any
  nm: string
  message;
  SERVER_URL1: any;
  venues: any;
  unique: any;
  pub:string = "Publish"
  
 //public mtDate1:Date
  sav:string = "Save"
  published:boolean = false
  tag: any;
  mtDate1:any;
  public dt:Date
  desc: string; remk: string; time1:any;createby: string; objID: string; ven: string; stTime: string; stDate: Date; mtDate: Date
  closeResult: string;
  meetingID: string;
  constructor(
    private http: HttpClient,
    private meeting: MeetingService,
    private toastr: ToastrService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private activity: ActivityService
  ) {

  
   // console.log(date)

    this.APP_ID = environment.APP_ID;
    this.MASTER_KEY =  environment.MASTER_KEY;
    this.SERVER_URL = environment.apiUrl+'/functions/user_tags'
    this.http.post(this.SERVER_URL, '', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': this.APP_ID,
        'X-Parse-REST-API-Key': this.MASTER_KEY,
      })
    }).subscribe(data => {
      this.docs = JSON.parse(data['result'])
      this.unique = this.docs.data
    })


    this.SERVER_URL1 = environment.apiUrl+'/functions/meeting_venues'
    this.http.post(this.SERVER_URL1, '', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': this.APP_ID,
        'X-Parse-REST-API-Key': this.MASTER_KEY,
      })
    }).subscribe(data1 => {
      this.docs1 = JSON.parse(data1['result'])
      this.venues = this.docs1.data
    })

    this.SERVER_URL = environment.apiUrl+'/users?where={"isAdmin":false}'
    this.http.get(this.SERVER_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': this.APP_ID,
        'X-Parse-REST-API-Key': this.MASTER_KEY,
        'X-Parse-Revocable-Session': '1'
      })
    }).subscribe(data => {
      console.log(data)
      this.docs = data['results']

    })


    this.activatedRoute.params.subscribe((params: Params) => {
      let userId = params['objectId'];
      let view = params['view'];
      console.log(userId);
      if (view == null) {
        this.show2 = true;
      }
      else {
        this.show2 = !this.show2
      }

      if (userId != null) {
        this.SERVER_URL = environment.apiUrl+'/classes/activity?where={"meetingId":{"__type":"Pointer","className":"meeting","objectId":"' + userId + '"}}'
        this.http.get(this.SERVER_URL, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Parse-Application-Id': this.APP_ID,
            'X-Parse-REST-API-Key': this.MASTER_KEY,
            'X-Parse-Revocable-Session': '1'
          })
        }).subscribe(data1 => {
          console.log(data1)
          this.docs2 = data1['results']
          this.show1 = !this.show1;
        });

        this.SERVER_URL = environment.apiUrl+'/classes/meeting/' + userId;

        return this.http.get(this.SERVER_URL, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Parse-Application-Id': this.APP_ID,
            'X-Parse-REST-API-Key': this.MASTER_KEY,
          })
        }).subscribe(data => {
           
          console.log(data)
          this.source = data
          this.docs1 = data

          this.show = !this.show;
          this.sav="Update"
          this.mtDate1 =this.dataformat1(data['meetingDate']['iso'])
          data['meetingDate'] = this.dataformat(data['meetingDate']['iso'])

          this.nm = data['name']
          this.desc = data['description']
          this.remk = data['remark']
          //this.createby=data['createdBy']['objectId']
          this.objID = data['objectId']
          this.ven = data['venue']
          this.stTime = data['startTime']
          this.time1=this.convertTime12to24(data['startTime'])
          this.stDate = data['startDate']
          this.mtDate = data['meetingDate']
          
        // this.dt = new Date("'"+this.mtDate+"'");
          this.dt = new Date(this.mtDate1.toString());
          console.log(this.dt)
      
          this.tag = data['tags']
          if(data['isPublished']==false){
            this.published=false;
            
            this.pub="UnPublish"
          }
          else{
            this.published=true;
           
            this.pub="Published"
          }
          
         
        })
      }
    });
    
   



}




convertTime12to24(time12h) {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  return { "hour":hours,"minute":minutes}
  //return hours + ':' + minutes;
}

  ngOnInit() {
  }
  registerMeeting(frm: any) {
   console.log(frm)
   if(frm.isPublished==""){
     frm.isPublished=false;
   }
    if (frm.objectId == null) {
      console.log(frm)
      this.meeting.saveData(frm).subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/meeting', { 'objectId': res['objectId'], 'view': 'view' }]);
        },
        err => {
          console.log(err)
          this.toastr.success(err, 'Meeting Register');
        },
        () => {
          console.log("record saved")
         
          this.toastr.success('New Record Added Successfully', 'Meeting Register');
        })
    } else {
      console.log(frm.objectId);
      this.meeting.saveData(frm).subscribe(
        res => {
          console.log(res),
          this.router.navigate(['/meeting', { 'objectId': frm.objectId, 'view': 'view' }]); 
        },
        err => console.log(err),
        () => {
          console.log("record updated")
          //this.meeting.showMeeting();
         
          this.toastr.success('New Record Updated Successfully', 'Meeting Register');

        }
      )
    }
  }

  publish(frm: any) {
    console.log(frm)
    if (frm.objectId == null) {
      console.log(frm)
      this.meeting.publishData(frm).subscribe(
        res => console.log(res),
        err => console.log(err),
        () => {
          console.log("record saved")
          //this.meeting.showMeeting();
          this.router.navigate(['/viewMeeting']);
          this.toastr.success('New Record Published Successfully', 'Meeting Register');
          var serverKey = 'AAAA-vhQn20:APA91bFRNikSzNXPGklpEB6SU12TWeihUrFFz60gBoGSQjnUHyncEjDHK07q1X_sJu3aLtsYfY4IQk52WwUMDLjVpp6lpoDXZfMJZW33dqaNkUkzXT_Yai26S-ktRHA9lhTpDn297Yi-';
          var fcm = new FCM(serverKey);
          var message = {
            registration_ids: ['emqR_8IaqyY:APA91bEOFP9T5pD2OPrVur4Fu7CSLM5Kbitek2IE8mFZ4o1AkJMuJ7Wl54OhvwbesnTpaXvH2R0_QaFds6s-yC1iAygBAuAGgJKYDRNJ4laONtDjyoqB29cJWWD6Q7Y3Qp6AK6eYvHVs', 'fDyP9x0uTBU:APA91bHxw7mBWf9uzEKIetyOhno6jcDBDTOmN8aLYfGibBSRUT7YIqCirKGLqXcnCXKSxYEIvEPvhn-9w4umaaiNnwzzcImOVa6RYy2U0Z9qmTWXnIKkwrleL-sL38FEd1R6AeQ6SPOA'], // required fill with device token or topics
            collapse_key: 'AIzaSyB01w4EI-nHaTiY3r3bmpO7zz170RbfbBA',
            data: {
              your_custom_data_key: 'AIzaSyDt24Juf1hToQ2ILBQxNQcglnPrI5VqIxI'
            },
            notification: {
              title: frm.name,
              body: frm.desc
            }
          };


          //callback style
          fcm.send(message, function (err, response) {
            if (err) {
              console.log("Something has gone wrong!");
            } else {
              console.log("Successfully sent with response: ", response);
            }
          });
        })


    } else {
      console.log(frm);
      this.meeting.publishData(frm).subscribe(
        res => console.log(res),
        err => console.log(err),
        () => {
          console.log("record updated")
          //this.meeting.showMeeting();
          this.router.navigate(['/viewMeeting']);
          this.toastr.success('Record Publised Successfully', 'Meeting Register');

        })
      var serverKey = 'AAAA-vhQn20:APA91bFRNikSzNXPGklpEB6SU12TWeihUrFFz60gBoGSQjnUHyncEjDHK07q1X_sJu3aLtsYfY4IQk52WwUMDLjVpp6lpoDXZfMJZW33dqaNkUkzXT_Yai26S-ktRHA9lhTpDn297Yi-';
      var fcm = new FCM(serverKey);
      var message = {
        registration_ids: ['emqR_8IaqyY:APA91bEOFP9T5pD2OPrVur4Fu7CSLM5Kbitek2IE8mFZ4o1AkJMuJ7Wl54OhvwbesnTpaXvH2R0_QaFds6s-yC1iAygBAuAGgJKYDRNJ4laONtDjyoqB29cJWWD6Q7Y3Qp6AK6eYvHVs', 'fDyP9x0uTBU:APA91bHxw7mBWf9uzEKIetyOhno6jcDBDTOmN8aLYfGibBSRUT7YIqCirKGLqXcnCXKSxYEIvEPvhn-9w4umaaiNnwzzcImOVa6RYy2U0Z9qmTWXnIKkwrleL-sL38FEd1R6AeQ6SPOA'], // required fill with device token or topics
        collapse_key: 'AIzaSyB01w4EI-nHaTiY3r3bmpO7zz170RbfbBA',
        data: {
          your_custom_data_key: 'AIzaSyDt24Juf1hToQ2ILBQxNQcglnPrI5VqIxI'
        },
        notification: {
          title: frm.name,
          body: frm.desc
        }
      };


      //callback style
      fcm.send(message, function (err, response) {
        if (err) {
          console.log("Something has gone wrong!");
        } else {
          console.log("Successfully sent with response: ", response);
        }
      });
    }

  }

  dataformat(date1: string) {
    let date = new Date(date1);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    // if (dt < 10) {
    //   dt = '0' + dt;
    // }
    // if (month < 10) {
    //   month = '0' + month;
    // }
    return dt + '/' + month + '/' + year;
  //  return new Date(dt month);
 //   return year+'-' + month + '-'+dt;
  }
  dataformat1(date1: string) {
    let date = new Date(date1);
   
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    // // if (dt < 10) {
    // //   dt = '0' + dt;
    // // }
    // // if (month < 10) {
    // //   month = '0' + month;
    // // }
    // return {"day":28 ,"month":5 ,"year":2018};
    //return new Date(dt + '/' + month + '/' + year);
   // console.log(dt + '/' + month + '/' + year)
    //return date;
   return year+'-' + month + '-'+dt;
  }

  Onedit(_id: string) {
    console.log(_id)
    //this.meeting.objectId=Object.assign({},_id);
    this.router.navigate(['/meeting', { 'objectId': _id }]);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addRecord(event) {
    //this.currentRow = event.data;
    if (window.confirm('Are you sure you want to save?')) {
      
     
      this.activatedRoute.params.subscribe((params: Params) => {
        this.meetingID = params['objectId'];
      });
      var data = {
        "section": event.newData.section,
        "presentationPlace": event.newData.presentationPlace,
        "indianStaff": event.newData.indianStaff,
        "startTime": event.newData.startTime,
        "endTime": event.newData.endTime,
        "type": event.newData.type,
        "meetingId": {
          "__type": "Pointer",
          "className": "meeting",
          "objectId": this.meetingID
        }
      };
      console.log(data)
      this.activity.saveData(data).subscribe(
        res => {
          console.log(res)
        },
        err => console.log(err),
        () => {
          this.docs2 = event.newData;
          console.log("record saved")
          this.router.navigate(['/meeting', { 'objectId': this.meetingID, 'view': 'view' }]);
          this.toastr.success('New Record Added Successfully', 'Activity Register');
        })
        event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
   // this.source = event.newData;
   // event.confirmCreate(event.newData)
   

  }

  updateRecord(event) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.meetingID = params['objectId'];
    });
    var data = {
      "section": event.newData.section,
      "presentationPlace": event.newData.presentationPlace,
      "indianStaff": event.newData.indianStaff,
      "startTime": event.newData.startTime,
      "endTime": event.newData.endTime,
      "type": event.newData.type,
      "meetingId": {
        "__type": "Pointer",
        "className": "meeting",
        "objectId": this.meetingID
      },
      objectId: event.newData.objectId,

    };
    console.log(data)
    this.source = data
    this.activity.saveData(data).subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/meeting', { 'objectId': this.meetingID, 'view': 'view' }]);
      },
      err => console.log(err),
      () => {
        console.log("record updated")
        //this.meeting.showMeeting();
        // this.router.navigate(['/meeting',{ 'objectId': this.meetingID,'view':'view'}]);
        this.toastr.success('New Record Updated Successfully', 'Activity Register');


      }
    )


  }


  push_noti(ti:string,bod:string ){
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   this.meetingID = params['objectId'];
    // });
    // console.log(ti)
    // console.log(bod)
   
    // this.APP_ID = "129837njlasdjfpoia2p83u4jnlkj"
    // this.MASTER_KEY = "Elkl1j23l809uljn3lkj48unkjnkjh4234"
    // this.SERVER_URL = 'http://13.126.191.252:1337/parse/users'
    // this.http.get(this.SERVER_URL,{
    //      headers:new HttpHeaders({
    //       'Content-Type':'application/json',
    //       'X-Parse-Application-Id':this.APP_ID,
    //       'X-Parse-REST-API-Key':this.MASTER_KEY,
    //       'X-Parse-Revocable-Session':'1'
    //   })
    //   }).subscribe(data => {
    //        console.log(data)       
    //       this.docs=data['results']
    //       console.log(this.docs)
    //       this.docs.forEach(element => {
    //           if(element.deviceToken){
    //           //console.log(element.deviceToken)
    //          // this.arr.push(element.deviceToken)
    //           var serverKey = 'AAAA-vhQn20:APA91bFRNikSzNXPGklpEB6SU12TWeihUrFFz60gBoGSQjnUHyncEjDHK07q1X_sJu3aLtsYfY4IQk52WwUMDLjVpp6lpoDXZfMJZW33dqaNkUkzXT_Yai26S-ktRHA9lhTpDn297Yi-';
    //           var fcm = new FCM(serverKey); 
    //          var message = {
    //            // registration_ids: ['emqR_8IaqyY:APA91bEOFP9T5pD2OPrVur4Fu7CSLM5Kbitek2IE8mFZ4o1AkJMuJ7Wl54OhvwbesnTpaXvH2R0_QaFds6s-yC1iAygBAuAGgJKYDRNJ4laONtDjyoqB29cJWWD6Q7Y3Qp6AK6eYvHVs','fDyP9x0uTBU:APA91bHxw7mBWf9uzEKIetyOhno6jcDBDTOmN8aLYfGibBSRUT7YIqCirKGLqXcnCXKSxYEIvEPvhn-9w4umaaiNnwzzcImOVa6RYy2U0Z9qmTWXnIKkwrleL-sL38FEd1R6AeQ6SPOA'], // required fill with device token or topics
    //           // registration_ids: ['db48-2il2eU:APA91bE_fXzj3MbG4o7sfBOwEenYXjMWmOypCi9iuOroZFcXrhzURvgsmC9jrdJWafQ076cTkieLzOV8u2uCBy_iocsTDX9It0CZWOWC6dR5eMuwHxnf7BKfM3FKKuyPCOu67la7qbm3'], // required fill with device token or topics 
    //            to:element.deviceToken,
    //            collapse_key: 'AIzaSyB01w4EI-nHaTiY3r3bmpO7zz170RbfbBA', 
    //             data: {
    //                 your_custom_data_key: 'AIzaSyDt24Juf1hToQ2ILBQxNQcglnPrI5VqIxI'
    //             },
    //             notification: {
    //                 title: ti,
    //                 body: bod
    //             }
    //           };
     
     
    //           //callback style
    //           fcm.send(message, function(err, response){
    //             if (err) {
    //                 console.log("Something has gone wrong!");
    //             } else {
    //                 console.log("Successfully sent with response: ", response);
    //             }
    //           });

    //           fcm.send(message)
    // .then(function(response){
    //     console.log("Successfully sent with response: ", response);
    // })
    // .catch(function(err){
    //     console.log("Something has gone wrong!");
    //     console.error(err);
    // })

    //           }
    //       });
    //  })

    //    // console.log(this.arr)
    //      // this.toastr.success('New Record Published Successfully','Meeting Register');
           
    //      this.toastr.success('Notification Send Successfully','Alicon Push Notification');
    //      this.router.navigate(['/meeting', { 'objectId': this.meetingID, 'view': 'view' }]);
    }

    cancel(){
      this.router.navigate(['/viewMeeting']);
    }


    onChange(event){
      console.log(event)
      this.activatedRoute.params.subscribe((params: Params) => {
        this.meetingID = params['objectId'];
      });

      let arr={
       "isPublished":event,
      }
      console.log(arr)
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
          console.log("record updated")
          //this.meeting.showMeeting();
          this.router.navigate(['/meeting', { 'objectId': this.meetingID, 'view': 'view' }]);
          if(event==true){
          this.toastr.success('Record Published Successfully', 'Meeting Register');
          }
          else{
            this.toastr.success('Record Unpublished..! ', 'Meeting Register');
          }
  
        }
      )


    }


}
