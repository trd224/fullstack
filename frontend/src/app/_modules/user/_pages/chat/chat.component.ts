// import { Component } from '@angular/core';

import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../_services/chat.service';
import { AuthService } from 'src/app/_shared/_services/auth.service';
// import { ChatService } from '../chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  sender: string = '';
  receiver: string = '';
  message: string = '';
  messages: Array<any> = [];
  currentUser: any;
  

  constructor(private chatService: ChatService, private authService: AuthService) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      //console.log(this.currentUser);
    })
  }

  ngOnInit(): void {
    this.chatService.receiveMessages().subscribe((msg: any) => {
      this.messages.push(msg);
    });
  }





  // Fetch chat history
  fetchHistory(): void {
    // this.chatService.getHistory(this.sender, this.receiver).subscribe((history: any) => {
    //   this.messages = history;
    // });

    this.chatService.getHistory(this.currentUser.email, this.receiver).subscribe((history: any) => {
      this.messages = history;
    });
  }

  // Send a message
  sendMessage(): void {
    // if (this.message.trim()) {
    //   this.chatService.sendMessage(this.sender, this.receiver, this.message);
    //   this.message = '';
    // }
    if (this.message.trim()) {
      this.chatService.sendMessage(this.currentUser.email, this.receiver, this.message);
      this.message = '';
    }
  }
}

