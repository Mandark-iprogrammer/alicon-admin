import { Component, OnInit, ElementRef,OnChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import "rxjs/add/operator/do";
//import the map function to be used with the http library
import "rxjs/add/operator/map";
// const URL = '/api/';
// const URL = 'http://13.126.191.252:1337/uploadImage';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  SERVER_URL3:string
  fileSelected: boolean;
  uploader: FileUploader = new FileUploader({
    allowedMimeType: ['image/png','image/jpg','application/pdf'], //will be loaded only PNG files
    maxFileSize: 3*1024*1024 // 5 MB
});
  // public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  APP_ID: string
  MASTER_KEY: string
  SERVER_URL: string
  SERVER_URL1: string
  sToken: string
  docs:any
  published:boolean = false
  meetingID: string
  meetingFile: File;
  
  public fileOverAnother(e: any): void {
    console.log(e)
    this.hasAnotherDropZoneOver = e;
  }

  public fileChange(e) {
    this.meetingFile = e.target.files[0];
    this.fileSelected = e.target.files[0].length>0;
  }

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    public router: Router,
    private el: ElementRef
  ) {
    this.sToken = localStorage.getItem('sessionToken');
    this.APP_ID = '129837njlasdjfpoia2p83u4jnlkj';
    this.MASTER_KEY = 'Elkl1j23l809uljn3lkj48unkjnkjh4234';
    this.SERVER_URL = 'http://13.126.191.252:1337/uploadImage'
    this.ngOnChanges();
  }

  ngOnInit() {


  }
  ngOnChanges(){
    this.SERVER_URL1='http://13.126.191.252:1337/parse/classes/meetingFiles?where={"meetingId":"1AqzhGMYOg"}'
    // this.SERVER_URL1 = environment.apiUrl+'/users?where={"isAdmin":false}'
     this.http.get(this.SERVER_URL1, {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'X-Parse-Application-Id': this.APP_ID,
         'X-Parse-REST-API-Key': this.MASTER_KEY,
         'X-Parse-Revocable-Session': '1'
       })
     }).subscribe(data => {
       console.log(data)
       this.docs = data['results']
       this.docs.forEach(element => {
         console.log(element)
         if(element.isPublished==false){
           this.published=false;
         }
         else{
          this.published=true;
         }
       });
       console.log(this.docs)
   })
  }

  onSubmit(frm: any) {
    // let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#fileUploadElem');
    this.activatedRoute.params.subscribe((params: Params) => {
      this.meetingID = params['objectId'];
    });

    var formData = new FormData();
    // const files: File = inputEl.files[0];
    formData.append('meetingFile', this.meetingFile);
    formData.append('meetingId', this.meetingID);//1AqzhGMYOg
    formData.append('fileDescription', frm.fileDescription);
    formData.append('fileTitle', frm.fileTitle);

    console.log('form data variable :   ' + formData);

    // var headers = new HttpHeaders({
    //   'X-Parse-Application-Id': this.APP_ID,
    //   'X-Parse-Master-Key': this.MASTER_KEY,
    // });
    // this.http.post(this.SERVER_URL, formData, { headers: headers }).subscribe(success => {
    //   console.log(success);
    //   if(success['status']=="success"){
    //     this.toastr.success("File Upload Successfully")
            //this.ngOnChanges();
    //   }
    //   else{
    //     this.toastr.error("File Not Upload")
    //   }
    // })

    

  }
  Ondelete(id:string){
    if (window.confirm('Are you sure want to Delete?')) {
    //  this.SERVER_URL3 = 'http://13.126.191.252:1337/parse/classes/meetingFiles/'+id
    //     return this.http.delete(this.SERVER_URL3,{
    //     headers:new HttpHeaders({
    //     'Content-Type':'application/json',
    //     'X-Parse-Application-Id':this.APP_ID,
    //     'X-Parse-REST-API-Key':this.MASTER_KEY,
    //     })
    //     }).subscribe(
    //     res => {
    //       console.log(res)
    //     },
    //     err => console.log(err),
    //     () => {
    //       console.log("record deleted")
    //       this.toastr.success('Record deleted Successfully');
    //       this.ngOnChanges();
    //     })
    
     }
  }

  onChange(event,id:string){
    
      console.log(event)
      console.log(id)
      let arr={
       "isPublished":event,
      }
      console.log(arr)
      this.SERVER_URL3 = 'http://13.126.191.252:1337/parse/classes/meetingFiles/'+id
      return this.http.put(this.SERVER_URL3, arr, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Parse-Application-Id': this.APP_ID,
          'X-Parse-REST-API-Key': this.MASTER_KEY,
        })
      }).subscribe(
        res => console.log(res),
        err => console.log(err),
        () => {
          console.log("record updated")
          if(event==true){
           // this.pub="Published"
          this.toastr.success('Record Published Successfully');
          }
          else{
           // this.pub="UnPublished"
            this.toastr.success('Record UnPublished..! ');
           }
         }
      )


    }
  

}
