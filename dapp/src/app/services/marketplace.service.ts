import { marketplace } from './../abi/marketplace';
import { environment } from './../../environments/environment';
import { SessionService } from './../session.service';
import { Injectable } from "@angular/core";
import { ethers } from "ethers";

declare const window: any;

@Injectable({
  providedIn: "root"
})
export class MarketPlaceService {
  constructor(private sessionService: SessionService) { }
  listItem(nftContractAddress, tokenId, start, end, pricePerSecond, payToken) {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner(this.sessionService.accounts[0]);
    let contract = new ethers.Contract(environment.market_place, marketplace.abi, signer);
    return contract.functions.listItem(nftContractAddress, tokenId, start, end, pricePerSecond, payToken);

  }
  getListing(nftAddress, tokenId) {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner(this.sessionService.accounts[0]);
    let contract = new ethers.Contract(environment.rentable_nft_factory, marketplace.abi, signer);
    return contract.functions.getListing(nftAddress, tokenId,)

  }

}