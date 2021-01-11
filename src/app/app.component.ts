import { ApartmentDetailComponent } from './app/apartment-detail/apartment-detail.component';
import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Apartments-demo';
  cardsList:any;
  constructor(private _http:HttpClient,public dialog: MatDialog) {}
  ngOnInit() {
     this.getCardsList()
  }
  getCardsList(){
    this._http.get('http://18.136.149.198:2020/api/noticeboards?filter[include]=userData&filter[order]=postdate%20DESC')
    .subscribe((response) => {
      if (response) {
        this.cardsList=response;
      }
    })
  }

  newMember(IsEdit,editval): void {
   
    if(this.dialog.openDialogs&&this.dialog.openDialogs.length>=1){
      return;
     }
     else{
    const dialogRef = this.dialog.open(ApartmentDetailComponent, {
      width: "35vw", backdropClass: 'static',
      data: IsEdit?editval.id:null
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result=='true'){
        this.ngOnInit();
      }

      //this.animal = result;
    });
  }
  }

  edit(editval){
    this.newMember(true,editval)
  }
  delete(Id){
   
    this._http.delete('http://18.136.149.198:2020/api/noticeboards/'+Id)
    .subscribe((response) => {
      if (response) {
        this.ngOnInit()
        alert('Apartment Deleted sucessfully');
      }
    })
  }
}
