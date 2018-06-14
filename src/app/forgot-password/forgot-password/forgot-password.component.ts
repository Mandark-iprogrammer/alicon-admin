import { Component, OnInit,ViewChild } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router,Params,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent} from "ng-auto-complete";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  objID1:string
  APP_ID :string
  MASTER_KEY :string
  SERVER_URL : string
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public router: Router,
    private activatedRoute: ActivatedRoute) { 
      this.APP_ID = environment.APP_ID;
      this.MASTER_KEY =  environment.MASTER_KEY;
      
      this.activatedRoute.params.subscribe((params: Params) => {
        this.objID1=params['objectId'];
        
  });
  }

  ngOnInit() {
  }

  onLoggedin(frm : any){
    console.log(frm)
    var data = {"password" : frm.password };

    this.SERVER_URL = environment.apiUrl+'/users/'+frm.objectId
    return this.http.put(this.SERVER_URL,data,{
     headers:new HttpHeaders({
     'Content-Type':'application/json',
     'X-Parse-Application-Id':this.APP_ID,
     'X-Parse-Master-Key':this.MASTER_KEY,
    })
  }).subscribe(
    res=>console.log(res),
    err=>console.log(err),
    ()=>{
      this.router.navigate(['/thank-you']);
      //this.toastr.success('Password Changed Successfully');
    })

  }

}
