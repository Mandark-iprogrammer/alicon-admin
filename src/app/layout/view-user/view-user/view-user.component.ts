import { Component, OnInit, Input, Output, SimpleChange, EventEmitter, OnChanges } from '@angular/core';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Grid } from '../lib/grid';
import { DataSource } from '../lib/data-source/data-source';
import { Row } from '../lib/data-set/row';
import { deepExtend } from '../lib/helpers';
import { LocalDataSource } from '../lib/data-source/local/local.data-source';
import { environment } from '../../../../environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {NgbModal, ModalDismissReasons,NgbModalRef, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
  providers:[UserService,NgbModal,NgbActiveModal]
})
export class ViewUserComponent implements OnInit {

  objID1: NgbModalRef;
  closeResult: string;
  @Input() source: any;
  @Input() settings: Object = {};

  @Output() rowSelect = new EventEmitter<any>();
  @Output() userRowSelect = new EventEmitter<any>();
 
  
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
  grid: Grid;
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
      
        name: 'Edit',
        title: '<i class="fa fa-fw fa-edit">',
      }
      ],
      position: 'right', // left|right
    },
    filter: {
      inputClass: '',
    },
    edit: {
      inputClass: '',
      editButtonContent: '<br>Change Password',
      saveButtonContent: 'Update',
      cancelButtonContent: 'Cancel',
      confirmSave: true,
    },
    add: {
      inputClass: '',
      addButtonContent: '<br>Forgot Password',
      createButtonContent: 'Create',
      cancelButtonContent: 'Cancel',
      confirmCreate: true,
    },
    delete: {
      deleteButtonContent: '<br>Forgot Password',
      confirmDelete: true,
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
    this.token=localStorage.getItem('sessionToken');
    this.APP_ID = environment.APP_ID;
    this.MASTER_KEY =  environment.MASTER_KEY;
    this.OnChanges();
    
  }

  OnChanges(){
    this.user.displayUser().subscribe(data => {
      
      this.source=data['results'];
      //console.log(this.source)
    })
  }

  ngOnInit() {
    this.OnChanges();
  }
  isAllSelected: boolean = true;
  
  
  onCustom(event) {
    console.log(event)
    if(event.action=="Mail"){

    }
    else{
      this.router.navigate(['/User',{ 'objectId': event.data.objectId}]);
    }
    //this.router.navigate(['/User',event.data.objectId]); 
    
  
  }
  edit(event,content){
    //console.log(event)
    this.objID1=event.data.objectId
    this.modalReference =this.modalService.open(content, {centered: true});
    this.modalReference.result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
   
      //console.log(this.closeResult)
    }, (reason) => {
      this.closeResult = `Dismissed`;
      //console.log(this.closeResult)
    })
    //console.log(event)
  }

  changePwd(frm){
 //   console.log(frm)
    var data = {"password" : frm.password };
    this.SERVER_URL = environment.apiUrl+'/users/'+frm.objectId
    return this.http.put(this.SERVER_URL,data,{
     headers:new HttpHeaders({
     'Content-Type':'application/json',
     'X-Parse-Application-Id':this.APP_ID,
     'X-Parse-Master-Key':this.MASTER_KEY,
    
    })
  }).subscribe(
    res=>console.log(res),
    err=>console.log(err),
    ()=>{
     // console.log("record updated")
      //this.meeting.showMeeting();
      this.router.navigate(['/viewUsers']);
      this.toastr.success('Password Changed Successfully');
      this.modalReference.close();
    }
  )

  }
  
  delete(event){

    var encodedString = btoa(event.data.objectId);
 
    var data={
        "email":event.data.username
        
    }
   // this.SERVER_URL1 = environment.apiUrl+'/functions/meeting_venues'
    this.SERVER_URL = environment.apiUrl+'/functions/forgot'
    return this.http.post(this.SERVER_URL,data,{
     headers:new HttpHeaders({
     'Content-Type':'application/json',
     'X-Parse-Application-Id':this.APP_ID,
     'X-Parse-Master-Key':this.MASTER_KEY,
    })
  }).subscribe(
    res=>console.log(res),
    err=>console.log(err),
    ()=>{
      this.toastr.success('Mail sent Successfully');
    })
  }

  fetchNews(event){
    //console.log(event);
    if(event.activeId==="ngb-tab-2"){
      this.OnChanges();
    }    
    else if(event.activeId==="ngb-tab-1"){
      this.OnChanges();
    }
    else if(event.activeId==="ngb-tab-0"){
      this.OnChanges();
    }
  }

}
