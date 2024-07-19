import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any = localStorage.getItem("user");
 
  private currentUserSubject = new BehaviorSubject<any>(JSON.parse(this.user));
  currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { 
   
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }


  signup(user: any): Observable<any>{
    //console.log(user);
    let payload = user;
    //console.log(payload);
    return this.http.post("http://localhost:4001/user/signup", payload);
  }

  login(user: any): Observable<any>{
    //console.log(user);
    let payload = user;
    //console.log(payload);
    return this.http.post("http://localhost:4001/user/login", payload).pipe(
      map((user:any) => {
        ////console.log(user.token);
        if(user && user?.token){
          //return user;
          //localStorage.setItem("token", user?.token);
          localStorage.setItem("user", JSON.stringify(user));
          console.log("1111111111111111111111111111111111111");
          this.currentUserSubject.next(user);
        }
        return user;
      })
    );
  }

  
  logout(): Observable<any> | null {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    if(this.currentUserSubject){
      this.currentUserSubject.next(null);
    }
    return null;
    
}


}


