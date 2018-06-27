import { Component, OnInit,Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-forgot-admin',
  templateUrl: './forgot-admin.component.html',
  styleUrls: ['./forgot-admin.component.scss']
})
export class ForgotAdminComponent implements OnInit {
  email:string;
  APP_ID : string
    MASTER_KEY:string
    SERVER_URL:string
    token:string
    docs:any
    @Output() username:string;
    @Output() objectId:string;
    constructor(
    public router: Router,
    private http:HttpClient,
    private toastr: ToastrService) {}

  ngOnInit() {
  }
  onForgot(frm:any){
    console.log(frm.username)

    
        this.APP_ID = environment.APP_ID;
        this.MASTER_KEY =  environment.MASTER_KEY;
        this.SERVER_URL = environment.apiUrl+'/users?where={"username":"'+frm.username+'","isAdmin":true}'
        this.http.get(this.SERVER_URL,{
            headers:new HttpHeaders({
             'Content-Type':'application/json',
             'X-Parse-Application-Id':this.APP_ID,
             'X-Parse-REST-API-Key':this.MASTER_KEY,
             'X-Parse-Revocable-Session':'1'
         })
         }).subscribe(
            res=>{
                this.docs=res['results']
                
                if(this.docs.length>0){
                  console.log(this.docs)
                  this.docs.forEach(element => {
                    var data={
                        "email":element.username,
                    }
                    this.SERVER_URL = environment.apiUrl+'/functions/forgot'
                    return this.http.post(this.SERVER_URL,data,{
                     headers:new HttpHeaders({
                      'Content-Type':'application/json',
                      'X-Parse-Application-Id':this.APP_ID,
                      'X-Parse-REST-API-Key':this.MASTER_KEY,
                      'X-Parse-Revocable-Session':'1'
                
                    })
                  }).subscribe(
                    res=>console.log(res),
                    err=>console.log(err),
                    ()=>{
                      //this.router.navigate(['/forgotSuccess']);
                      this.toastr.success('We have sent a reset password link to your registered email address.');
                      setTimeout(this.login.bind(this),4000);
                      this.email="";
                    })    
                });
                }
                else{
                  this.toastr.error('This email is not admin');
                  this.email="";
                }
                
                   // var body="<h1>Alicon Forgot Password</h1><a target='_blank' href='http://localhost:4200/forgot/"+res['objectId']+"/"+this.token+"'>Reset Password</a>";
                   // console.log(body)
               
            },
            err=>{
                console.log(err)
                console.log(err.error['error'])
               // this.router.navigate(['/login']);
                this.toastr.error(err.error['error']);
            },
            ()=>{
                          
            }
         );
  }

  login(){
    this.router.navigate(['/login']);
  }

}
