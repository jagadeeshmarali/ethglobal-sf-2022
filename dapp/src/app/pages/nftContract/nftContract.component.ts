import { NftRentableFactoryService } from './../../services/rentableNftFactory.service';

import { UploadService } from './../../services/upload.service';
import { RentableNftService } from './../../services/rentableNft.service';
import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../../session.service';

@Component({
  selector: "nftcontract-page",
  templateUrl: "./nftContract.component.html"
})
export class NftContractPage {
  index = 0
  toAddress = "";
  uri = ""
  myNftCollectables = []
  public fileBuffer: any;
  public fileName;
  address = "";
  mintbutton = false;

  constructor(
    private modalService: NgbModal,
    private rentableNftService: RentableNftService,
    private rentableNftFactory: NftRentableFactoryService,
    private route: ActivatedRoute,
    public uploadService: UploadService,
    public sessionService: SessionService
  ) {
    this.index = this.route.snapshot.params["id"];
    this.address = this.route.snapshot.params["contract"];
    this.uploadService.getMyUploads().then(x => {
      this.myNftCollectables = x;
      for (let i = 0; i < this.myNftCollectables.length; i++) {
        this.uploadService.downloadFileToVariable(this.myNftCollectables[i].storagePath).then(data => {
          this.myNftCollectables[i]["image"] = 'data:image/png;base64,' + data.toString('base64');
        })
      }
      for (let i = 0; i < this.myNftCollectables.length; i++) {
        this.rentableNftFactory.getExistsForToken(this.index, i).then(data => {
          this.myNftCollectables[i]["minted"] = data[0];
        })
      }
    })

  }
  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
  mintNFT() {
    this.rentableNftService.mintNFT(this.index, this.toAddress, this.uri).then(x => {
      console.log(x);
    }).catch((err) => {
      console.log(err);
    });
  }
  mintNFTToken(uri) {
    this.rentableNftService.mintNFT(this.index, this.sessionService.accounts[0], uri).then(x => {
      console.log(x);
    }).catch((err) => {
      console.log(err);
    });
  }
  ngOnInit() {

  }
  async handleFileInput(event) {
    const file: File = (event.target.files as FileList)[0];
    console.log(file.name);
    this.fileName = file.name
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      this.fileBuffer = Buffer.from(reader.result);
    }
  }
  upload() {
    this.uploadService.upload('', this.fileName, this.fileBuffer).then(x => {
      console.log(x);
      this.uri = x;
      this.mintbutton = true;
    })
  }
}