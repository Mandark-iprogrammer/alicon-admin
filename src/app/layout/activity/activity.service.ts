import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class ActivityService {
  APP_ID :string
  MASTER_KEY :string
  SERVER_URL : string
  objectId:any
  constructor(
    private http:HttpClient
  ) { 

    this.APP_ID = environment.APP_ID;
    this.MASTER_KEY =  environment.MASTER_KEY;
    this.SERVER_URL =  environment.apiUrl+'/classes/activity'

  }



  saveData(frm : any){
    if(frm.objectId==null){
  //  let arr={
  //     "meetingId":{
  //       "__type": "Pointer",
  //       "className": "meeting",
  //       "objectId": frm.meetingId
  //     },
  //     "order":frm.order,
  //     "type":frm.type,
  //     "section": frm.section,
  //     "presentationPlace":frm.presentationPlace,
  //     "indianStaff":frm.indianStaff,
  //     "startTime":frm.startTime,
  //     "endTime":frm.endTime,
  //     "duration":frm.duration
  //  }
   //console.log(arr)
    return this.http.post(this.SERVER_URL,frm,{
      headers:new HttpHeaders({
      'Content-Type':'application/json',
      'X-Parse-Application-Id':this.APP_ID,
      'X-Parse-REST-API-Key':this.MASTER_KEY,
     })
   })
  }
  else{
  //   let arr={
  //     "meetingId":{
  //       "__type": "Pointer",
  //       "className": "meeting",
  //       "objectId": frm.meetingId
  //     },
  //     "order":frm.order,
  //     "section": frm.section,
  //     "type":frm.type,
  //     "presentationPlace":frm.presentationPlace,
  //     "indianStaff":frm.indianStaff,
  //     "startTime":frm.startTime,
  //     "endTime":frm.endTime,
  //     "duration":frm.duration
    
  //  } 
   this.SERVER_URL = environment.apiUrl+'/classes/activity/'+frm.objectId
   return this.http.put(this.SERVER_URL,frm,{
    headers:new HttpHeaders({
    'Content-Type':'application/json',
    'X-Parse-Application-Id':this.APP_ID,
    'X-Parse-REST-API-Key':this.MASTER_KEY,
   })
 })

  }

  }

  displayActivity(){

    return this.http.get(this.SERVER_URL,{
      headers:new HttpHeaders({
      'Content-Type':'application/json',
      'X-Parse-Application-Id':this.APP_ID,
      'X-Parse-REST-API-Key':this.MASTER_KEY,
     })
   })
  }


  deleteData(frm:any){
    this.SERVER_URL = environment.apiUrl+'/classes/activity/'+frm.objectId
    return this.http.delete(this.SERVER_URL,{
     headers:new HttpHeaders({
     'Content-Type':'application/json',
     'X-Parse-Application-Id':this.APP_ID,
     'X-Parse-REST-API-Key':this.MASTER_KEY,
    })
  })
  }

}
