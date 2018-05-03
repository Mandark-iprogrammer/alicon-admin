import { Component, OnInit, Input} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MeetingService } from '../meeting.service';
import { ToastrService } from 'ngx-toastr';
import { Router,Params,ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


var FCM = require('fcm-push');

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
  providers:[MeetingService]
})

export class MeetingComponent implements OnInit {
  
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
      perPage: 10,
    },
    rowClassFunction: () => ""
  };


  defaultSettingsActivity = {
    columns: {
      section: {
        title: 'Activity Section'
      },
      presentationPlace: {
        title: 'Presentation Place'
      },
      indianStaff: {
        title: 'Indian Staff'
      },
      startTime: {
        title: 'Start Time'
      },
      endTime: {
        title: 'End Time'
      },
      type:{
        title:'Activity Type',
        type: 'html',
        editor: {
          type: 'list',
          config: {
          list: [{ value: 'Presentation', title: 'Presentation' }, { value: 'q&a', title: 'q&a' }, {
            value: 'Travel',title: 'Travel'},{  value: 'BreakTime',title: 'BreakTime'},{ value: 'Break Time with Team',title: 'Break Time with Team'}]
          }
        }
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

  public show:boolean = false;
  public show1:boolean = false;
  public show2:boolean = true;
  APP_ID :string
  MASTER_KEY :string
  SERVER_URL : string
  docs:any
  docs1:any
  docs2:any
  nm:string
  message;
  desc:string;remk:string;createby:string;objID:string;ven:string;stTime:string;stDate:Date;mtDate:Date
  closeResult: string;
 
  constructor(
    private http: HttpClient,
    private meeting: MeetingService,
    private toastr: ToastrService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
   
  ) { 
      this.APP_ID = "ObQCLvdrqRekAzP7LWcZYPmzMYIDEALOGRPAALICON"
      this.MASTER_KEY = "ErgFlrkodmUKTHVnRh0vJ8LzzVboP9VXUGmkALICON"
      this.SERVER_URL = 'http://192.168.151.156:1337/alicon/parse/users?where={"isAdmin":false}'
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
       
       })


       this.activatedRoute.params.subscribe((params: Params) => {
        let userId = params['objectId'];
        let view = params['view'];
          console.log(userId);
          if(view!=null){
            this.show2 = !this.show2;
          }
          
         if(userId!=null){
          this.SERVER_URL = 'http://192.168.151.156:1337/alicon/parse/classes/activity?where={"meetingId":{"__type":"Pointer","className":"meeting","objectId":"'+userId+'"}}'
          this.http.get(this.SERVER_URL,{
               headers:new HttpHeaders({
                'Content-Type':'application/json',
                'X-Parse-Application-Id':this.APP_ID,
                'X-Parse-REST-API-Key':this.MASTER_KEY,
                'X-Parse-Revocable-Session':'1'
            })
            }).subscribe(data1 => {
                console.log(data1)       
                this.docs2=data1['results']
                this.show1 = !this.show1;
            });
         
            this.SERVER_URL = 'http://192.168.151.156:1337/alicon/parse/classes/meeting/'+userId;
          
          return this.http.get(this.SERVER_URL,{
            headers:new HttpHeaders({
            'Content-Type':'application/json',
            'X-Parse-Application-Id':this.APP_ID,
            'X-Parse-REST-API-Key':this.MASTER_KEY,
           })
         }).subscribe(data => {
               //console.log(this.dataformat(data['startDate']['iso']))    
               console.log(data)
                this.source=data
               this.docs1=data  

               this.show = !this.show;
               //this.show2 = !this.show2;
               data['startDate']=this.dataformat(data['startDate']['iso'])
               data['meetingDate']=this.dataformat(data['meetingDate']['iso'])
                  
                this.nm=data['name']
                this.desc=data['description']
                this.remk=data['remark']
                //this.createby=data['createdBy']['objectId']
                this.objID=data['objectId']
                this.ven=data['venue']
                this.stTime=data['startTime']
                this.stDate=data['startDate']
                this.mtDate=data['meetingDate']
                console.log(this.stDate)
                //this.mtDate=data['meetingDate']
          })
   }
      });

     
      
  }

  ngOnInit() {
   
  }


  registerMeeting(frm :any){
    
    if(frm.objectId==null){
        
      console.log(frm)
      this.meeting.saveData(frm).subscribe(
        res=>{
          console.log(res)
        },
        err=>{
          console.log(err)
          this.toastr.success(err,'Meeting Register');
        },
        ()=>{
        console.log("record saved")
        this.router.navigate(['/viewMeeting']);
        this.toastr.success('New Record Added Successfully','Meeting Register');
      })

        
 
    }else{

      console.log(frm.objectId);
      this.meeting.saveData(frm).subscribe(
        res=>console.log(res),
        err=>console.log(err),
        ()=>{
          console.log("record updated")
          //this.meeting.showMeeting();
          this.router.navigate(['/viewMeeting']);
          this.toastr.success('New Record Updated Successfully','Meeting Register');
          
        }
      )
    }
  }


  publish(frm:any ){
    console.log(frm)
    if(frm.objectId==null){
      console.log(frm)
      this.meeting.publishData(frm).subscribe(
        res=>console.log(res),
        err=>console.log(err),
        ()=>{
         console.log("record saved")
          //this.meeting.showMeeting();
          this.router.navigate(['/viewMeeting']);
          this.toastr.success('New Record Published Successfully','Meeting Register');
          var serverKey = 'AAAA-vhQn20:APA91bFRNikSzNXPGklpEB6SU12TWeihUrFFz60gBoGSQjnUHyncEjDHK07q1X_sJu3aLtsYfY4IQk52WwUMDLjVpp6lpoDXZfMJZW33dqaNkUkzXT_Yai26S-ktRHA9lhTpDn297Yi-';
          var fcm = new FCM(serverKey); 
          var message = {
             registration_ids: ['emqR_8IaqyY:APA91bEOFP9T5pD2OPrVur4Fu7CSLM5Kbitek2IE8mFZ4o1AkJMuJ7Wl54OhvwbesnTpaXvH2R0_QaFds6s-yC1iAygBAuAGgJKYDRNJ4laONtDjyoqB29cJWWD6Q7Y3Qp6AK6eYvHVs','fDyP9x0uTBU:APA91bHxw7mBWf9uzEKIetyOhno6jcDBDTOmN8aLYfGibBSRUT7YIqCirKGLqXcnCXKSxYEIvEPvhn-9w4umaaiNnwzzcImOVa6RYy2U0Z9qmTWXnIKkwrleL-sL38FEd1R6AeQ6SPOA'], // required fill with device token or topics
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
           fcm.send(message, function(err, response){
             if (err) {
                 console.log("Something has gone wrong!");
             } else {
                 console.log("Successfully sent with response: ", response);
             }
           });
        })
       
 
    }else{
      console.log(frm);
      this.meeting.publishData(frm).subscribe(
        res=>console.log(res),
        err=>console.log(err),
        ()=>{
          console.log("record updated")
          //this.meeting.showMeeting();
          this.router.navigate(['/viewMeeting']);
          this.toastr.success('Record Publised Successfully','Meeting Register');
          
        })
        var serverKey = 'AAAA-vhQn20:APA91bFRNikSzNXPGklpEB6SU12TWeihUrFFz60gBoGSQjnUHyncEjDHK07q1X_sJu3aLtsYfY4IQk52WwUMDLjVpp6lpoDXZfMJZW33dqaNkUkzXT_Yai26S-ktRHA9lhTpDn297Yi-';
        var fcm = new FCM(serverKey); 
        var message = {
           registration_ids: ['emqR_8IaqyY:APA91bEOFP9T5pD2OPrVur4Fu7CSLM5Kbitek2IE8mFZ4o1AkJMuJ7Wl54OhvwbesnTpaXvH2R0_QaFds6s-yC1iAygBAuAGgJKYDRNJ4laONtDjyoqB29cJWWD6Q7Y3Qp6AK6eYvHVs','fDyP9x0uTBU:APA91bHxw7mBWf9uzEKIetyOhno6jcDBDTOmN8aLYfGibBSRUT7YIqCirKGLqXcnCXKSxYEIvEPvhn-9w4umaaiNnwzzcImOVa6RYy2U0Z9qmTWXnIKkwrleL-sL38FEd1R6AeQ6SPOA'], // required fill with device token or topics
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
         fcm.send(message, function(err, response){
           if (err) {
               console.log("Something has gone wrong!");
           } else {
               console.log("Successfully sent with response: ", response);
           }
         });
    }

  }

  dataformat(date1:string){
    let date = new Date(date1);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    var dt = date.getDate();
    // if (dt < 10) {
    //   dt = '0' + dt;
    // }
    // if (month < 10) {
    //   month = '0' + month;
    // }
    return dt+'/'+month+'/'+year; 

    //console.log(year+'-' + month + '-'+dt);
  }

  Onedit(_id:string)
  {
    console.log(_id)
    //this.meeting.objectId=Object.assign({},_id);
    this.router.navigate(['/activity',{ 'objectId': _id}]);
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
        return  `with: ${reason}`;
    }
}
  
}
