import { Component, OnInit, Input, Output, SimpleChange, EventEmitter, OnChanges } from '@angular/core';
import { UserService } from '../../../user/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { environment } from '../../../../../environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NgbModal, ModalDismissReasons,NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-accept-user',
  templateUrl: './accept-user.component.html',
  styleUrls: ['./accept-user.component.scss'],
  providers:[UserService,NgbModal,NgbActiveModal]
})
export class AcceptUserComponent implements OnInit {
  objID1: NgbModalRef;
  closeResult: string;
  @Input() source: any;
  @Input() settings: Object = {};

  @Output() rowSelect = new EventEmitter<any>();
  @Output() userRowSelect = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  
  @Output() create = new EventEmitter<any>();
  @Output() custom = new EventEmitter<any>();
  @Output() deleteConfirm = new EventEmitter<any>();
  @Output() editConfirm = new EventEmitter<any>();
  @Output() createConfirm = new EventEmitter<any>();
  @Output() rowHover: EventEmitter<any> = new EventEmitter<any>();

  APP_ID :string
  MASTER_KEY :string
  SERVER_URL : string
  tableClass: string;
  tableId: string;
  token:string;
  perPageSelect: any;
  isHideHeader: boolean;
  isHideSubHeader: boolean;
  isPagerDisplay: boolean;
  rowClassFunction: Function;
  
  modalReference: NgbModalRef;
  docs: any
 // tableParamsFolders = {};
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
      designation: {
        title: 'Designation'
      },
      phoneNumber: {
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
    selectMode: 'single', // single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: true,
      delete: false,
      custom: [{
      
        name: 'Accepted',
        title: 'Accept',
      }],
      position: 'right', // left|right
    },
    filter: {
      inputClass: 'filter-smart-table',
    },
    edit: {
      inputClass: '',
      editButtonContent: '<br>Reject',
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
      deleteButtonContent: 'Send Mail',
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
    private user : UserService,
    private toastr: ToastrService,
    public router: Router,
    private http: HttpClient,
    private modalService: NgbModal,
    private actModel: NgbActiveModal,
  ) {
    this.OnChanges();
  }

  OnChanges(){
    this.token=localStorage.getItem('sessionToken');
    this.APP_ID = environment.APP_ID;
    this.MASTER_KEY =  environment.MASTER_KEY;
    this.SERVER_URL = environment.apiUrl+'/users?where={"isAdmin":false,"userStatus": { "$in" : ["Pending"] } }'
    
    this.http.get(this.SERVER_URL,{
      headers:new HttpHeaders({
      'Content-Type':'application/json',
      'X-Parse-Application-Id':this.APP_ID,
      'X-Parse-REST-API-Key':this.MASTER_KEY,
     })
   }).subscribe(data => {
      this.source=data['results'];
    })
  }

  ngOnInit() {
  }
  
  onCustom(event) {
    //this.router.navigate(['/User',event.data.objectId]);
    let arr={
      "userStatus":"Accepted"
    } 
    console.log(event)
    this.SERVER_URL = environment.apiUrl+'/users/' + event.data.objectId
      return this.http.put(this.SERVER_URL, arr, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Parse-Application-Id':this.APP_ID,
          'X-Parse-Master-Key':this.MASTER_KEY
        })
      }).subscribe(
        res =>{
                console.log(res)
              var body="<h1>Welcome to Alicon</h1><br><ul>";
              body+="<li><b>Name:</b> "+event.data.firstName+" "+event.data.lastName+"</li>";
              body+="<li><b>Email:</b>"+event.data.username+"</li>";
              body+="<li><b>Password</b>"+event.data.password+"</li>";
              body+="<li><b>Designation</b>"+event.data.designation+"</li></ul><br/><br/><br/>";
                      
              var data={
                "SentTo":event.data.username,
                "body":body
            }
           // this.SERVER_URL = "http://localhost:3000/send1"
            this.SERVER_URL = environment.apiUrl+'/functions/AcceptUserEmail'
            return this.http.post(this.SERVER_URL,data,{
            headers:new HttpHeaders({
            'Content-Type':'application/json',
            'X-Parse-Application-Id':this.APP_ID,
            'X-Parse-Master-Key':this.MASTER_KEY, 
            })
            }).subscribe(
            res=>console.log(res),
            err=>{
              this.toastr.error(err.error['error']);     
              console.log(err)},
            ()=>{       // this.toastr.success('Mail sent Successfully');
            })             
        },
        err => console.log(err),
        () => {
          this.toastr.success('User Accepted Successfully');
         // this.OnChanges();
        })
  }

  edit(event){
    let arr={
      "userStatus":"Rejected"
    } 
    console.log(event)
    this.SERVER_URL = environment.apiUrl+'/users/' + event.data.objectId
    return this.http.put(this.SERVER_URL, arr, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Parse-Application-Id':this.APP_ID,
        'X-Parse-Master-Key':this.MASTER_KEY
      })
    }).subscribe(
      res => console.log(res),
      err => console.log(err),
      () => {
        this.toastr.success('User Rejected');
        this.OnChanges();
      })

  }
}
