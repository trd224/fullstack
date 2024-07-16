import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  postUser(user: any): Observable<any>{
    console.log(user);
    let payload = user;
    console.log(payload);
    return this.http.post("http://localhost:4000/user", payload);
  }


}
