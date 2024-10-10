import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io(environment.baseUrl);
    console.log(this.socket);
  }

  getHistory(sender: string, receiver: string): Observable<any>{
    return this.http.get(`${environment.baseUrl}chat/history/${sender}/${receiver}`);
  }

  // Emit a private message to the server
  sendMessage(sender: string, receiver: string, message: string) {
    this.socket.emit('private message', { sender, receiver, message });
  }

  // Listen for chat messages
  receiveMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('chat message', (msg) => {
        observer.next(msg);
      });
    });
  }
}

