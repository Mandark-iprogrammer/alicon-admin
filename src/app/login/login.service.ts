import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {
  APP_ID : string
  MASTER_KEY:string
  SERVER_URL:string
  
  constructor(
    private http: HttpClient
  ) {
      this.APP_ID = "ObQCLvdrqRekAzP7LWcZYPmzMYIDEALOGRPAALICON"

     this.MASTER_KEY = "ErgFlrkodmUKTHVnRh0vJ8LzzVboP9VXUGmkALICON"
    
     this.SERVER_URL = "http://192.168.151.156:1337/alicon/parse"

   }
    
  checkLogin(frm:any){
    console.log(frm)
    

  }

}
