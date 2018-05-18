import { Component, OnInit, Input,OnChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MeetingService } from '../meeting.service';
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityService } from '../../activity/activity.service';
import { CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent } from "ng-auto-complete";
import { environment } from '../../../../environments/environment';
import {NgbTimeStruct,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter"
import { NgbDateNativeAdapter } from "./ngb-d-datepicker-dapter"
import { TableOneValidatorService } from './tableonevalidatorservice';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { Cell, DefaultEditor, Editor} from 'ng2-smart-table';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { CustomEditorComponent } from './custom-editor/custom-editor.component';
import { Timepicker1Component } from './timepicker1/timepicker1.component';

var FCM = require('fcm-push');

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
  providers: [MeetingService, ActivityService,{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter},
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter},NgbModal,NgbActiveModal],
  
})

export class MeetingComponent implements OnInit {
  time: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
  activityStaff:any
  pplace:any
  source: any;
  act=[];
  pp=[];
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
  public show2: boolean = false;

  APP_ID: string
  MASTER_KEY: string
  SERVER_URL: string
  docs: any
  docs1: any
  docs2: any
  docs3:any
  docs4:any
  nm: string
  nm1:string
  message;
  SERVER_URL1: any;
  venues: any;
  unique: any;
  minDate:any;
  pub:string = "Publish"
  defaultSettingsActivity:any
 //public mtDate1:Date
  sav:string = "Save"
  published:boolean = false
  publish1 :boolean=false
  tag: any;
  mtDate1:any;
  order:number;
  notFound:string
  public dt:Date
  desc: string;desc1:string;ven1:string ;remk: string;remk1:string; time1:any;createby: string; objID: string; ven: string; stTime: string; stDate: Date; mtDate: Date
  closeResult: string;
  meetingID: string;
  modalReference: NgbModalRef;
  constructor(
    private http: HttpClient,
    private meeting: MeetingService,
    private toastr: ToastrService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private activity: ActivityService
  ) {

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    this.minDate = {"year": year,"month": month,"day": dt};
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    } 
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

    //aunto complete activity staff

  // this.SERVER_URL1 = environment.apiUrl+'/functions/activity_staff'
  // this.http.post(this.SERVER_URL1, '', {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'X-Parse-Application-Id': this.APP_ID,
  //     'X-Parse-REST-API-Key': this.MASTER_KEY,
  //   })
  // }).subscribe(data4 => {
  //   this.docs4 = JSON.parse(data4['result'])
  // //  console.log(this.docs4)
  //   this.activityStaff = this.docs4.data
  //  // console.log(JSON.stringify(this.activityStaff))
  //  // console.log(this.activityStaff)
  //   this.activityStaff.forEach(element => {
  //       this.act.push({"indianStaff":element})
  //   });
    
  //   console.log(this.act)
  // })

  //Presentation Place
  // this.SERVER_URL1 = environment.apiUrl+'/functions/activity_presentation_places'
  // this.http.post(this.SERVER_URL1, '', {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'X-Parse-Application-Id': this.APP_ID,
  //     'X-Parse-REST-API-Key': this.MASTER_KEY,
  //   })
  // }).subscribe(data3 => {
  //   this.docs3 =  JSON.parse(data3['result'])
  // //  console.log(this.docs3.data)
  //  this.pplace=this.docs3.data
  // // console.log(this.pplace)
  //  this.pplace.forEach(element1 => {
  //   this.pp.push({"presentationPlace":element1})
  //     });

  // })

    
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

