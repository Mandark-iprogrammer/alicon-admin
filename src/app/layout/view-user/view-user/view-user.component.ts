import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
  providers:[UserService]
})
export class ViewUserComponent implements OnInit {
  docs: any
  constructor(
    private user : UserService,
    private toastr: ToastrService,
    public router: Router
  ) { 
    this.user.displayUser().subscribe(data => {
      console.log(data) 
      this.docs=data['results'];
     
    })


  }

  ngOnInit() {
  }

  Onedit(_id:string)
  {
    console.log(_id)
    this.router.navigate(['/User',{ 'objectId': _id}]);
  }

  Ondelete(id:string){
    var result=confirm('Are you sure want to delete a record?')
    if(result){
    console.log(id)
    this.user.deleteUsers(id).subscribe(
      res=>console.log(res),
      err=>console.log(err),
      ()=>{
        console.log("record deleted")
        this.user.displayUser();
        //this.router.navigate(['/viewUser']);
        this.toastr.success('New Record deleted Successfully','User Register');
      }
    )
  }
  else{
    this.router.navigate(['/viewUser']);
  }
  }

  chPwd(_id:string)
  {
    console.log(_id)
    this.router.navigate(['/changePwd',{ 'objectId': _id}]);
  }

}
