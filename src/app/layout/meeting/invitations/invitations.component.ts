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
  users1=[]
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
    private activatedRoute: ActivatedRoute
  ) {
   

    this.activatedRoute.params.subscribe((params: Params) => {
      this.meetingID = params['objectId'];
    });
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
        if(data['meetingUsers']==null){
          this.notFound="No person has been invited yet."
        }
        else{ 
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
            //console.log(data)
            
           this.users1.push(data)
           
            console.log(this.users1)
          })
      });
    }
    })

  }


  ngOnInit() {
    
   
   
  }
  ngOnChanges(){
   
    
  }

  // invitations(frm: any) {
  //   console.log(frm)

  //   let arrr = [];
  //   console.log(frm.users)
  //   for (var i = 0; i < frm.users.length; i++) {
  //     arrr.push(frm.users[i].value);
  //   }
  //   console.log(arrr);
  //   let arr = {

  //     "meetingUsers": arrr

  //   }
  //   this.SERVER_URL = 'http://192.168.151.156:1337/alicon/parse/classes/meeting/' + frm.objectId
  //   return this.http.put(this.SERVER_URL, arr, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'X-Parse-Application-Id': this.APP_ID,
  //       'X-Parse-REST-API-Key': this.MASTER_KEY,
  //     })
  //   }).subscribe(
  //     res => console.log(res),
  //     err => console.log(err),
  //     () => {
  //       console.log("record updated")
  //       //this.meeting.showMeeting();
  //       this.router.navigate(['/viewMeeting']);
  //       this.toastr.success('New Record Updated Successfully', 'Meeting Register');

  //     }
  //   )





  // }


    onUserRowSelect(event){
     // this.send.length=0;
    console.log(event)
    // if(this.username.length>0){
    //   this.username.length=0;
    // }
    //this.send.push(event.data)
    if(event.isSelected===null){
      this.username.length=0;

      if(event.selected.length==0){
      
        this.username.length=0;
      }
      for(var i=0;i<event.selected.length;i++){
        this.send.push(event.selected[i].objectId)
        this.username.push(event.selected[i].firstName +' '+event.selected[i].lastName)
      }
  
    }
    else if(event.isSelected===true){       
       this.send.push(event.data.objectId)
       this.username.push(event.data.firstName +' '+event.data.lastName)
    }
    else if(event.isSelected==false){
      var i = this.send.indexOf(event.data.objectId);
      if(i != -1) {
        this.send.splice(i, 1);
      }
      var k=this.username.indexOf(event.data.firstName+' '+event.data.lastName);
      if(k != -1){
        this.username.splice(k, 1);
      }


      console.log(this.username)
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
      console.log(this.send)
     
      let arr = 
        {
          "meetingUsers": {"__op":"AddUnique", "objects": this.send
        }
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
          this.toastr.success('Invivation Send Successsfully');
  
        }
      )
    }

    fetchNews(event)
    { 
      console.log(event)
      if(event.activeId=="ngb-tab-4"){
        this.username.length=0;
      }
    
    }

}
