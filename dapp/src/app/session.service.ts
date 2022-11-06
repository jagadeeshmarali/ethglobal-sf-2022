import { Injectable } from "@angular/core";
import { ethers } from "ethers";
import Identicon from "identicon.js";
import { User } from "./interfaces";

declare const window: any;
const provider = new ethers.providers.Web3Provider(window.ethereum);

@Injectable({
  providedIn: "root"
})
export class SessionService {
  accounts: string[] = [];
  currentUser: User | undefined;
  constructor() { }
  async getAccounts() {
    this.accounts = await provider.listAccounts();
  }
  async getBalance(address: string) {
    let balanceObj = await provider.getBalance(address)
    return Number(parseFloat(ethers.utils.formatEther(balanceObj)).toFixed(3))
  }
  async fetchCurrentUser(address: string) {
    this.currentUser = {
      account: address,
      balance: await this.getBalance(address),
      identicon: "data:image/png;base64," + new Identicon(this.accounts[0], 30).toString()
    }
    console.log(this.currentUser);
  }
}