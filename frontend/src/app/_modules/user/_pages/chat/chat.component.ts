// import { Component } from '@angular/core';

import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../_services/chat.service';
import { AuthService } from 'src/app/_shared/_services/auth.service';
import { ApiService } from 'src/app/_shared/_services/api.service';
import { API_ENDPOINTS } from 'src/app/_shared/_config/const'; 
// import { ChatService } from '../chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  users!: any[];
  sender: string = '';
  receiver: string = '';
  message: string = '';
  messages: Array<any> = [];
  currentUser: any;
  

  constructor(private chatService: ChatService, private authService: AuthService, private apiService: ApiService) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.sender = this.currentUser?.email;
    })
  }

  ngOnInit(): void {
    this.apiService.get(API_ENDPOINTS.user.all).subscribe(res => {
      this.users = res;
      console.log(this.users);
    }, err => {

    })
    console.log("aaaaaaaaa")
    // Listen for new messages
    this.chatService.receiveMessages().subscribe((msg: any) => {
      console.log(msg);
      this.messages.push(msg);
    });
    
  }

  // Fetch chat history
  fetchHistory(receiver: any): void {
    this.receiver = receiver.email;
    this.chatService.getHistory(this.sender, this.receiver).subscribe((history: any) => {
      this.messages = history;
    });
  }

  // Send a message
  sendMessage(): void {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.sender, this.receiver, this.message);
      this.message = '';
    }
  }

 
}

