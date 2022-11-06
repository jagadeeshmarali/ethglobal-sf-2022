import { Component } from '@angular/core';
import { SessionService } from './session.service';
declare const window: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sessionFetched = false;
  title = 'NPass';
  constructor(public sessionService: SessionService,) {
    this.init();
  }
  init() {
    if (typeof window.ethereum == 'undefined') {
      console.log('Please use a dapp browser like mist or MetaMask plugin for chrome');
    }
    else {
      console.log('Ethereum browser detected');
      this.fetchSession();
    }
  }
  fetchSession() {
    this.sessionFetched = false;
    this.sessionService.getAccounts().then(() => {
      console.log("fetching accounts ...");
      this.sessionService.fetchCurrentUser(this.sessionService.accounts[0]).then(() => {
        this.sessionFetched = true;
      });

    });
  }
  async connectWallet() {
    try {
      await window.ethereum.enable();
      this.fetchSession();
    } catch (error) {
      console.log(error);
    }
  }
  async disconnect() {
    console.log("=============")
    // await window.ethereum.;
  }
}
