import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router,Params,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers:[UserService]
})
export class UserComponent implements OnInit {

  constructor(
    private user: UserService,
    private http: HttpClient,
    private toastr: ToastrService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  register(frm:any){
    let arrr=[];
    console.log(this.words2)
    for(var i=0;i<this.words2.length;i++){
        arrr.push(this.words2[i].value);
    }
    let arr={
      "firstName":frm.firstName,
      "lastName": frm.lastName,
      "username":frm.username,
      "password":frm.password,
      "tags":arrr
    
   } 
    console.log(arr);
    if(frm.objectId==null){
      console.log(frm)
      this.user.saveData(arr).subscribe(
        res=>{
          console.log(res)
                },
        err=>console.log(err),
        ()=>{
         console.log("record saved")
         this.router.navigate(['/viewUsers']);
         this.toastr.success('New Record Added Successfully','User Register');
         })
 
    }else{
      let arr={
        "firstName":frm.firstName,
        "lastName": frm.lastName,
        "username":frm.username,
        "password":frm.password,
        "tags":arrr
      
     } 
      console.log(frm.objectId);
      this.user.saveData(arr).subscribe(
        res=>console.log(res),
        err=>console.log(err),
        ()=>{
          console.log("record updated")
          //this.meeting.showMeeting();
          this.router.navigate(['/viewUsers']);
          this.toastr.success('New Record Updated Successfully','User Register');
          
        }
      )
    }

  }

 

words2 = [{value: ''}];;
  
add() {
  //var newNo=this.words2.length + 1;
  this.words2.push({value: ''});
}
removeNewChoice(){
  var newNo=this.words2.length -1;
  if(newNo !== 0){
    this.words2.pop();
  }
}



}
