import { rentableNftFactory } from './../abi/rentableNftFactory';
import { environment } from './../../environments/environment';
import { SessionService } from './../session.service';
import { Injectable } from "@angular/core";
import { ethers } from "ethers";

declare const window: any;
@Injectable({
  providedIn: "root"
})
export class NftRentableFactoryService {
  constructor(private sessionService: SessionService) { }
  deployNftContract(nftContractName, mintFee, nftSymbol, feeRecipient) {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner(this.sessionService.accounts[0]);
    let contract = new ethers.Contract(environment.rentable_nft_factory, rentableNftFactory.abi, signer);
    return contract.functions.deployNftContract(nftContractName, nftSymbol, mintFee, feeRecipient, { value: ethers.utils.parseEther(".01") });
  }
  getMyProjects() {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner(this.sessionService.accounts[0]);
    let contract = new ethers.Contract(environment.rentable_nft_factory, rentableNftFactory.abi, signer);
    return contract.functions.getMyProjects();
  }
  getExistsForToken(index, tokenId) {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner(this.sessionService.accounts[0]);
    let contract = new ethers.Contract(environment.rentable_nft_factory, rentableNftFactory.abi, signer);
    return contract.functions.getExistsForToken(index, tokenId);
  }
}