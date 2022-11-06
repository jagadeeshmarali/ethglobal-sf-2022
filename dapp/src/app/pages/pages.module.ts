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
import { NftContractPage } from './nftContract/nftContract.component';


@NgModule({
  declarations: [
    HomePage,
    NFTPage,
    UploadPage,
    NftContractPage

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
    UploadPage,
    NftContractPage
  ]
})
export class PagesModule { }
