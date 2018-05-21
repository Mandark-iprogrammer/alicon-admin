import { Component, OnInit,OnChanges } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivityService } from './activity.service';
import { ToastrService } from 'ngx-toastr';
import { Router,Params,ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import {NgbModal, ModalDismissReasons,NgbModalRef, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Sub } from './subtype';
import { Type } from './type';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  providers:[ActivityService,NgbModal,NgbActiveModal]
})
export class ActivityComponent implements OnInit {
  notFound: string;
  public show:boolean = true;
  public show1:boolean = true;
  public add_edit:boolean = false;
  public showCancel:boolean=false;
  public Msg = "Save"
  APP_ID :string
  activityStaff:any
  place:any
  source: any;
  act=[];
  pp=[];
  MASTER_KEY :string
  SERVER_URL : string
  SERVER_URL1 : string
  docs4:any
  docs:any
  docs1:any     
  docs2:any
  closeResult:any;
  docs3:any;
  sutype=[];
  subtyp_old:string;
  nm:string;sttTime:string;
  time1:any;time2:any;
  msg:string;
  countries:any;
  suype: any;
  err:any;
  modalReference: NgbModalRef;
  desc:string;remk:string;createby:string;objID1:string;ven:string;stTime:string;stDate:string;mtDate:string;isPublish:boolean
  ord:number;sec:string;objID2:string;pplace:string;staffname:string;edTime:string;dur:string;typ:string;subtyp:string
  constructor(
    private http: HttpClient,
    private activity: ActivityService,
    public router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private actModel: NgbActiveModal,
  ) {

    this.APP_ID = environment.APP_ID;
    this.MASTER_KEY =  environment.MASTER_KEY;
    this.SERVER_URL =  environment.apiUrl+'/classes/activity'
   
   // this.ngOnInit();
   this.countries = this.activity.getCountries();
    console.log(this.countries)
   this.ngOnChanges();


  //     aunto complete activity staff

  this.SERVER_URL1 = environment.apiUrl+'/functions/activity_staff'
  this.http.post(this.SERVER_URL1, '', {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': this.APP_ID,
      'X-Parse-REST-API-Key': this.MASTER_KEY,
    })
  }).subscribe(data4 => {
    this.docs4 = JSON.parse(data4['result'])
  //  console.log(this.docs4)
    this.activityStaff = this.docs4.data
   // console.log(JSON.stringify(this.activityStaff))
   // console.log(this.activityStaff)
    this.activityStaff.forEach(element => {
        this.act.push({"indianStaff":element})
    });
    
    console.log(this.act)
  })

  // Presentation Place
  this.SERVER_URL1 = environment.apiUrl+'/functions/activity_presentation_places'
  this.http.post(this.SERVER_URL1, '', {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': this.APP_ID,
      'X-Parse-REST-API-Key': this.MASTER_KEY,
    })
  }).subscribe(data3 => {
    this.docs3 =  JSON.parse(data3['result'])
  //  console.log(this.docs3.data)
   this.place=this.docs3.data
   console.log(this.place)
   this.place.forEach(element1 => {
    this.pp.push({"presentationPlace":element1})
      });
      console.log(this.pp);
  })


    
   }
  
  doSomething(oldVal, newVal) {
    // some code
    //console.log(oldVal)
    this.subtyp=newVal;
    //console.log(newVal=)
  }

  ngOnInit() {
    //this.sutype.length=0;
  }
  ngOnChanges(){
    
    



    this.activatedRoute.params.subscribe((params: Params) => {
      // console.log(params)
       let userId = params['meetingId'];
       let objectId=params['objectId'];
       this.objID1=params['objectId'];
      // console.log(userId);
      
 
     if(objectId){
     this.SERVER_URL =  environment.apiUrl+'/classes/activity?where={"meetingId":{"__type":"Pointer","className":"meeting","objectId":"'+objectId+'"}}'
     this.http.get(this.SERVER_URL,{
          headers:new HttpHeaders({
           'Content-Type':'application/json',
           'X-Parse-Application-Id':this.APP_ID,
           'X-Parse-REST-API-Key':this.MASTER_KEY,
           'X-Parse-Revocable-Session':'1'
       })
       }).subscribe(data1 => {
         if(data1['results'].length==0){
           this.notFound="No Activity has been Created yet.";
          // this.ngOnInit();
         }
         else{
           this.notFound="";
          // this.ngOnInit();
           console.log(data1)       
           this.docs2=data1['results']
           console.log(this.docs2)
          
           this.docs2.forEach(element => {
               if(element['startTime1']){
              //   console.log(element['startTime1']['iso'])
                 element['startTime1']=this.formatAMPM(element['startTime1']['iso'])
                  element['endTime1']=this.formatAMPM(element['endTime1']['iso'])
               }
               if(element['presentationPlace']===""){
                 element['presentationPlace']="-";
               }
               if(element['indianStaff']===""){
                 element['indianStaff']="-";
               }
           });
         } 
       });
       
   }
 
 
     });
  }



  dataformat(date1:string){
    let date = new Date(date1);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    var dt = date.getDate();
    return dt+'/'+month+'/'+year; 
  }


  Onedit(_id:string,content)
  {
    this.modalReference =this.modalService.open(content, { size: 'lg' ,centered: true});
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.ord=null;
    this.sec="";
     this.objID2="";
     this.pplace="";
     this.staffname="";
     this.sttTime="";
     this.edTime="";
     this.time1="";
     this.time2="";
    this.dur=""
    this.msg=""
    this.typ=""
    this.subtyp="" 
      
    }, (reason) => {
      this.closeResult = `Dismissed`;
      this.ord=null;
      this.sec="";
       this.objID2="";
       this.pplace="";
       this.staffname="";
       this.sttTime="";
       this.edTime="";
       this.time1="";
       this.time2="";
      this.dur=""
      this.msg=""
      this.typ=""
      this.subtyp="" 
      
    })
    this.showCancel=true;
    this.add_edit=true; 
    this.Msg="Update"; 
    console.log(_id)
   
    this.SERVER_URL =  environment.apiUrl+'/classes/activity/'+_id
    this.http.get(this.SERVER_URL,{
         headers:new HttpHeaders({
          'Content-Type':'application/json',
          'X-Parse-Application-Id':this.APP_ID,
          'X-Parse-REST-API-Key':this.MASTER_KEY,
          'X-Parse-Revocable-Session':'1'
      })
      }).subscribe(data => {
          console.log(data)       
         // this.docs=data
         // console.log(this.docs)
             //data['startDate']=this.dataformat(data['startDate']['iso'])
             //data['meetingDate']=this.dataformat(data['meetingDate']['iso'])
             this.show1 = !this.show1; 
             this.show = !this.show; 
            this.ord=data['sequenceNumber']
            this.sec=data['section']
            this.objID2=data['objectId']
            this.pplace=data['presentationPlace']
            this.staffname=data['indianStaff']
            this.sttTime=this.formatAMPM(data['startTime1']['iso'])
            this.edTime=this.formatAMPM(data['endTime1']['iso'])
            this.time1=this.convertTime12to24(data['startTime1']['iso'])
            this.time2=this.convertTime12to24(data['endTime1']['iso'])
           this.dur=data['duration']
           this.typ=data['type']
           this.subtyp=data['subType']
           this.subtyp_old=data['subType']
           this.suype = this.activity.getStates().filter((item)=> item.type == this.typ);
           console.log(this.suype) ;
           //this.onSelect(this.typ)
          // this.subtyp="";
          // this.subtype1(this.typ)
           
     })
    //this.meeting.objectId=Object.assign({},_id);
   // this.router.navigate(['/activity',{'objectId': _id}]);
  }

  onSelect(countryid) {
    
    this.subtyp=null;
    this.suype = this.activity.getStates()
                 .filter((item)=> item.type == countryid);
                 console.log(this.suype) ;
                
  }
  
  openLg(content) {
    this.Msg="Save";
    this.modalReference =this.modalService.open(content, { size: 'lg' ,centered: true});
    this.modalReference.result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    this.ord=null;
    this.sec="";
     this.objID2="";
     this.pplace="";
     this.staffname="";
     this.sttTime="";
     this.edTime="";
     this.time1="";
     this.time2="";
    this.dur=""
    this.typ=""
    this.msg=""
    this.subtyp="" 
      console.log(this.closeResult)
    }, (reason) => {
      this.closeResult = `Dismissed`;
      console.log(this.closeResult)
    })
  }

  registerActivity(frm:any){
    console.log(frm)
    var a=this.formatISO(frm.startTime.hour,frm.startTime.minute);  
    var b=this.formatISO(frm.endTime.hour,frm.endTime.minute)
    if(a>b){
      
        this.toastr.error('End time should be greater than start time');
        return false;
      
    }

    if(frm.objectId=="null" || frm.objectId=="" || frm.objectId===undefined){
     
      console.log(frm)
      this.activity.saveData(frm).subscribe(
        res=>{
          console.log(res);
          //this.router.navigate(['/activity',{ 'objectId': res['objectId'],'meetingId':this.objID1}]);
        },
        err=>console.log(err),
        ()=>{
          
         console.log("record saved")
          //this.meeting.showMeeting();
         // this.ngOnInit();
         this.ngOnChanges();
       
          this.toastr.success('New Record Added Successfully');
          this.modalReference.close();
         
        }
      )
  
    }else{
      var a=this.formatISO(frm.startTime.hour,frm.startTime.minute);  
      var b=this.formatISO(frm.endTime.hour,frm.endTime.minute)
      if(a>b){
        
          this.toastr.error('End time should be greater than start time');
          return false;
        
      }
      console.log(frm.objectId);
      console.log(frm);
    
      this.activity.saveData(frm).subscribe(
        res=>console.log(res),
        err=>console.log(err),
        ()=>{
          console.log("record updated")
          //this.meeting.showMeeting();
          //this.router.navigate(['/viewActivity']);
          this.ngOnChanges();
          this.toastr.success('New Record Updated Successfully');
           this.add_edit=false;
           this.modalReference.close();
        }
      )
    }
  }
  formatISO(hour,minute) {
    var hours = hour;
    var minutes = minute;
     
    var dateiso=new Date('2018-05-01'+' '+hours+':'+minutes+':'+'00').toISOString();
    return dateiso;
    
    }
  formatAMPM(dateiso){
    
    
    var d = new Date(dateiso);
    var ampm = (d.getHours() >= 12) ? "pm":"am";
    var hours = d.getHours();
    var minutes =d.getMinutes();
    //console.log(minutes)

    hours = hours % 12;
    hours = hours ? hours : 12;
   // minutes=minutes%10;
    
   var min= minutes < 10 ? ("0"+minutes) : minutes;
   var hrs= hours < 10 ? '0'+hours : hours;
    if(minutes<10 || hours<10){
      return hrs+':'+min+' '+ampm;
    }
    else{
      return hours+':'+minutes+' '+ampm;
    } 
      
  }

    convertTime12to24(dateiso) {
      // const [time, modifier] = time12h.split(' ');
      // let [hours, minutes] = time.split(':');
      // if (modifier === 'PM') {
      //   hours = parseInt(hours, 10) + 12;
      // }
      var d = new Date(dateiso);
      var hours = d.getHours();
      var minutes =d.getMinutes();
      return { "hour":hours,"minute":minutes,"second":"00"}
      //return hours + ':' + minutes;
    }

    // subtype(event){
     
    //   console.log(event.target.value)
    //  // this.subtype1(event.target.value); 
    //   this.sutype=[];
    //   if(event.target.value==="Presentation"){
    //     this.sutype.push({"value":"Presentation"})
    //   }
    //   else if(event.target.value==="Travel"){
    //     this.sutype.push({"value":"Car"},{"value":"Walk"},{"value":"Rickshaw"})
    //   }
    //   else if(event.target.value==="Q&A"){
    //     this.sutype.push({"value":"Q&A"})
    //   }
    //   else if(event.target.value==="Break"){
    //     this.sutype.push({"value":"Tea"},{"value":"Lunch"})
    //   }
    //  // console.log(this.sutype)
    // }

    // subtype1(value){
      
    //   console.log(value)
    //   this.sutype.length=0;
    //   if(value==="Presentation"){
    //      this.sutype.push({"value":"Presentation"})
    //   }
    //   else if(value==="Travel"){
    //     this.sutype.push({"value":"Car"},{"value":"Walk"},{"value":"Auto"})
    //   }
    //   else if(value==="Q&A"){
    //     this.sutype.push({"value":"Q&A"})
    //   }
    //   else if(value==="Break"){
    //     this.sutype.push({"value":"Tea"},{"value":"Lunch"})
    //   }
    //  console.log(this.sutype)
    // }

    Ondelete(id:string){
      if (window.confirm('Are you sure want to Delete?')) {
      var data = {
        objectId: id,
  
      };
      console.log(data)
      this.activity.deleteData(data).subscribe(
        res => console.log(res),       
        err => console.log(err),
        () => {
          console.log("record deleted")
          this.ngOnChanges(); 
          this.toastr.success('Record deleted Successfully');
          console.log(this.docs2.length);
          if(this.docs2.length==1){
            location.reload();
          }
         
        })
       }
    }
    
}
