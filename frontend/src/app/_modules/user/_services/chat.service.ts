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
  //private SERVER_URL = 'http://localhost:3000'; // Backend URL
  //return this.http.post<any>(environment.baseUrl + api_endpoint, payload);

  constructor(private http: HttpClient) {
    // this.socket = io(this.SERVER_URL);
    this.socket = io(environment.baseUrl);
  }



  // Fetch chat history
  // getHistory(sender: string, receiver: string): Observable<any> {
  //   const token = this.localStorage.retrieve('token');
  //   const headers = new HttpHeaders().set('Authorization', token);
  //   return this.http.get(`${this.SERVER_URL}/api/history/${sender}/${receiver}`, { headers });
  // }

  getHistory(sender: string, receiver: string): Observable<any>{
    return this.http.get(`${environment.baseUrl}user/api/history/${sender}/${receiver}`);
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

