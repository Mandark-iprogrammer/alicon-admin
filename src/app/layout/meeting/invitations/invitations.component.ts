import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MeetingService } from '../meeting.service';
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivityService } from '../../activity/activity.service';
import { CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent } from "ng-auto-complete";

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss']
})
export class InvitationsComponent implements OnInit {
  APP_ID: string
  MASTER_KEY: string
  SERVER_URL: string
  docs: any
  meetingID: string
  docs1=[]
  unique1 = []


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
        title: 'edit ',
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



  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {


    this.activatedRoute.params.subscribe((params: Params) => {
      this.meetingID = params['objectId'];
    });

    this.APP_ID = "ObQCLvdrqRekAzP7LWcZYPmzMYIDEALOGRPAALICON"
    this.MASTER_KEY = "ErgFlrkodmUKTHVnRh0vJ8LzzVboP9VXUGmkALICON"
    this.SERVER_URL = 'http://192.168.151.156:1337/alicon/parse/users?where={"isAdmin":false}'
    this.http.get(this.SERVER_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': this.APP_ID,
        'X-Parse-REST-API-Key': this.MASTER_KEY,
        'X-Parse-Revocable-Session': '1'
      })
    }).subscribe(data => {
      this.docs = data['results']
      console.log(this.docs)
      this.docs.forEach(element => {
        this.unique1.push({ value: element.objectId, display: element.firstName + ' ' + element.lastName });

      });
    })



    this.SERVER_URL = 'http://192.168.151.156:1337/alicon/parse/classes/meeting/' + this.meetingID;
    this.http.get(this.SERVER_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': this.APP_ID,
        'X-Parse-REST-API-Key': this.MASTER_KEY,
        'X-Parse-Revocable-Session': '1'
      })
    }).subscribe(data => {
        console.log(data['meetingUsers']);
      //this.docs1 = data['results']
      //console.log(this.docs1)
      data['meetingUsers'].forEach(element => {
          console.log(element)
          this.SERVER_URL = 'http://192.168.151.156:1337/alicon/parse/users/' + element;
          this.http.get(this.SERVER_URL, {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'X-Parse-Application-Id': this.APP_ID,
              'X-Parse-REST-API-Key': this.MASTER_KEY,
              'X-Parse-Revocable-Session': '1'
            })
          }).subscribe(data2 => {
           // console.log(data2)
            this.docs1.push(data2)
            console.log(this.docs1)
          })
      });
    })

  }


  ngOnInit() {
  }

  invitations(frm: any) {
    console.log(frm)

    let arrr = [];
    console.log(frm.users)
    for (var i = 0; i < frm.users.length; i++) {
      arrr.push(frm.users[i].value);
    }
    console.log(arrr);
    let arr = {

      "meetingUsers": arrr

    }
    this.SERVER_URL = 'http://192.168.151.156:1337/alicon/parse/classes/meeting/' + frm.objectId
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
        this.router.navigate(['/viewMeeting']);
        this.toastr.success('New Record Updated Successfully', 'Meeting Register');

      }
    )





  }

}
