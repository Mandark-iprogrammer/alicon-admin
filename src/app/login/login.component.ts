import { Component, OnInit,Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { LoginService } from './login.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()],
    providers:[LoginService]
})
export class LoginComponent implements OnInit {
    APP_ID : string
    MASTER_KEY:string
    SERVER_URL:string
    docs:any
    @Output() username:string;
    @Output() objectId:string;
    constructor(
    public router: Router,
    private lgn: LoginService,
    private http:HttpClient,
    private toastr: ToastrService) {}

    ngOnInit() {}

    onLoggedin(frm:any) {
        console.log(frm.username)
        this.APP_ID = environment.APP_ID;
        this.MASTER_KEY =  environment.MASTER_KEY;
        this.SERVER_URL = environment.apiUrl+"/login?username="+frm.username+"&password="+frm.password
        // this.APP_ID = "129837njlasdjfpoia2p83u4jnlkj"
        // this.MASTER_KEY = "Elkl1j23l809uljn3lkj48unkjnkjh4234"
        // this.SERVER_URL = "http://13.126.191.252:1337/parse/login?username="+frm.username+"&password="+frm.password
       // "http://192.168.151.156:1337/alicon/parse/login?username="+frm.username+"&password="+frm.password
        
         this.http.get(this.SERVER_URL,{
           headers:new HttpHeaders({
            'Content-Type':'application/json',
            'X-Parse-Application-Id':this.APP_ID,
            'X-Parse-REST-API-Key':this.MASTER_KEY,
            'X-Parse-Revocable-Session':'1'
        })
        }).subscribe(
            res=>{
                console.log(res)
                if(res['username']==frm.username){
                    localStorage.setItem('isLoggedin', 'true');
                    localStorage.setItem('username',frm.username);
                    localStorage.setItem('objectId',res['objectId']);
                    localStorage.setItem('sessionToken',res['sessionToken']);
                    this.username=frm.username;
                    this.objectId=res['objectId'];   
                    this.router.navigate(['/viewUsers']);
                    this.toastr.success('Logged in Successfully');
                }
            },
            err=>{
                console.log(err)
                console.log(err.error['error'])
                this.router.navigate(['/login']);
                this.toastr.error(err.error['error']);
            },
            ()=>{
                          
            })
              
    }
}
