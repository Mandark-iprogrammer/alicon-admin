import { Component, OnInit, ElementRef,OnChanges, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import * as Ladda from 'ladda';
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
  htmlToAdd: string;
  SERVER_URL3:string
  fileSelected: boolean;
  public link:boolean=false
  abc:any
  public download1 : boolean=true
  uploader: FileUploader = new FileUploader({
    allowedMimeType: ['image/png','image/jpg','application/pdf'], //will be loaded only PNG files
    maxFileSize: 3*1024*1024 // 5 MB
});
  // public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  isLoading: boolean = false;
  progress: boolean | number = false; 
 
  APP_ID: string
  Link:string
  MASTER_KEY: string
  SERVER_URL: string
  SERVER_URL1: string
  SERVER_URL2: string
  url_image:string;
  sToken: string
  docs:any
  published:boolean = false
  publish:boolean=false
  meetingID: string
  meetingFile: File;
  @ViewChild('frm1') mytemplateForm : NgForm;
  public fileOverAnother(e: any): void {
    console.log(e)
    this.hasAnotherDropZoneOver = e;
  }

  public fileChange(e) {

    this.meetingFile = e.target.files[0];
    if(this.meetingFile.type == "image/jpg" ||  this.meetingFile.type == "image/jpeg" ||  this.meetingFile.type == "application/pdf") {
          this.meetingFile = e.target.files[0];
        }
        else {
          this.toastr.error("Upload Image and PDF Files Only...!")
          this.mytemplateForm.reset();
        }
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
    this.activatedRoute.params.subscribe((params: Params) => {
      this.meetingID = params['objectId'];
    });
    //this.SERVER_URL1='http://13.126.191.252:1337/parse/classes/meetingFiles?where={"meetingId":"'+this.meetingID+'"}'
    this.SERVER_URL1='http://13.126.191.252:1337/parse/classes/meetingFiles?where={"meetingId":{"__type":"Pointer","className":"meeting","objectId":"'+this.meetingID+'"}}'
 //  this.SERVER_URL1='http://13.126.191.252:1337/parse/classes/meetingFiles?where={"meetingId":{"__type":"Pointer","className":"meeting","objectId":"9pSCqviE6i"}}'
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
         console.log(element.isPublished)
         if(element.isPublished){
          if(element.isPublished===true){
            element.isPublished=true;
          }
          else {
            element.isPublished=false;
          }
        }
        else{
          element.isPublished=false;
        }
       });
       console.log(this.docs)
   })
  }

  onSubmit(frm: any) {
    
    this.progress = 0; // starts spinner
 
        


    // let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#fileUploadElem');
    this.activatedRoute.params.subscribe((params: Params) => {
      this.meetingID = params['objectId'];
    });
  
    var formData = new FormData();
    // const files: File = inputEl.files[0];
    formData.append('meetingFile', this.meetingFile);

    formData.append('meetingId',this.meetingID);//1AqzhGMYOg
    formData.append('fileDescription', frm.fileDescription);
    formData.append('fileTitle', frm.fileTitle);
    //formData.append("isPublished",);
    console.log('form data variable :   ' + formData);

    var headers = new HttpHeaders({
      'X-Parse-Application-Id': this.APP_ID,
      'X-Parse-Master-Key': this.MASTER_KEY,
    });

    // Create a new instance of ladda for the specified button



    this.http.post(this.SERVER_URL, formData, { headers: headers }).subscribe(success => {
      console.log(success);
      if(success['status']=="success"){
        this.toastr.success("File Upload Successfully")
        this.mytemplateForm.reset();
            setTimeout(() => {
              this.progress = 0.5; // sets progress bar to 50%

              setTimeout(() => {
                  this.progress = 1; // sets progress bar to 100%

                  setTimeout(() => {
                      this.progress = false; // stops spinner
                  }, 200);
              }, 500);
          }, 400);
            this.ngOnChanges();
      }
      else{
        this.toastr.error("File Not Upload")
      }
    })

    

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

    download(url:string,type:string,fileName:string){
      this.url_image=null;
      if(type=="media")
      {
        this.link=true;
        this.download1=false;
        this.url_image=url;
        this.htmlToAdd = '<a href="'+this.url_image+'">Link</a>';
      }
      if(type=="pdf"){
        let arr={
            "fileName":fileName,
            "meetingId":"1AqzhGMYOg",
        }
        var headers = new HttpHeaders({
          'X-Parse-Application-Id': this.APP_ID,
          'X-Parse-Master-Key': this.MASTER_KEY,
          'Content-Type': 'application/json',
        });
        this.SERVER_URL2 = 'http://13.126.191.252:1337/parse/functions/generate_download_link'
        this.http.post(this.SERVER_URL2, arr, { headers: headers }).subscribe(success => {
       //   this.docs=success['result'];
          this.abc=JSON.parse(success['result'])
          this.url_image=this.abc['data']
          console.log(this.url_image)
          this.link=true;
          this.htmlToAdd = '<a href="'+this.url_image+'">Link</a>';
          // var div = document.getElementById('foo');
          // var newlink = document.createElement('a');
          // newlink.setAttribute('href', this.url_image);
          // div.appendChild(newlink);
          
         // this  .docs=JSON.stringify(success['result'])
       //   console.log(this.docs)
        })
      }
      
    }
    cancel(){
      //this.router.navigate(['/meeting', { 'objectId': this.meetingID, 'view': 'view' }]);
    }

    link1(){
      this.link=false;
    }
  

}
