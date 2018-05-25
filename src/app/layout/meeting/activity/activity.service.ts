import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Type } from './type';
import { Sub } from './subtype';
@Injectable()
export class ActivityService {
  APP_ID :string
  MASTER_KEY :string
  SERVER_URL : string
  SERVER_URL1 : string
  SERVER_URL3 : string
  objectId:any
  d1:any
  msg:string
  d2:any
  constructor(
    private http:HttpClient
  ) { 

    this.APP_ID = environment.APP_ID;
    this.MASTER_KEY =  environment.MASTER_KEY;
    this.SERVER_URL =  environment.apiUrl+'/classes/activity'

  }



  saveData(frm : any){
    if(frm.objectId=="null" || frm.objectId=="" || frm.objectId===undefined){
      var a=this.formatISO(frm.startTime.hour,frm.startTime.minute);  
      var b=this.formatISO(frm.endTime.hour,frm.endTime.minute)
      var stttTime=this.formatAMPM(frm.startTime.hour,frm.startTime.minute)
      var edddTime=this.formatAMPM(frm.endTime.hour,frm.endTime.minute)
    //  console.log(a)
    //  console.log(b)
      this.d1 = new Date(a); // 10:09 to
      this.d2 = new Date(b); // 10:20 is 11 mins
      var diff = this.d2 - this.d1;
      if (diff > 60e3) {
        var c=Math.floor(diff / 60e3)
      }
     //   console.log(c)
    
    
   let arr={
      "meetingId":{
        "__type": "Pointer",
        "className": "meeting",
        "objectId": frm.meetingId
      },
      "sequenceNumber":frm.order,
      "type":frm.type,
      "section": frm.section,
      "presentationPlace":frm.presentationPlace,
      "indianStaff":frm.indianStaff,
      "startTime":stttTime,
      "endTime":edddTime,
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
  // console.log(arr)
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
    var stttTime=this.formatAMPM(frm.startTime.hour,frm.startTime.minute)
    var edddTime=this.formatAMPM(frm.endTime.hour,frm.endTime.minute)
   // console.log(a)
  //    console.log(b)
      this.d1 = new Date(a); // 10:09 to
      this.d2 = new Date(b); // 10:20 is 11 mins
      diff = this.d2 - this.d1;
      if (diff > 60e3) {
        var c=Math.floor(diff / 60e3)
      }
      // if(b<a){
      //   this.msg ='Please Enter end time is greater than start time';
      //   return this.msg; 
      // }
   //     console.log(c)
    let arr={
      "meetingId":{
        "__type": "Pointer",
        "className": "meeting",
        "objectId": frm.meetingId
      },
      "sequenceNumber":frm.order,
      "section": frm.section,
      "type":frm.type,
      "startTime":stttTime,
      "endTime":edddTime,
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
   this.SERVER_URL1 = environment.apiUrl+'/classes/activity/'+frm.objectId
   return this.http.put(this.SERVER_URL1,arr,{
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
    this.SERVER_URL3 = environment.apiUrl+'/classes/activity/'+frm.objectId
    return this.http.delete(this.SERVER_URL3,{
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
    formatAMPM(hour,minute) {
      var hours = hour;
      var minutes = minute;
     // console.log(minutes);
  
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      //minutes=minutes%10;
     
      if(minutes=="00"){
        minutes="00"  
      }
      else {
        minutes = minutes < 10 ? '0'+minutes : minutes;
      }
    
      hours = hours < 10 ? '0'+hours : hours;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }



    getCountries() {
      return [
        new Type('Presentation'),
        new Type('Travel'),
        new Type('Q&A'),
        new Type('Break')
      ];
    }

    getStates() {
      return [
     
        new Sub('Presentation','Presentation' ),
       

        new Sub('Travel', 'Car' ),
        new Sub('Travel', 'Walk' ),
        new Sub('Travel', 'Auto' ),

        new Sub('Q&A', 'Q&A'),

        new Sub('Break', 'Lunch'),
        new Sub('Break', 'Tea'),
       
       ];
     }
   
}
