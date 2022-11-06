import { UploadPage } from './pages/uploads/upload.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './pages/home/home.component';
import { NFTPage } from './pages/nfts/nft.component';


const routes: Routes = [
  // { path: "", component: HomePage, pathMatch: 'full' },
  { path: "", component: NFTPage, pathMatch: 'full' },
  { path: "uploads", component: UploadPage, pathMatch: 'full' }




];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
