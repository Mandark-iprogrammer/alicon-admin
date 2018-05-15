import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
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
      var a=this.formatISO(frm.startTime.hour,frm.startTime.minute);  
      var b=this.formatISO(frm.endTime.hour,frm.endTime.minute)
      console.log(a)
      console.log(b)
      var d1 = new Date(a); // 10:09 to
      var d2 = new Date(b); // 10:20 is 11 mins
      var diff = d2 - d1;
      if (diff > 60e3) {
        var c=Math.floor(diff / 60e3)
      }
        console.log(c)
    
    
   let arr={
      "meetingId":{
        "__type": "Pointer",
        "className": "meeting",
        "objectId": frm.meetingId
      },
      "order":frm.order,
      "type":frm.type,
      "section": frm.section,
      "presentationPlace":frm.presentationPlace,
      "indianStaff":frm.indianStaff,
      "startTime1":{
        "__type":"Date",
        "iso":a
      },
      "endTime1":{
        "__type":"Date",
        "iso":b
      },
      "duration":c,
      "subType":frm.subType
   }
   console.log(arr)
    return this.http.post(this.SERVER_URL,arr,{
      headers:new HttpHeaders({
      'Content-Type':'application/json',
      'X-Parse-Application-Id':this.APP_ID,
      'X-Parse-REST-API-Key':this.MASTER_KEY,
     })
   })
  }
  else{
    var a=this.formatISO(frm.startTime.hour,frm.startTime.minute);  
    var b=this.formatISO(frm.endTime.hour,frm.endTime.minute)
    console.log(a)
      console.log(b)
      var d1 = new Date(a); // 10:09 to
      var d2 = new Date(b); // 10:20 is 11 mins
      var diff = d2 - d1;
      if (diff > 60e3) {
        var c=Math.floor(diff / 60e3)
      }
        console.log(c)
    let arr={
      "meetingId":{
        "__type": "Pointer",
        "className": "meeting",
        "objectId": frm.meetingId
      },
      "order":frm.order,
      "section": frm.section,
      "type":frm.type,
      "presentationPlace":frm.presentationPlace,
      "indianStaff":frm.indianStaff,
      "startTime1":{
        "__type":"Date",
        "iso":a
      },
      "endTime1":{
        "__type":"Date",
        "iso":b
      },
      "duration":c,
      "subType":frm.subType
    
   } 
   this.SERVER_URL = environment.apiUrl+'/classes/activity/'+frm.objectId
   return this.http.put(this.SERVER_URL,arr,{
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

  formatISO(hour,minute) {
    var hours = hour;
    var minutes = minute;
     
    var dateiso=new Date('2018-05-01'+' '+hours+':'+minutes+':'+'00').toISOString();
    return dateiso;
    
    }
  
   



}
