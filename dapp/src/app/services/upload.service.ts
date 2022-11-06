import { rentableNftFactory } from './../abi/rentableNftFactory';
import { environment } from './../../environments/environment';
import { SessionService } from './../session.service';
import { Injectable } from "@angular/core";
import { ethers } from "ethers";

import Web3 from 'web3';
const Filestorage = require('@skalenetwork/filestorage.js');
declare const window: any;
const web3Provider = new Web3.providers.HttpProvider("https://eth-sf.skalenodes.com/v1/hackathon-complex-easy-naos");

let web3 = new Web3(web3Provider);

//get filestorage instance
let filestorage = new Filestorage(web3, true);
@Injectable({
  providedIn: "root"
})
export class UploadService {
  constructor(private sessionService: SessionService) { }
  mintNFT(index, toAddress, uri) {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner(this.sessionService.accounts[0]);
    let contract = new ethers.Contract(environment.rentable_nft_factory, rentableNftFactory.abi, signer);
    return contract.functions.mintNFT(index, toAddress, uri, { value: ethers.utils.parseEther("0") });
  }

  async upload(specificDirectory, fileName, fileBuffer) {
    let privateKey = '0x' + environment.private_key;
    let filePath = "";
    if (specificDirectory === '') {
      filePath = fileName;
    } else {
      filePath = specificDirectory + '/' + fileName;
    }
    console.log(filePath);
    return filestorage.uploadFile(
      this.sessionService.accounts[0],
      filePath,
      new Uint8Array(fileBuffer),
      privateKey
    );
  }

  async getMyUploads() {
    return filestorage.listDirectory(this.sessionService.accounts[0].split("0x")[1]);
  }
  async downloadFileToVariable(storagePath) {
    //create web3 connection
    // let file = await filestorage.downloadToBuffer(storagePath);
    // file = 'data:image/png;base64,' + file.toString('base64');
    return filestorage.downloadToBuffer(storagePath)
    // return file
  }

}