import { Component, OnInit,ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router,Params,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent} from "ng-auto-complete";
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers:[UserService]
})
export class UserComponent implements OnInit {
  @ViewChild(NgAutocompleteComponent) public completer: NgAutocompleteComponent;
  public show:boolean = true;
  public reg:string="Register"
  APP_ID :string
  MASTER_KEY :string
  SERVER_URL : string
  docs:any
  SERVER_URL1 : string
  docs1:any
  SERVER_URL2 : string
  docs2:any
  unique:any
  locations:any
  designations:any;fname:string;
  lname:string;uname:string;objID1:string;des:string;pnumber:string;loc:string;dept=[];
  constructor(
    private user: UserService,
    private http: HttpClient,
    private toastr: ToastrService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.APP_ID = environment.APP_ID;
    this.MASTER_KEY =  environment.MASTER_KEY;
    this.SERVER_URL = environment.apiUrl+'/functions/user_tags'
        this.http.post(this.SERVER_URL,'',{
        headers:new HttpHeaders({
        'Content-Type':'application/json',
        'X-Parse-Application-Id':this.APP_ID,
        'X-Parse-REST-API-Key':this.MASTER_KEY,
      })
     }).subscribe(data => {
      //console.log(data)       
       this.docs=JSON.parse(data['result'])
       this.unique=this.docs.data
       //console.log(this.unique)
    })


    this.SERVER_URL1 = environment.apiUrl+'/functions/user_locations'
    this.http.post(this.SERVER_URL1,'',{
      headers:new HttpHeaders({
      'Content-Type':'application/json',
      'X-Parse-Application-Id':this.APP_ID,
      'X-Parse-REST-API-Key':this.MASTER_KEY,
    })
   }).subscribe(data1 => {
    //console.log(data1)       
   this.docs1=JSON.parse(data1['result'])
   this.locations=this.docs1.data
  
        //console.log(this.locations)
  })

  this.SERVER_URL2 = environment.apiUrl+'/functions/user_designations'
      this.http.post(this.SERVER_URL2,'',{
        headers:new HttpHeaders({
        'Content-Type':'application/json',
        'X-Parse-Application-Id':this.APP_ID,
        'X-Parse-REST-API-Key':this.MASTER_KEY,
      })
    }).subscribe(data2 => {
      //console.log(data2)       
    this.docs2=JSON.parse(data2['result'])
    this.designations=this.docs2.data
          //console.log(this.designations)
    })




    this.activatedRoute.params.subscribe((params: Params) => {
         //console.log(params)
         let objectId=params['objectId'];
         if(objectId!=null){
          this.show = !this.show;
          
          this.SERVER_URL = environment.apiUrl+'/users/'+objectId
          this.http.get(this.SERVER_URL,{
               headers:new HttpHeaders({
                'Content-Type':'application/json',
                'X-Parse-Application-Id':this.APP_ID,
                'X-Parse-REST-API-Key':this.MASTER_KEY,
                'X-Parse-Revocable-Session':'1'
            })
            }).subscribe(data => {
                //console.log(data)       
                  this.reg="Update"                      
                  this.fname=data['firstName']
                  this.lname=data['lastName']
                  this.uname=data['username']
                  this.objID1=data['objectId']
                  this.des=data['designation']
                  this.pnumber=data['phoneNumber']
                 this.loc=data['location']
                 this.dept=data['tags']
                
           },err=>{
            if(err.error.code==101){
              this.router.navigate(['/viewUsers'])
            } 
            console.log(err)
          })
          }

    });



   }

  

  ngOnInit() {
  }

  register(frm:any){
    let arrr=[];
    //console.log(frm.tags)
    for(var i=0;i<frm.tags.length;i++){
        if(frm.tags[i].value){
          arrr.push(frm.tags[i].value);
        } 
        else{
          arrr.push(frm.tags[i]);
        } 
      
    }
    let arr={
      "firstName":frm.firstName,
      "lastName": frm.lastName,
      "username":frm.username,
      "email":frm.username,
      "password":frm.password,
      "initialPassword":frm.password,
      "designation":frm.designation,
      "phoneNumber":frm.phoneNumber,
      "location":frm.location,
      "tags":arrr,
      "isAdmin":false,
      "userStatus":"Accepted"
      
   } 
    //console.log(arr);
    if(frm.objectId==null || frm.objectId===undefined){
      //console.log(frm)
      this.user.saveData(arr).subscribe(
        res=>{
          console.log(res)
                },
        err=>{
          this.toastr.error(err.error['error']);     
          console.log(err)},
        ()=>{
         //console.log("record saved")
          //send mail functionality
          
         this.router.navigate(['/viewUsers']);
         this.toastr.success('New Record Added Successfully');
         })
         var body="<h1>Welcome to Alicon</h1><br><ul>";
         body+="<li><b>Name:</b> "+frm.firstName+" "+frm.lastName+"</li>";
         body+="<li><b>Email:</b>"+frm.username+"</li>";
         body+="<li><b>Password</b>"+frm.password+"</li>";
         body+="<li><b>Designation</b>"+frm.designation+"</li></ul><br/><br/><br/>";
         body+="<p>Here Login with mobile app :-<a target='_blank' href='#'>Reset Password</a></p>"

     console.log(body)
     var data={
         "SentTo":frm.username,
         "body":body
     }
     this.SERVER_URL = "http://localhost:3000/send1"
     return this.http.post(this.SERVER_URL,data,{
     headers:new HttpHeaders({
     'Content-Type':'application/json',
       
     })
   }).subscribe(
     res=>console.log(res),
     err=>{
       this.toastr.error(err.error['error']);     
       console.log(err)},
     ()=>{          // this.toastr.success('Mail sent Successfully');
     }) 
         

 
    }else{
      let arr={
        "firstName":frm.firstName,
        "lastName": frm.lastName,
        "email":frm.username,
        "password":frm.password,
        "initialPassword":frm.password,
        "objectId":frm.objectId,
        "designation":frm.designation,
        "phoneNumber":frm.phoneNumber,
        "location":frm.location,
        "tags":arrr,
       "isAdmin":false,
       "userStatus":"Accepted"
      } 
      //console.log(arr);
      this.user.saveData(arr).subscribe(
        res=>console.log(res),
        err=>console.log(err),
        ()=>{
          //console.log("record updated")
          //this.meeting.showMeeting();
          this.router.navigate(['/viewUsers']);
          this.toastr.success('Record Updated Successfully');
        }
      )
    }

  }

  cancel(){
    this.router.navigate(['/viewUsers']);
  }
 

  
  abc1(event){
    console.log('mouse enter')
    console.log(event.target.value)
    this.dept=event.target.value
  }


}
