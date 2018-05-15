import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivityService } from './activity.service';
import { ToastrService } from 'ngx-toastr';
import { Router,Params,ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  providers:[ActivityService]
})
export class ActivityComponent implements OnInit {
  public show:boolean = true;
  public show1:boolean = true;
  public add_edit:boolean = false;
  public Msg = "Save"
  APP_ID :string
  MASTER_KEY :string
  SERVER_URL : string
  docs:any
  docs1:any
  docs2:any
  sutype=[];
  nm:string;sttTime:string;
  time1:any;time2:any;
  desc:string;remk:string;createby:string;objID1:string;ven:string;stTime:string;stDate:string;mtDate:string;isPublish:boolean
  ord:number;sec:string;objID2:string;pplace:string;staffname:string;edTime:string;dur:string;typ:string;
  constructor(
    private http: HttpClient,
    private activity: ActivityService,
    public router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {

    this.APP_ID = environment.APP_ID;
    this.MASTER_KEY =  environment.MASTER_KEY;
    this.SERVER_URL =  environment.apiUrl+'/classes/activity'
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params)
      let userId = params['meetingId'];
      let objectId=params['objectId'];
      this.objID1=params['objectId'];
      console.log(userId);
     

    if(objectId){
    this.SERVER_URL =  environment.apiUrl+'/classes/activity?where={"meetingId":{"__type":"Pointer","className":"meeting","objectId":"'+objectId+'"}}'
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
          console.log(this.docs2)
         
          this.docs2.forEach(element => {
              if(element['startTime1']){
                console.log(element['startTime1']['iso'])
                element['startTime1']=this.formatAMPM(element['startTime1']['iso'])
                 element['endTime1']=this.formatAMPM(element['endTime1']['iso'])
              }
              
          });
         
      });
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
          //this.router.navigate(['/activity',{ 'objectId': res['objectId'],'meetingId':this.objID1}]);
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
          //this.router.navigate(['/viewActivity']);
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


  Onedit(_id:string,meetingId:string)
  {
    this.add_edit=true; 
    this.Msg="Update"; 
    console.log(_id)
       this.SERVER_URL =  environment.apiUrl+'/classes/activity/'+_id
    this.http.get(this.SERVER_URL,{
         headers:new HttpHeaders({
          'Content-Type':'application/json',
          'X-Parse-Application-Id':this.APP_ID,
          'X-Parse-REST-API-Key':this.MASTER_KEY,
          'X-Parse-Revocable-Session':'1'
      })
      }).subscribe(data => {
          console.log(data)       
         // this.docs=data
         // console.log(this.docs)
             //data['startDate']=this.dataformat(data['startDate']['iso'])
             //data['meetingDate']=this.dataformat(data['meetingDate']['iso'])
             this.show1 = !this.show1; 
             this.show = !this.show; 
            this.ord=data['order']
            this.sec=data['section']
            this.objID2=data['objectID']
            this.pplace=data['presentationPlace']
            this.staffname=data['indianStaff']
            this.sttTime=this.formatAMPM(data['startTime1']['iso'])
            this.edTime=this.formatAMPM(data['endTime1']['iso'])
            this.time1=this.convertTime12to24(this.sttTime)
            this.time2=this.convertTime12to24(this.edTime)
           this.dur=data['duration']
           this.typ=data['type']
          
     })
   
    //this.meeting.objectId=Object.assign({},_id);
   // this.router.navigate(['/activity',{'objectId': _id}]);
  }

  addedit(){
      this.add_edit=true;
      
  }
  canceledit(){
    this.add_edit=false;
  }



  formatAMPM(dateiso){
    
    
    var d = new Date(dateiso);
    var ampm = (d.getHours() >= 12) ? "pm":"am";
    var hrs = (d.getHours() >= 12) ? d.getHours()-12 : d.getHours();
      return hrs+':'+d.getMinutes()+' '+ampm;
    }

    convertTime12to24(time12h) {
      const [time, modifier] = time12h.split(' ');
      let [hours, minutes] = time.split(':');
      if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
      }
    
      return { "hour":hours,"minute":minutes,"second":"00"}
      //return hours + ':' + minutes;
    }

    subtype(event){
      console.log(event.target.value)
      this.sutype.length=0;
      if(event.target.value==="Presentation"){
        this.sutype.push({"value":"Presentation"})
      }
      else if(event.target.value==="Travel"){
        this.sutype.push({"value":"Car"},{"value":"Walk"},{"value":"Auto"})
      }
      else if(event.target.value==="q&a"){
        this.sutype.push({"value":"Q&A"})
      }
      else if(event.target.value==="TeamBreak"){
        this.sutype.push({"value":"Tea"},{"value":"Lunch"})
      }
     // console.log(this.sutype)
    }

}
