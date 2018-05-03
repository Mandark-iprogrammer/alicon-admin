import { Component, OnInit } from '@angular/core';
import { Router,Params,ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {
  APP_ID :string
  MASTER_KEY :string
  SERVER_URL : string
  docs:any
  docs1:any
  unique:any
  arr=[];
  nm:string;sttTime:string;
  desc:string;remk:string;createby:string;objID1:string;ven:string;stTime:string;stDate:string;mtDate:string;isPublish:boolean
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    this.APP_ID = "ObQCLvdrqRekAzP7LWcZYPmzMYIDEALOGRPAALICON"
    this.MASTER_KEY = "ErgFlrkodmUKTHVnRh0vJ8LzzVboP9VXUGmkALICON"
    this.SERVER_URL = 'http://192.168.151.156:1337/alicon/parse/functions/user_tags'
    this.http.post(this.SERVER_URL,'',{
         headers:new HttpHeaders({
          'X-Parse-Application-Id':this.APP_ID,
          'X-Parse-REST-API-Key':this.MASTER_KEY,
          'Content-Type':'application/json',
          
      })
      }).subscribe(data => {
          console.log(data)       
         this.docs1=data['result']
          console.log(this.docs1)
          this.unique=JSON.parse(this.docs1)
          console.log(this.unique.data)
          // this.docs1['data'].forEach(element => {
          //   console.log(element)
          // });
     })







    //using queryparams
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
  });

   }

  ngOnInit() {
  }
  dataformat(date1:string){
    let date = new Date(date1);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    var dt = date.getDate();
    return dt+'/'+month+'/'+year; 
  }

 onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

}
