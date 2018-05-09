import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';


@Injectable()
export class MeetingService {
  objectID:string
  APP_ID :string
  MASTER_KEY :string
  SERVER_URL : string
  objectId:any
  constructor(
    private http:HttpClient
  ) {
    this.objectID=localStorage.getItem('objectId');
    console.log(this.objectID)
    this.APP_ID = environment.APP_ID;
    this.MASTER_KEY =  environment.MASTER_KEY;
    this.SERVER_URL = environment.apiUrl+'/classes/meeting'
 }
  saveData(frm : any){

    if(frm.objectId==null){


      var a=this.formatAMPM(frm.startTime.hour,frm.startTime.minute);
    console.log(a)

      let arrr=[];
      // console.log(frm.tags)
      // for(var i=0;i<frm.tags.length;i++){
      //     arrr.push(frm.tags[i].value);
      // }
    let arr={
      "name":frm.name,
      "description": frm.description,
      "remark":frm.remark,
      "venue":frm.venue,
      "createdBy":{
        "__type": "Pointer",
        "className": "_User",
        "objectId": this.objectID
      },
      "isPublished":frm.isPublished,
      "startTime":a,
      // "startDate":{
      //     "__type":"Date",
      //     "iso":new Date(frm.startDate).toISOString()
      // },
      "meetingDate":{
        "__type":"Date",
        "iso":new Date(frm.meetingDate).toISOString()
    },
    //"tags":arrr
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
    var a=this.formatAMPM(frm.startTime.hour,frm.startTime.minute);
    console.log(a)
    let arrr=[];
    // console.log(frm.tags)
    // for(var i=0;i<frm.tags.length;i++){
    //     arrr.push(frm.tags[i].value);
    // }
    let arr={
      
      "name":frm.name,
      "description": frm.description,
      "remark":frm.remark,
      "venue":frm.venue,
      "createdBy":{
        "__type": "Pointer",
        "className": "_User",
        "objectId":this.objectID
      },
      "isPublished":frm.isPublished,
      "startTime":a,
      // "startDate":{
      //     "__type":"Date",
      //     "iso":new Date(frm.startDate).toISOString()
      // },
      "meetingDate":{
        "__type":"Date",
        "iso":new Date(frm.meetingDate).toISOString()
    },
   // "tags":arrr
    
   } 
   this.SERVER_URL = environment.apiUrl+'/classes/meeting/'+frm.objectId
   return this.http.put(this.SERVER_URL,arr,{
    headers:new HttpHeaders({
    'Content-Type':'application/json',
    'X-Parse-Application-Id':this.APP_ID,
    'X-Parse-REST-API-Key':this.MASTER_KEY,
   })
 })

  }



  }


  publishData(frm : any){
    if(frm.objectId==null){
      if(frm.isPublished==""){
        frm.isPublished=false;
      }
   let arr={
      "name":frm.name,
      "description": frm.description,
      "remark":frm.remark,
      "venue":frm.venue,
      "createdBy":{
        "__type": "Pointer",
        "className": "_User",
        "objectId": this.objectID
      },
      "startTime":frm.startTime,
      "startDate":{
          "__type":"Date",
          "iso":new Date(frm.startDate).toISOString()
      },
      "isPublished":true,
      "meetingDate":{
        "__type":"Date",
        "iso":new Date(frm.meetingDate).toISOString()
    }
   }
   //console.log(arr)
    return this.http.post(this.SERVER_URL,arr,{
      headers:new HttpHeaders({
      'Content-Type':'application/json',
      'X-Parse-Application-Id':this.APP_ID,
      'X-Parse-REST-API-Key':this.MASTER_KEY,
     })
   })
  }
  else{
    if(frm.isPublished==""){
      frm.isPublished=false;
    }
    
    let arr={
      "name":frm.name,
      "description": frm.description,
      "remark":frm.remark,
      "venue":frm.venue,
      "createdBy":{
        "__type": "Pointer",
        "className": "_User",
        "objectId": this.objectID
      },
      "isPublished":true,
      "startTime":frm.startTime,
      "startDate":{
          "__type":"Date",
          "iso":new Date(frm.startDate).toISOString()
      },
      "meetingDate":{
        "__type":"Date",
        "iso":new Date(frm.meetingDate).toISOString()
    }
    
   } 
   this.SERVER_URL = 'http://192.168.151.156:1337/alicon/parse/classes/meeting/'+frm.objectId
   return this.http.put(this.SERVER_URL,arr,{
    headers:new HttpHeaders({
    'Content-Type':'application/json',
    'X-Parse-Application-Id':this.APP_ID,
    'X-Parse-REST-API-Key':this.MASTER_KEY,
   })
 })

  }



  }

  displayMeeting(){
    this.SERVER_URL = environment.apiUrl+'/classes/meeting?order=-createdAt'
    return this.http.get(this.SERVER_URL,{
      headers:new HttpHeaders({
      'Content-Type':'application/json',
      'X-Parse-Application-Id':this.APP_ID,
      'X-Parse-REST-API-Key':this.MASTER_KEY,
     })
   })
  }

  deleteMeeting(obj : string){

    this.SERVER_URL = environment.apiUrl+'classes/meeting/'+obj
    return this.http.delete(this.SERVER_URL,{
     headers:new HttpHeaders({
     'Content-Type':'application/json',
     'X-Parse-Application-Id':this.APP_ID,
     'X-Parse-REST-API-Key':this.MASTER_KEY,
    })
  })

  }

  formatAMPM(hour,minute) {
    var hours = hour;
    var minutes = minute;
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    hours = hours < 10 ? '0'+hours : hours;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
}
