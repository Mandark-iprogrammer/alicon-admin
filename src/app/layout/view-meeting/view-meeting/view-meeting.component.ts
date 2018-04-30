import { Component, OnInit,Output } from '@angular/core';
import { MeetingService } from '../../meeting/meeting.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-meeting',
  templateUrl: './view-meeting.component.html',
  styleUrls: ['./view-meeting.component.scss'],
  providers:[MeetingService]
})
export class ViewMeetingComponent implements OnInit {
  docs:any
  dd:string
  mm:string
  yyyy:string
  @Output() view:string;
  constructor(
    private meeting : MeetingService,
    private toastr: ToastrService,
    public router: Router
  ) { 
    this.meeting.displayMeeting().subscribe(data => {
      console.log(data) 
      this.docs=data['results'];
      this.docs.forEach(element => {
        element.startDate=this.dataformat(element.startDate.iso)
        if(element.meetingDate){
          element.meetingDate=this.dataformat(element.meetingDate.iso)
        }
        //console.log(element.isPublished)
        if(element.isPublished){
        if(element.isPublished=="false"){
            element.isPublished="No";
          }
          else{
            element.isPublished="Yes";
          }
        }
        
      
      });
      
      console.log(this.docs) 
      
    })
  }

  ngOnInit() {
  }

  Onedit(_id:string)
  {
    console.log(_id)
    this.meeting.objectId=Object.assign({},_id);
    this.router.navigate(['/meeting',{ 'objectId': _id}]);
  }

  OnView(_id:string){
    this.view="view"
    this.router.navigate(['/meeting',{ 'objectId': _id,'view':'view'}]);
  }

  Ondelete(id:string){
    var result=confirm('Are you sure want to delete a record?')
    if(result){
    console.log(id)
    this.meeting.deleteMeeting(id).subscribe(
      res=>console.log(res),
      err=>console.log(err),
      ()=>{
        console.log("record deleted")
        this.meeting.displayMeeting();
        this.router.navigate(['/viewMeeting']);
        this.toastr.success('New Record deleted Successfully','Meeting Register');
      }
    )
  }
  else{
    this.router.navigate(['/viewMeeting']);
  }
  }


  dataformat(date1:string){
    let date = new Date(date1);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    var dt = date.getDate();
    return dt+'/'+month+'/'+year; 
  }
  
}