  console.log(this.docs3)
  console.log(this.act)
   //this.pplace=["Atlas Board Room", "Finance Presentation", "New Conference Hall", "Assembly Hall", "demo", "Presentation Place", "asdasda", "asdasd", "Presentation", ""]
   //this.activityStaff=["Mr.R.K. Mehra", "Mr. Vimal Gupta & Team", "Mr. Shyamanandan Yadav & Tea", "Mr. Kirad", "Mr. Kirad1", "Mr.R.K.Mehra", "Mehra R.K..", "M.K. Mehra", "demo", "Mr.Mandar Kirad", "asdasd", "Mr.MB Kirad", "Mr.R.K.Mishra", "Mr.Kirad", ""]
  this.defaultSettingsActivity = {
    columns: {
      sequenceNumber: {
        title: 'Sr No.',
        required:'required',
        filter: false
      },
      section: {
        title: 'Activity Section',
        required:'required',
        filter: false
      },
      presentationPlace: {
        title: 'Presentation Place',
        // editor: {
        //   type: 'completer',
        //   config: {
        //     completer: {
        //       data: this.pp,
        //       searchFields: 'presentationPlace',
        //       titleField: 'presentationPlace'          
        //     },
        //   },
        // },
        filter: false
      },
      indianStaff: {
        title: 'Indian Staff',
        // editor: {
        //   type: 'completer',
        //   config: {
        //     completer: {
        //       data: this.act,
        //       searchFields: 'indianStaff',
        //       titleField: 'indianStaff'        
        //     },
        //   },
        // },
        filter: false
      },
      startTime1: {
        title: 'Start Time',
        editor: {
          type: 'custom',
          component: Timepicker1Component,
        },
       // editable:false,
        filter: false
      },
      endTime1: {
        title: 'End Time',
        editor: {
          type: 'custom',
          component: TimepickerComponent,
        },
        // editable:false,
        filter: false
      },
      type: {
        title: 'Activity Type-Subtype',
        type: 'html',
        editor: {
          type: 'custom',
          component: CustomEditorComponent,
        },
        filter:false
        },
      
      
      // type: {
      //   title: 'Activity Type',
      //   type: 'html',
      //   editor: {
      //     type: 'list',
      //     config: {
      //       selectText: '...Select Type...',
      //       list: [{ value: 'Presentation', title: 'PRESENTATION' }, { value: 'q&a', title: 'Q&A' }, {
      //         value: 'Travel', title: 'TRAVEL'
      //       }, { value: 'BreakTime', title: 'BREAK-TIME' }, { value: 'Break Time with Team', title: 'BREAK TIME WITH TEAM' }]
      //     }
      //   },
      //   filter: false
      // },
      // subtype: {
      //   title: 'Activity Sub Type',
      //   type: 'html',
      //   editor: {
      //     type: 'list',
      //     config: {
      //       selectText: '...Select Type...',
      //       list: [{ value: 'Presentation', title: 'PRESENTATION' }, { value: 'q&a', title: 'Q&A' }, {
      //         value: 'Travel', title: 'TRAVEL'
      //       }, { value: 'BreakTime', title: 'BREAK-TIME' }, { value: 'Break Time with Team', title: 'BREAK TIME WITH TEAM' }]
      //     }
      //   },
      //   filter: false
      // }
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
      inputClass: '<i class="fa fa-fw fa-edit"></i> ',


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
      addButtonContent: 'Add',
      createButtonContent: '<button class="btn btn rounded-btn btn-block">Create</button>',
      cancelButtonContent: '<button class="btn btn rounded-btn btn-block">Cancel</button>',
      confirmCreate: true,
    },
    delete: {
      deleteButtonContent: '<i color="red" class="fa fa-fw fa-trash"></i>',
      confirmDelete: true,
    },
    cancel:{
      cancelButtonContent: '<i color="red" class="fa fa-fw fa-trash"></i>',
      confirmCancel: true,
    },
    attr: {
      id: '',
      class: 'table table-striped table-bordered',
    },
    noDataMessage: 'No Record to show',

    pager: {
      display: true,
      perPage: 10,
    },
    rowClassFunction: () => ""
  };


  this.ngOnChanges();
 
 
}

