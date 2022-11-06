import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../../session.service';
import { trim } from '../../utils';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	toggleChat: boolean = true;
	toggleSingle: boolean = true;



	ngOnInit(): void {
	}


	togglechatbar() {
		this.toggleChat = !this.toggleChat;
	}
	singleChatWindow() {
		this.toggleSingle = !this.toggleSingle;
	}
	public trim = trim;
	@Output() connectEvent = new EventEmitter<any>();

	constructor(public sessionService: SessionService) { }

	emitconnectEvent() {
		this.connectEvent.emit();
	}

}
