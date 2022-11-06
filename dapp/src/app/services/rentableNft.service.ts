import { rentableNftFactory } from './../abi/rentableNftFactory';
import { environment } from './../../environments/environment';
import { SessionService } from './../session.service';
import { Injectable } from "@angular/core";
import { ethers } from "ethers";

declare const window: any;
@Injectable({
  providedIn: "root"
})
export class RentableNftService {
  constructor(private sessionService: SessionService) { }
  mintNFT(index, toAddress, uri) {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner(this.sessionService.accounts[0]);
    let contract = new ethers.Contract(environment.rentable_nft_factory, rentableNftFactory.abi, signer);
    return contract.functions.mintNFT(index, toAddress, uri, { value: ethers.utils.parseEther("0") });
  }
  getMyUploads() {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner(this.sessionService.accounts[0]);
    let contract = new ethers.Contract(environment.rentable_nft_factory, rentableNftFactory.abi, signer);
    return contract.functions.getMyProjects();
  }
}