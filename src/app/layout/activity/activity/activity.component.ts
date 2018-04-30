import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivityService } from '../activity.service';
import { ToastrService } from 'ngx-toastr';
import { Router,Params,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  providers:[ActivityService]
})
export class ActivityComponent implements OnInit {
  public show:boolean = true;
  public show1:boolean = true;
  public show2:boolean = true;
  APP_ID :string
  MASTER_KEY :string
  SERVER_URL : string
  docs:any
  docs1:any
  docs2:any
  nm:string
  desc:string;remk:string;createby:string;objID1:string;ven:string;stTime:string;stDate:string;mtDate:string;isPublish:boolean
  constructor(
    private http: HttpClient,
    private activity: ActivityService,
    public router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {

    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params)
      let userId = params['meetingId'];
      let objectId=params['objectId'];
      
      console.log(userId);
      if(userId!=null){
    this.APP_ID = "ObQCLvdrqRekAzP7LWcZYPmzMYIDEALOGRPAALICON"
    this.MASTER_KEY = "ErgFlrkodmUKTHVnRh0vJ8LzzVboP9VXUGmkALICON"
    this.SERVER_URL = 'http://192.168.151.156:1337/alicon/parse/classes/meeting/'+userId
    this.http.get(this.SERVER_URL,{
         headers:new HttpHeaders({
          'Content-Type':'application/json',
          'X-Parse-Application-Id':this.APP_ID,
          'X-Parse-REST-API-Key':this.MASTER_KEY,
          'X-Parse-Revocable-Session':'1'
      })
      }).subscribe(data => {
          console.log(data)       
          this.docs=data
          console.log(this.docs)
             data['startDate']=this.dataformat(data['startDate']['iso'])
             data['meetingDate']=this.dataformat(data['meetingDate']['iso'])
              
            this.nm=data['name']
            this.desc=data['description']
            this.remk=data['remarks']
            this.objID1=data['objectId']
            this.ven=data['venue']
            this.stTime=data['startTime']
           this.stDate=data['startDate']
           this.mtDate=data['meetingDate']
           this.isPublish=data['isPublished']
          
     })
    }

    if(userId){

      this.APP_ID = "ObQCLvdrqRekAzP7LWcZYPmzMYIDEALOGRPAALICON"
    this.MASTER_KEY = "ErgFlrkodmUKTHVnRh0vJ8LzzVboP9VXUGmkALICON"
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
      });
  }




  if(objectId!=null){
    console.log(objectId);
    this.APP_ID = "ObQCLvdrqRekAzP7LWcZYPmzMYIDEALOGRPAALICON"
    this.MASTER_KEY = "ErgFlrkodmUKTHVnRh0vJ8LzzVboP9VXUGmkALICON"
    this.SERVER_URL = 'http://192.168.151.156:1337/alicon/parse/classes/activity/'+objectId
    this.http.get(this.SERVER_URL,{
         headers:new HttpHeaders({
          'Content-Type':'application/json',
          'X-Parse-Application-Id':this.APP_ID,
          'X-Parse-REST-API-Key':this.MASTER_KEY,
          'X-Parse-Revocable-Session':'1'
      })
      }).subscribe(data => {
          console.log(data)       
          //this.docs=data
          //console.log(this.docs)
             //data['startDate']=this.dataformat(data['startDate']['iso'])
             //data['meetingDate']=this.dataformat(data['meetingDate']['iso'])
             this.show1 = !this.show1; 
             this.show = !this.show; 
            this.nm=data['name']
            this.desc=data['description']
            this.remk=data['remarks']
            this.objID1=data['objectId']
            this.ven=data['venue']
            this.stTime=data['startTime']
           this.stDate=data['startDate']
           this.mtDate=data['meetingDate']
           this.isPublish=data['isPublished']
          
     })
    }


    });





   }

  ngOnInit() {
  }

  registerActivity(frm:any){
    console.log(frm)
    if(frm.objectId==null){
      console.log(frm)
      this.activity.saveData(frm).subscribe(
        res=>{
          console.log(res);
          this.router.navigate(['/activity',{ 'objectId': res['objectId'],'meetingId':this.objID1}]);
        },
        err=>console.log(err),
        ()=>{
         console.log("record saved")
          //this.meeting.showMeeting();
         
          this.toastr.success('New Record Added Successfully','Activity Register');
          
        }
      )
 
    }else{
      console.log(frm.objectId);
      this.activity.saveData(frm).subscribe(
        res=>console.log(res),
        err=>console.log(err),
        ()=>{
          console.log("record updated")
          //this.meeting.showMeeting();
        //  this.router.navigate(['/viewActivity']);
          this.toastr.success('New Record Updated Successfully','Activity Register');
          
        }
      )
    }
  }

  dataformat(date1:string){
    let date = new Date(date1);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    var dt = date.getDate();
    return dt+'/'+month+'/'+year; 
  }


  Onedit(_id:string)
  {
    console.log(_id)
    //this.meeting.objectId=Object.assign({},_id);
    this.router.navigate(['/activity',{ 'objectId': _id}]);
  }

}
