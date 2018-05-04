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

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
  providers:[UserService]
})
export class ViewUserComponent implements OnInit {

  @Input() source: any;
  @Input() settings: Object = {};

  @Output() rowSelect = new EventEmitter<any>();
  @Output() userRowSelect = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() create = new EventEmitter<any>();
  @Output() custom = new EventEmitter<any>();
  @Output() deleteConfirm = new EventEmitter<any>();
  @Output() editConfirm = new EventEmitter<any>();
  @Output() createConfirm = new EventEmitter<any>();
  @Output() rowHover: EventEmitter<any> = new EventEmitter<any>();


  tableClass: string;
  tableId: string;
  perPageSelect: any;
  isHideHeader: boolean;
  isHideSubHeader: boolean;
  isPagerDisplay: boolean;
  rowClassFunction: Function;
  grid: Grid;

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
    private user : UserService,
    private toastr: ToastrService,
    public router: Router
  ) { 
    this.user.displayUser().subscribe(data => {
      console.log(data) 
      this.source=data['results'];
    
    })
  }

  ngOnInit() {
  }
  isAllSelected: boolean = true;
  // ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
  //   if (this.grid) {
  //     if (changes['settings']) {
  //       this.grid.setSettings(this.prepareSettings());
  //     }
  //     if (changes['source']) {
  //       this.source = this.prepareSource();
  //       this.grid.setSource(this.source);
  //     }
  //   } else {
  //     this.initGrid();
  //   }
  //   this.tableId = this.grid.getSetting('attr.id');
  //   this.tableClass = this.grid.getSetting('attr.class');
  //   this.isHideHeader = this.grid.getSetting('hideHeader');
  //   this.isHideSubHeader = this.grid.getSetting('hideSubHeader');
  //   this.isPagerDisplay = this.grid.getSetting('pager.display');
  //   this.isPagerDisplay = this.grid.getSetting('pager.display');
  //   this.perPageSelect = this.grid.getSetting('pager.perPageSelect');
  //   this.rowClassFunction = this.grid.getSetting('rowClassFunction');
  // }

  
  // editRowSelect(row: Row) {
  //   if (this.grid.getSetting('selectMode') === 'multi') {
  //     this.onMultipleSelectRow(row);
  //   } else {
     
  //     this.onSelectRow(row);
  //   }
  // }

  // onUserSelectRow(row: Row) {
  //   if (this.grid.getSetting('selectMode') !== 'multi') {
  //     this.grid.selectRow(row);
  //     this.emitUserSelectRow(row);
  //     this.emitSelectRow(row);
  //   }
  // }

  // onRowHover(row: Row) {
  //   this.rowHover.emit(row);
  // }

  // multipleSelectRow(row: Row) {
  //   this.grid.multipleSelectRow(row);
  //   this.emitUserSelectRow(row);
  //   this.emitSelectRow(row);
  // }

  // onSelectAllRows($event: any) {
  //   this.isAllSelected = !this.isAllSelected;
  //   this.grid.selectAllRows(this.isAllSelected);

  //   this.emitUserSelectRow(null);
  //   this.emitSelectRow(null);
  // }

  // onSelectRow(row: Row) {
  //   this.grid.selectRow(row);
  
  //   this.emitSelectRow(row);
  // }

  // onMultipleSelectRow(row: Row) {
  //   this.emitSelectRow(row);
  // }

  // initGrid() {
  //   this.source = this.prepareSource();
  //   this.grid = new Grid(this.source, this.prepareSettings());
  //   this.grid.onSelectRow().subscribe((row) => this.emitSelectRow(row));
  // }

  // prepareSource(): DataSource {
  //   if (this.source instanceof DataSource) {
  //     return this.source;
  //   } else if (this.source instanceof Array) {
  //    // return new LocalDataSource(this.source);
  //   }

  //   return new LocalDataSource();
  // }

  // prepareSettings(): Object {
  //   return deepExtend({}, this.defaultSettings, this.settings);
  // }

  // changePage($event: any) {
  //   this.resetAllSelector();
  // }

  // sort($event: any) {
  //   this.resetAllSelector();
  // }

  // filter($event: any) {
  //   this.resetAllSelector();
  // }

  // private resetAllSelector() {
  //   this.isAllSelected = false;
  // }

  // private emitUserSelectRow(row: Row) {
  //   const selectedRows = this.grid.getSelectedRows();

  //   this.userRowSelect.emit({
  //     data: row ? row.getData() : null,
  //     isSelected: row ? row.getIsSelected() : null,
  //     source: this.source,
  //     selected: selectedRows && selectedRows.length ? selectedRows.map((r: Row) => r.getData()) : [],
  //   });
  // }

  // private emitSelectRow(row: Row) {
    
  //   this.rowSelect.emit({
  //     data: row ? row.getData() : null,
  //     isSelected: row ? row.getIsSelected() : null,
  //     source: this.source,
  //   });
  // }
  

  
  // Ondelete(id:string){
  //   var result=confirm('Are you sure want to delete a record?')
  //   if(result){
  //   console.log(id)
  //   this.user.deleteUsers(id).subscribe(
  //     res=>console.log(res),
  //     err=>console.log(err),
  //     ()=>{
  //       console.log("record deleted")
  //       this.user.displayUser();
  //       //this.router.navigate(['/viewUser']);
  //       this.toastr.success('New Record deleted Successfully','User Register');
  //     }
  //   )
  // }
  // else{
  //   this.router.navigate(['/viewUser']);
  // }
  // }
  
  addRecord(event) {
    var data = {"firstName" : event.newData.firstName,
                "lastName" : event.newData.lastName,
                "location" : event.newData.location,
                "desigNation":event.newData.desigNation,
                "phonenumber":event.newData.phonenumber,
                "username":event.newData.username,
                "password":"Admin@123"
                };
                this.user.saveData(data).subscribe(
                  res=>{
                    console.log(res)
                          },
                  err=>console.log(err),
                  ()=>{
                   console.log("record saved")
                   this.router.navigate(['/viewUsers']);
                   this.toastr.success('New Record Added Successfully','User Register');
                   })
  
  }
  updateRecord(event){
          var data = {"firstName" : event.newData.firstName,
                "lastName" : event.newData.lastName,
                "location" : event.newData.location,
                "desigNation":event.newData.desigNation,
                "phonenumber":event.newData.phonenumber,
                "username":event.newData.username
                
          };
          console.log(data)
          this.user.saveData(data).subscribe(
            res=>console.log(res),
            err=>console.log(err),
            ()=>{
              console.log("record updated")
              //this.meeting.showMeeting();
              this.router.navigate(['/viewUsers']);
              this.toastr.success('New Record Updated Successfully','User Register');
              
            }
          )


  }
  onCustom(event) {
    this.router.navigate(['/User',{ 'objectId': event.data.objectId}]);
  
  }

}
