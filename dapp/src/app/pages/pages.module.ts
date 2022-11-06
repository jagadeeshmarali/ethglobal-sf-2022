import { ComponentModule } from './../components/component.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from '../shared.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePage } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { NFTPage } from './nfts/nft.component';
import { UploadPage } from './uploads/upload.component';


@NgModule({
  declarations: [
    HomePage,
    NFTPage,
    UploadPage

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    SharedModule,
    ComponentModule

  ],
  exports: [
    NFTPage,
    UploadPage
  ]
})
export class PagesModule { }
