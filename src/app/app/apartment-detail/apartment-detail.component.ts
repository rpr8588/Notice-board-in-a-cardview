import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HttpClient, HttpParams } from '@angular/common/http';


import { merge, of as observableOf, Observable } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import * as moment from 'moment';
export interface DialogData {
  id: string;
  name: string;
}
@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.css']
})

export class ApartmentDetailComponent implements OnInit {
  DetailForm: FormGroup;
  ApartmentId:string;
  errordiv:any;
  DetailFormObj: any = {
    "appartmentId": "",
    "description": "",
    "status": "",
    "postdate": "",
    "title": "",
  }
  IsEdit:any;
  ApartmentList:any;
  constructor(
    public dialogRef: MatDialogRef<ApartmentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder, private _http: HttpClient,
  ) { }

  ngOnInit() {
    this.IsEdit = this.data ? true : false;
    this.ApartmentId=this.data?this.data.id:'new';
    
    this.ApartmentList=[];
    this.DetailForm = this._formBuilder.group({
      appartmentId: [{ value: '' }],
      title: [{ value: '' }],
      status: [{ value: '' }],
      description: [''],
      postdate: ['']
      
    });
    this.getApartmentList();
  }
  getApartmentList(){
    

this._http.get('http://18.136.149.198:2020/api/appartments')
    .subscribe((response) => {
      if (response) {
        this.ApartmentList=response;
        if(this.IsEdit){
          this.getDetailData()
        }
        
      }
    })
  }
  getDetailData(){
    this._http.get('http://18.136.149.198:2020/api/noticeboards/'+this.data+'?filter[include]=appartment&filter[include]=noticeboardImageData')
    .subscribe((response) => {
      if (response) {
        this.DetailFormObj=response;
        
      }
    })
  }
  onNoClick(): void {
    this.dialogRef.close('false');
  }
  
  saveApartment() {
    this.errordiv = '';
    // Do nothing if the form is invalid
    if (this.DetailForm.invalid) {
      this.errordiv = "Please fill all mandatory fields";
      
      return;
    }
    
    

    else {
      
      if (this.DetailForm.invalid) {
      
        window.scrollTo(0, 0);
        return;
      }
      else {
        //this.isDataLoaded = true;
        let url=this.IsEdit?'http://18.136.149.198:2020/api/noticeboards/editNoticeboardData':'http://18.136.149.198:2020/api/noticeboards/createPost';
        this.DetailFormObj.postdate = this.DetailFormObj.postdate ? moment(this.DetailFormObj.postdate).format('YYYY-MM-DDT00:00:00') : null;
        if(this.IsEdit){
          this._http.put(url, this.DetailFormObj)
          .subscribe((data) => {
            if (data) {
             // this.isDataLoaded = false;
              this.dialogRef.close('true');
            }
          }, error => {
            //this.isDataLoaded = false;
            this.errordiv = error.error;
            this.DetailFormObj.postdate = new Date(this.DetailFormObj.postdate);
            
          })
        }
        else{
          this._http.post(url, this.DetailFormObj)
          .subscribe((data) => {
            if (data) {
             // this.isDataLoaded = false;
              this.dialogRef.close('true');
            }
          }, error => {
            //this.isDataLoaded = false;
            this.errordiv = error.error;
            this.DetailFormObj.postdate = new Date(this.DetailFormObj.postdate);
            
          })
        }
        
      }
    }
  }
}
