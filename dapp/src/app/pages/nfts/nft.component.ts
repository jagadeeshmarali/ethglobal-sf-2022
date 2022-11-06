import { Component } from "@angular/core";
import { SharedService } from "../../shared.service";

@Component({
  selector: "nft-page",
  templateUrl: "./nft.component.html"
})
export class NFTPage {

  title = 'App';
  navSidebarClass: boolean = true;
  hamburgerClass: boolean = false;

  constructor(public sharedService: SharedService) {

  }

  ngOnInit(): void {
  }
}