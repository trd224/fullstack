import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any>{
    return this.http.get("http://localhost:4001/user/all");
  }

  getUserById(id:any): Observable<any>{
    ////console.log()
    return this.http.get(`http://localhost:4001/user/${id}`)
  }
}
