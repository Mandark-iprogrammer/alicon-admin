import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


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
    this.APP_ID = "ObQCLvdrqRekAzP7LWcZYPmzMYIDEALOGRPAALICON"
      this.MASTER_KEY = "ErgFlrkodmUKTHVnRh0vJ8LzzVboP9VXUGmkALICON"
      this.SERVER_URL = 'http://192.168.151.156:1337/alicon/parse/classes/meeting'

      
   }

  saveData(frm : any){

    if(frm.objectId==null){
   
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
      "meetingDate":{
        "__type":"Date",
        "iso":new Date(frm.meetingDate).toISOString()
    }
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


  publishData(frm : any){
    if(frm.objectId==null){
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
    this.SERVER_URL = 'http://192.168.151.156:1337/alicon/parse/classes/meeting?order=-createdAt'
    return this.http.get(this.SERVER_URL,{
      headers:new HttpHeaders({
      'Content-Type':'application/json',
      'X-Parse-Application-Id':this.APP_ID,
      'X-Parse-REST-API-Key':this.MASTER_KEY,
     })
   })
  }

  deleteMeeting(obj : string){

    this.SERVER_URL = 'http://192.168.151.156:1337/alicon/parse/classes/meeting/'+obj
    return this.http.delete(this.SERVER_URL,{
     headers:new HttpHeaders({
     'Content-Type':'application/json',
     'X-Parse-Application-Id':this.APP_ID,
     'X-Parse-REST-API-Key':this.MASTER_KEY,
    })
  })

  }


}