ngOnChanges(){
  this.activatedRoute.params.subscribe((params: Params) => {
    console.log(params)
    let userId = params['objectId'];
    let view = params['view'];
    console.log(userId);
    console.log(view)
    if (view === "view") {
      console.log("in view")
      this.show2 = this.show2
      this.show1 = true;
      this.show = true;
     
    }
    else {
      
      this.show2 = true;
      this.show1 = this.show1;
      this.show = this.show;
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

       
        
        this.sav="Update"
        this.mtDate1 =this.dataformat1(data['meetingDate']['iso'])
        data['meetingDate'] = this.dataformat(data['meetingDate']['iso'])

        this.nm = data['name']
        this.nm1=data['name']
        this.desc = data['description']
        this.desc1=data['description']
        this.remk = data['remark']
        this.remk1=data['remark']
        //this.createby=data['createdBy']['objectId']
        this.objID = data['objectId']
        this.ven = data['venue']
        this.ven1 = data['venue']
        this.stTime = data['startTime']
        this.time1=this.convertTime12to24(data['startTime'])
        this.stDate = data['startDate']
        this.mtDate = data['meetingDate']
        
      // this.dt = new Date("'"+this.mtDate+"'");
        this.dt = new Date(this.mtDate1.toString());
        console.log(this.dt)
    
        this.tag = data['tags']
        console.log(data['isPublished'])
        if(data['isPublished']==false){
          this.published=false;
          // this.onChange1(this.published)
          this.pub="UnPublish"
        }
        else{

          this.published=true;
          // this.onChange1(this.published)
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
          this.toastr.success('New Record Added Successfully');
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
          this.ngOnChanges();
          this.toastr.success('Record Updated Successfully');
          this.modalReference.close();
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

  Onedit(_id: string,content) {
    console.log(_id)
   
    //this.meeting.objectId=Object.assign({},_id);
    //this.router.navigate(['/viewMeeting', { 'objectId': _id }]);
    this.modalReference =this.modalService.open(content, { size: 'lg' ,centered: true});
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    //   this.ord=null;
    // this.sec="";
    //  this.objID2="";
    //  this.pplace="";
    //  this.staffname="";
    //  this.sttTime="";
    //  this.edTime="";
    //  this.time1="";
    //  this.time2="";
    // this.dur=""
    // this.msg=""
    // this.typ=""
    // this.subtyp="" 
      
    }, (reason) => {
      this.closeResult = `Dismissed`;
      // this.ord=null;
      // this.sec="";
      //  this.objID2="";
      //  this.pplace="";
      //  this.staffname="";
      //  this.sttTime="";
      //  this.edTime="";
      //  this.time1="";
      //  this.time2="";
      // this.dur=""
      // this.msg=""
      // this.typ=""
      // this.subtyp="" 
      
    })
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

  // addRecord(event) {

  //   this.activatedRoute.params.subscribe((params: Params) => {
  //     this.meetingID = params['objectId'];
  //   });
  //   this.SERVER_URL = environment.apiUrl+'/classes/activity?where={"meetingId":{"__type":"Pointer","className":"meeting","objectId":"' + this.meetingID + '"}}'
  //       this.http.get(this.SERVER_URL, {
  //         headers: new HttpHeaders({
  //           'Content-Type': 'application/json',
  //           'X-Parse-Application-Id': this.APP_ID,
  //           'X-Parse-REST-API-Key': this.MASTER_KEY,
  //           'X-Parse-Revocable-Session': '1'
  //         })
  //       }).subscribe(data1 => {
  //         console.log(data1)
  //         this.docs2 = data1['results']
  //         //this.order=data1['results']['order'];
          
  //         //console.log(this.order)
  //       });


  //   console.log(event)
  //   //this.currentRow = event.data;
  //   if(event.newData.seqNumbner==""){
  //     this.toastr.error('Sequence Number is required');
  //     return false;
  //   }
  //   if(event.newData.section==""){
  //     this.toastr.error('Activity Section is required');
  //     return false;
  //   }
  //   if(event.newData.presentationPlace==""){
  //      this.toastr.error('Activity preesentation is required');
  //      return false;
  //   }
  //    if( event.newData.indianStaff==""){
  //     this.toastr.error('Activity Indian Staff is required');
  //     return false;
  //   }
  //   if(event.newData.startTime==""){
  //     this.toastr.error('Activity Start Time is required');
  //     return false;
  //   }
  //   if(event.newData.endTime==""){
  //     this.toastr.error('Activity End Time is required');
  //     return false;
  //   }
  //   if(event.newData.type==""){
  //     this.toastr.error('Activity Type is required');
  //     return false;
  //   }

  //   const [time, modifier] = event.newData.startTime.split(' ');
  // let [hours, minute] = time.split(':');
  // if (modifier === 'pm') {
  //   if(hours==="12"){
  //     hours="12"
  //     hours=parseInt(hours)
  //   }
  //   else{
  //     hours = parseInt(hours, 10) + 12;
  //   }
  // }
  // //return { "hour":hours,"minute":minutes}
  //   let startMinutes = ((parseInt(hours) * 60) + parseInt(minute));
   
  //   console.log("startMinutes-->"+startMinutes);
  //   const [endtime, endmodifier] = event.newData.endTime.split(' ');
  //   let [endhours, endminute] = endtime.split(':');
  //   if (endmodifier === 'pm') {
  //     if(endhours==="12"){
  //       endhours="12"
  //       endhours=parseInt(hours)
  //     }
  //     else{
  //     endhours = parseInt(endhours, 10) + 12;
  //     }
  //   }
   
  //   let endMinutes = ((parseInt(endhours) * 60) + parseInt(endminute));

  //   console.log("endMinutes-->"+endMinutes);
  //   console.log("Duration-->"+(endMinutes-startMinutes))
  //   let duration=endMinutes-startMinutes;



  // //   var a=this.formatAMPM(event.newData.startTime.hour,event.newData.startTime.minute);
  // //   var b=this.formatAMPM(event.newData.endTime.hour,event.newData.endTime.minute);
  //  var abc=event.newData.type.split('-');
  //  console.log(abc[0]);
  //  console.log(abc[1]);
  
  //   if (window.confirm('Are you sure want to save?')) {
  //     console.log(event.newData)
  //     event.confirm.resolve(event.newData);
  //     this.activatedRoute.params.subscribe((params: Params) => {
  //       this.meetingID = params['objectId'];
  //     });
    
  //     var data = {
  //       "sequenceNumber":event.newData.sequenceNumber,
  //       "section": event.newData.section,
  //       "presentationPlace": event.newData.presentationPlace,
  //       "indianStaff": event.newData.indianStaff,
  //       "startTime": event.newData.startTime,
  //       "endTime": event.newData.endTime,
  //       "order":this.docs2.length+1,
  //       "type": abc[0],
  //       "duration":duration,
  //       "subType":abc[1],
  //       "meetingId": {
  //         "__type": "Pointer",
  //         "className": "meeting",
  //         "objectId": this.meetingID
  //       }
  //     };
   
  //     this.activity.saveData(data).subscribe(
  //       res => {
  //         console.log(res)
  //       },
  //       err => console.log(err),
  //       () => {
         
  //         console.log("record saved")
  //         //this.router.navigate(['/meeting', { 'objectId': this.meetingID, 'view': 'view' }]);
  //         this.toastr.success('New Record Added Successfully', 'Activity Register');
  //       })
  //       console.log(this.docs2)
        
  //  } 
  //  this.source = event.newData;
  // // event.confirmCreate(event.newData)
   

  // }

  // updateRecord(event) {
  //   if(event.newData.section==""){
  //     this.toastr.error('Activity Section is required');
  //     return false;
  //   }
  //   if(event.newData.presentationPlace==""){
  //      this.toastr.error('Activity preesentation is required');
  //      return false;
  //   }
  //    if( event.newData.indianStaff==""){
  //     this.toastr.error('Activity Indian Staff is required');
  //     return false;
  //   }
  //   if(event.newData.startTime==""){
  //     this.toastr.error('Activity Start Time is required');
  //     return false;
  //   }
  //   if(event.newData.endTime==""){
  //     this.toastr.error('Activity End Time is required');
  //     return false;
  //   }
  //   if(event.newData.type==""){
  //     this.toastr.error('Activity Type is required');
  //     return false;
  //   }

  //   if (window.confirm('Are you sure want to Update?')) {
  //     console.log(event.newData)
  //     event.confirm.resolve(event.newData);

  //   this.activatedRoute.params.subscribe((params: Params) => {
  //     this.meetingID = params['objectId'];
  //   });

  //   const [time, modifier] = event.newData.startTime.split(' ');
  //   let [hours, minute] = time.split(':');
  //   if (modifier === 'pm') {
  //     if(hours==="12"){
  //       hours="12"
  //       hours=parseInt(hours)
  //     }
  //     else{
  //       hours = parseInt(hours, 10) + 12;
  //     }
  //   }
  //   //return { "hour":hours,"minute":minutes}
  //     let startMinutes = ((parseInt(hours) * 60) + parseInt(minute));
     
  //     console.log("startMinutes-->"+startMinutes);
  //     const [endtime, endmodifier] = event.newData.endTime.split(' ');
  //     let [endhours, endminute] = endtime.split(':');
  //     if (endmodifier === 'pm') {
  //       if(endhours==="12"){
  //         endhours="12"
  //         endhours=parseInt(hours)
  //       }
  //       else{
  //       endhours = parseInt(endhours, 10) + 12;
  //       }
  //     }
     
  //     let endMinutes = ((parseInt(endhours) * 60) + parseInt(endminute));
  
  //     console.log("endMinutes-->"+endMinutes);
  //     console.log("Duration-->"+(endMinutes-startMinutes))
  //     let duration=endMinutes-startMinutes;



  //   // var a=this.formatAMPM(event.newData.startTime.hour,event.newData.startTime.minute);
  //   // var b=this.formatAMPM(event.newData.endTime.hour,event.newData.endTime.minute);
  //   var data = {
  //     "sequenceNumber":event.newData.seqNumbner,
  //     "section": event.newData.section,
  //     "presentationPlace": event.newData.presentationPlace,
  //     "indianStaff": event.newData.indianStaff,
  //     "startTime": event.newData.startTime,
  //     "endTime": event.newData.endTime,
  //     "duration":duration,
  //     "type": event.newData.type,
  //     "meetingId": {
  //       "__type": "Pointer",
  //       "className": "meeting",
  //       "objectId": this.meetingID
  //     },
  //     objectId: event.newData.objectId,

  //   };
  //   console.log(data)
  //   this.source = data
  //   this.activity.saveData(data).subscribe(
  //     res => {
  //       console.log(res)
  //       this.router.navigate(['/meeting', { 'objectId': this.meetingID, 'view': 'view' }]);
  //     },
  //     err => console.log(err),
  //     () => {
  //       console.log("record updated")
  //       //this.meeting.showMeeting();
  //       // this.router.navigate(['/meeting',{ 'objectId': this.meetingID,'view':'view'}]);
  //       this.toastr.success('New Record Updated Successfully', 'Activity Register');


  //     }
  //   )

  // }
  // this.source = event.newData;
  // }



  // deleteRecord(event) {
  //   if (window.confirm('Are you sure want to Delete?')) {
  //     console.log(event.newData)
  //     event.confirm.resolve(event.newData);

  //   this.activatedRoute.params.subscribe((params: Params) => {
  //     this.meetingID = params['objectId'];
  //   });
  //   console.log(event)
  //   var data = {
  //     objectId: event.data.objectId,

  //   };
  //   console.log(data)
  //   this.activity.deleteData(data).subscribe(
  //     res => {
  //       console.log(res)
  //       this.router.navigate(['/meeting', { 'objectId': this.meetingID, 'view': 'view' }]);
  //     },
  //     err => console.log(err),
  //     () => {
  //       console.log("record deleted")
  //       this.toastr.success('Record deleted Successfully', 'Activity Register');
  //     })
  //   }
  // }



  push_noti(frm1:any ){
    this.activatedRoute.params.subscribe((params: Params) => {
      this.meetingID = params['objectId'];
    });
   
   

     this.SERVER_URL = environment.apiUrl+'/classes/meeting/' + this.meetingID;
     this.http.get(this.SERVER_URL, {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'X-Parse-Application-Id': this.APP_ID,
         'X-Parse-REST-API-Key': this.MASTER_KEY,
         'X-Parse-Revocable-Session': '1'
       })
     }).subscribe(data => {
         console.log(data['meetingUsers']);
          data['meetingUsers'].forEach(element => {
           console.log(element)
           this.SERVER_URL = environment.apiUrl+'/users/' + element;
           this.http.get(this.SERVER_URL, {
             headers: new HttpHeaders({
               'Content-Type': 'application/json',
               'X-Parse-Application-Id': this.APP_ID,
               'X-Parse-REST-API-Key': this.MASTER_KEY,
               'X-Parse-Revocable-Session': '1'
             })
           }).subscribe(data => {
              console.log(data)
             if(data['deviceToken']){
              console.log(data['deviceToken'])

              var serverKey = 'AAAA-vhQn20:APA91bFRNikSzNXPGklpEB6SU12TWeihUrFFz60gBoGSQjnUHyncEjDHK07q1X_sJu3aLtsYfY4IQk52WwUMDLjVpp6lpoDXZfMJZW33dqaNkUkzXT_Yai26S-ktRHA9lhTpDn297Yi-';
              var fcm = new FCM(serverKey); 
             var message = {
               // registration_ids: ['emqR_8IaqyY:APA91bEOFP9T5pD2OPrVur4Fu7CSLM5Kbitek2IE8mFZ4o1AkJMuJ7Wl54OhvwbesnTpaXvH2R0_QaFds6s-yC1iAygBAuAGgJKYDRNJ4laONtDjyoqB29cJWWD6Q7Y3Qp6AK6eYvHVs','fDyP9x0uTBU:APA91bHxw7mBWf9uzEKIetyOhno6jcDBDTOmN8aLYfGibBSRUT7YIqCirKGLqXcnCXKSxYEIvEPvhn-9w4umaaiNnwzzcImOVa6RYy2U0Z9qmTWXnIKkwrleL-sL38FEd1R6AeQ6SPOA'], // required fill with device token or topics
              // registration_ids: ['db48-2il2eU:APA91bE_fXzj3MbG4o7sfBOwEenYXjMWmOypCi9iuOroZFcXrhzURvgsmC9jrdJWafQ076cTkieLzOV8u2uCBy_iocsTDX9It0CZWOWC6dR5eMuwHxnf7BKfM3FKKuyPCOu67la7qbm3'], // required fill with device token or topics 
               to:data['deviceToken'],
               collapse_key: 'AIzaSyB01w4EI-nHaTiY3r3bmpO7zz170RbfbBA', 
                data: {
                    your_custom_data_key: 'AIzaSyDt24Juf1hToQ2ILBQxNQcglnPrI5VqIxI'
                },
                notification: {
                    title: frm1.title,
                    body: frm1.body
                }
              };

              fcm.send(message, function(err, response){
                if (err) {
                    console.log("Something has gone wrong!");
                    this.toastr.success("Notification Not Send Successfully");
                } else {
                    console.log("Successfully sent with response: ", response);
                    this.toastr.success("Notification Send Succssfully");
                }
              });

                //  fcm.send(message)
                // .then(function(response){
                //     console.log("Successfully sent with response: ", response);
                // })
                // .catch(function(err){
                //     console.log("Something has gone wrong!");
                //     console.error(err);
                // })

             }
            // this.users1.push(data)
             
            //  console.log(this.users1)
           })
       });
     }
    )




  
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
            this.pub="Published"
          this.toastr.success('Record Published Successfully');
          }
          else{
            this.pub="UnPublished"
            this.toastr.success('Record UnPublished..! ');
            
          }
          //location.reload();
        }
      )


    }

    onChange1(event){
      
      if(event==true){
        this.pub="Published"
        this.publish1=true;
      }
      else{
        this.pub="UnPublished"
        this.publish1=false;
      }
    }


    formatAMPM(hour,minute) {
      var hours = hour;
      var minutes = minute;
      console.log(minutes);
  
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes=minutes%10;
     
      if(minutes=="00"){
        minutes="00"  
      }
      else {
        minutes = minutes < 10 ? '0'+minutes : minutes;
      }
    
      hours = hours < 10 ? '0'+hours : hours;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }



    onEdit(event){
      console.log(event)
    }

}
