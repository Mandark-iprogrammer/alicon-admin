import { Component, OnInit, Output } from '@angular/core';
import { MeetingService } from '../../meeting/meeting.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environments/environment';
import { NgbDateFRParserFormatter } from '../../meeting/meeting/ngb-date-fr-parser-formatter';
import { NgbDateNativeAdapter } from '../../meeting/meeting/ngb-d-datepicker-dapter';

@Component({
  selector: 'app-view-meeting',
  templateUrl: './view-meeting.component.html',
  styleUrls: ['./view-meeting.component.scss'],
  providers: [MeetingService, NgbModal, NgbActiveModal, { provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter },
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }, NgbModal, NgbActiveModal]
})
export class ViewMeetingComponent implements OnInit {
  nm: any;
  source: Object;
  closeResult: any;

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
        title: 'Meeting Time'
      }
    },
    mode: 'inline', // inline|external|click-to-edit
    selectMode: 'single', // single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [{
        name: '',
        title: 'View Details ',
      }],
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
  modalReference1: NgbModalRef;
  SERVER_URL1: any;
  venues: any;
  unique: any;
  minDate: any;
  pub: string = "UnPublished"
  defaultSettingsActivity: any
  //public mtDate1:Date
  sav: string = "Save"
  published: boolean = false
  tag: any;
  mtDate1: any;
  order: number;
  notFound: string
  public dt: Date;
  desc: string; remk: string; time1: any; createby: string; objID: string; ven: string; stTime: string; stDate: Date; mtDate: Date

  meetingID: string;

  docs: any
  docs1: any
  dd: string
  mm: string
  yyyy: string
  APP_ID: string
  MASTER_KEY: string
  SERVER_URL: string
  @Output() view: string;
  constructor(
    private meeting: MeetingService,
    private toastr: ToastrService,
    public router: Router,
    private modalService: NgbModal,
    private actModel: NgbActiveModal,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
  ) {

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    this.minDate = { "year": year, "month": month, "day": dt };


    this.meeting.displayMeeting().subscribe(data => {
      //console.log(data) 
      this.docs = data['results'];

      this.docs.forEach(element => {
        //element.startDate=this.dataformat(element.startDate.iso)
        if (element.meetingDate) {
          element.meetingDate = this.dataformat(element.meetingDate.iso)
        }
        ////console.log(element.isPublished)
        if (element.isPublished) {
          if (element.isPublished == "false") {
            element.isPublished = "No";
          }
          else {
            element.isPublished = "Yes";
          }
        }
      });
      //console.log(this.docs) 
    })

    this.APP_ID = environment.APP_ID;
    this.MASTER_KEY = environment.MASTER_KEY;
    this.SERVER_URL1 = environment.apiUrl + '/functions/meeting_venues'
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


    this.activatedRoute.params.subscribe((params: Params) => {
      let userId = params['objectId'];

      if (userId != null) {



        this.SERVER_URL = environment.apiUrl + '/classes/meeting/' + userId;

        return this.http.get(this.SERVER_URL, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Parse-Application-Id': this.APP_ID,
            'X-Parse-REST-API-Key': this.MASTER_KEY,
          })
        }).subscribe(data => {

          //console.log(data)
          this.source = data
          this.docs1 = data
          this.sav = "Update"
          this.mtDate1 = this.dataformat1(data['meetingDate']['iso'])
          data['meetingDate'] = this.dataformat(data['meetingDate']['iso'])
          this.nm = data['name']
          this.desc = data['description']
          this.remk = data['remark']
          //this.createby=data['createdBy']['objectId']
          this.objID = data['objectId']
          this.ven = data['venue']
          this.stTime = data['startTime']
          this.time1 = this.convertTime12to24(data['startTime'])
          this.stDate = data['startDate']
          this.mtDate = data['meetingDate']

          // this.dt = new Date("'"+this.mtDate+"'");
          this.dt = new Date(this.mtDate1.toString());
          //console.log(this.dt)

          this.tag = data['tags']
          if (data['isPublished'] == false) {
            this.published = false;

            this.pub = "UnPublish"
          }
          else {
            this.published = true;

            this.pub = "Published"
          }


        })
      }
    });

  }

  ngOnInit() {
  }

  Onedit(_id: string) {
    //console.log(_id)
    this.meeting.objectId = Object.assign({}, _id);
    this.router.navigate(['/meeting', { 'objectId': _id }]);
  }

  OnView(_id: string) {
    this.view = "view"
    //  this.router.navigate(['/meeting',{ 'objectId': _id,'view':'view'}]);
    this.router.navigate(['/meeting', _id]);
  }

  Ondelete(id: string) {
    var result = confirm('Are you sure want to delete a record?')
    if (result) {
      //console.log(id)
      this.meeting.deleteMeeting(id).subscribe(
        res =>//console.log(res),
          err =>//console.log(err),
            () => {
              //console.log("record deleted")
              this.toastr.success('New Record deleted Successfully', 'Meeting Register');
              this.meeting.displayMeeting();
              this.router.navigate(['/viewMeeting']);
            }
      )
    }
    else {
      this.router.navigate(['/viewMeeting']);
    }
  }


  dataformat(date1: string) {
    let date = new Date(date1);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    var dt = date.getDate();
    // dt = dt < 10 ? '0'+dt : dt;
    // month=month < 10 ? '0'+month : month;
    return dt + '/' + month + '/' + year;
  }

  onCustom(event) {
    //this.router.navigate(['/meeting' , event.data.objectId]);
    //this.activatedRoute.re
    this.router.navigate(['/meeting', event.data.objectId]);
     //this.router.navigate(['/meeting',{'objectId': event.data.objectId}]);
    // this.router.navigate(['/meeting'], { queryParams:{'objectId': event.data.objectId} });
    //this.router.navigate(['/meeting/'+event.data.objectId]);
  }

  openLg(content) {
    // this.Msg="Save";
    this.modalReference1 = this.modalService.open(content, { size: 'lg', centered: true });
    // this.modalReference1.result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    //   //console.log(this.closeResult)
    // }, (reason) => {
    //   this.closeResult = `Dismissed: ${reason}`;
    //   //console.log(this.closeResult)
    // })
  }

  convertTime12to24(time12h) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return { "hour": hours, "minute": minutes }
    //return hours + ':' + minutes;
  }

  registerMeeting(frm: any) {
    console.log(frm)
    if (frm.isPublished == "") {
      frm.isPublished = false;
    }
    if (frm.objectId == null) {
      //console.log(frm)
      this.meeting.saveData(frm).subscribe(
        res => {
          //console.log(res)
          this.router.navigate(['/meeting', { 'objectId': res['objectId']}]);
        },
        err => {
          console.log(err)
          //this.toastr.error(err, 'Meeting Register');
        },
        () => {
          //console.log("record saved")

          this.toastr.success('New Record Added Successfully');
          this.modalReference1.close();
        })
    } else {
      //console.log(frm.objectId);
      this.meeting.saveData(frm).subscribe(
        res => {
          //console.log(res),
          this.router.navigate(['/meeting', { 'objectId': frm.objectId }]);
        },
        err => //console.log(err),
          () => {
            //console.log("record updated")
            //this.meeting.showMeeting();

            this.toastr.success('Record Updated Successfully');
            this.modalReference1.close();
          }
      )
    }
  }

  dataformat1(date1: string) {
    let date = new Date(date1);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    return year + '-' + month + '-' + dt;
  }
  onChange1(event) {
    if (event == true) {
      this.pub = "Published"
      this.published = true;
    }
    else {
      this.pub = "UnPublished"
      this.published = false;
    }
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

}
