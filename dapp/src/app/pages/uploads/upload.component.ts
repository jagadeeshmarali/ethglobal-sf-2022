import { NftRentableFactoryService } from './../../services/rentableNftFactory.service';
import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "upload-page",
  templateUrl: "./upload.component.html"
})
export class UploadPage {
  nftContractName = "";
  mintFee = 0;
  nftSymbol = "";
  feeRecipient = "";
  myNftContracts = []
  constructor(
    private modalService: NgbModal,
    private rentableNftFactoryService: NftRentableFactoryService
  ) {
    this.rentableNftFactoryService.getMyProjects().then(x => {
      console.log(x);
      this.myNftContracts = x[0];
    })
  }
  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
  deployContract() {
    this.rentableNftFactoryService.deployNftContract(this.nftContractName, this.mintFee, this.nftSymbol, this.feeRecipient).then(x => {
      console.log(x);
    }).catch((err) => {
      console.log(err);
    });
  }
}