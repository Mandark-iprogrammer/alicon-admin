import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../activity/activity.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.scss'],
  providers:[ActivityService]
})
export class ViewActivityComponent implements OnInit {
  APP_ID :string
  MASTER_KEY :string
  SERVER_URL : string
  
  docs:any
  docs1:any
  constructor(
    private activity : ActivityService,
    private toastr: ToastrService,
    public router: Router,
    private http: HttpClient
  ) {

    
    //display meeting first  
    this.APP_ID = "ObQCLvdrqRekAzP7LWcZYPmzMYIDEALOGRPAALICON"
    this.MASTER_KEY = "ErgFlrkodmUKTHVnRh0vJ8LzzVboP9VXUGmkALICON"
    this.SERVER_URL = 'http://192.168.151.156:1337/alicon/parse/classes/meeting'
    this.http.get(this.SERVER_URL,{
         headers:new HttpHeaders({
          'Content-Type':'application/json',
          'X-Parse-Application-Id':this.APP_ID,
          'X-Parse-REST-API-Key':this.MASTER_KEY,
          'X-Parse-Revocable-Session':'1'
      })
      }).subscribe(data => {
          console.log(data)       
          this.docs1=data['results']
          this.docs1.forEach(element => {
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
     })


     //then display activity 
    // this.activity.displayActivity().subscribe(data => {
    //   console.log(data) 
    //   this.docs=data['results'];
    //   this.docs.forEach(element => {
       
    //     if(element.isPublished){
    //     if(element.isPublished=="false"){
    //         element.isPublished="No";
    //       }
    //       else{
    //         element.isPublished="Yes";
    //       }
    //     }
        
      
    //   });
      
    //   //console.log(this.docs) 
      
    // })

   }

  ngOnInit() {
  }
  public isCollapsed = true;


  dataformat(date1:string){
    let date = new Date(date1);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    var dt = date.getDate();
    return dt+'/'+month+'/'+year; 
  }

  abc(object:string){
    console.log(object)
    this.APP_ID = "ObQCLvdrqRekAzP7LWcZYPmzMYIDEALOGRPAALICON"
    this.MASTER_KEY = "ErgFlrkodmUKTHVnRh0vJ8LzzVboP9VXUGmkALICON"
    this.SERVER_URL = 'http://192.168.151.156:1337/alicon/parse/classes/activity?where={"meetingId":{"__type":"Pointer","className":"meeting","objectId":"'+object+'"}}'
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
          this.docs.forEach(element => {
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
     })
  }


  Onedit(_id:string)
  {
    console.log(_id)
    //this.meeting.objectId=Object.assign({},_id);
    this.router.navigate(['/activity',{ 'objectId': _id}]);
  }


}
