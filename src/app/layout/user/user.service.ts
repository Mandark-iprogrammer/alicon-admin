import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class UserService {
  APP_ID :string
  MASTER_KEY :string
  SERVER_URL : string
  sessionToken : string
  constructor(
    private http:HttpClient
  ) {
    this.APP_ID = environment.APP_ID;
    this.MASTER_KEY =  environment.MASTER_KEY;
    this.SERVER_URL = environment.apiUrl+'/users'
    this.sessionToken=localStorage.getItem('sessionToken')
    console.log(this.sessionToken)
  }


  displayUser(){

    return this.http.get(this.SERVER_URL,{
      headers:new HttpHeaders({
      'Content-Type':'application/json',
      'X-Parse-Application-Id':this.APP_ID,
      'X-Parse-REST-API-Key':this.MASTER_KEY,
     })
   })
  }

  deleteUsers(obj : string){

    this.SERVER_URL = environment.apiUrl+'/users/'+obj
    return this.http.delete(this.SERVER_URL,{
     headers:new HttpHeaders({
     'Content-Type':'application/json',
     'X-Parse-Application-Id':this.APP_ID,
     'X-Parse-REST-API-Key':this.MASTER_KEY,
    })
  })

  }

  saveData(frm : any){
    if(frm.objectId==null){
  //  let arr={
  //   "firstName":frm.firstName,
  //   "lastName": frm.lastName,
  //   "username":frm.username,
  //   "password":frm.password
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
    
   this.SERVER_URL = environment.apiUrl+'/users/'+frm.objectId
   return this.http.put(this.SERVER_URL,frm,{
    headers:new HttpHeaders({
    'Content-Type':'application/json',
    'X-Parse-Application-Id':this.APP_ID,
    'X-Parse-REST-API-Key':this.MASTER_KEY,
    'X-Parse-Session-Token':this.sessionToken
   })
 })

  }



  }
 

}
