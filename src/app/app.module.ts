import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from "@angular/router";
import { ɵMatchMedia, BreakPointRegistry, PrintHook } from '@angular/flex-layout/core';                
import { FlexLayoutModule, StyleUtils, StylesheetMap,LayoutGapStyleBuilder, LayoutStyleBuilder, MediaMarshaller, LayoutAlignStyleBuilder, FlexStyleBuilder } from '@angular/flex-layout';
import { ApartmentDetailComponent } from './app/apartment-detail/apartment-detail.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
const appRoutes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/productslist" },
  {path:"productdetail/:Id",component:ApartmentDetailComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ApartmentDetailComponent
    

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    //MeterialModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
  FlexLayoutModule,
  MatDatepickerModule,
  MatSelectModule,
  MatMomentDateModule,
  RouterModule.forRoot(appRoutes),
  RouterModule.forRoot(appRoutes, { useHash: true }),
  ],
  entryComponents:[
    
  ],
  providers:[
    PrintHook,
    StyleUtils, 
    StyleSheet,
    StylesheetMap, 
    LayoutAlignStyleBuilder,
    LayoutStyleBuilder,
    FlexStyleBuilder,
    MediaMarshaller,
    ɵMatchMedia,LayoutGapStyleBuilder,
    ApartmentDetailComponent,
    BreakPointRegistry],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
