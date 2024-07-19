import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_modules/shared/_services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: any;

  constructor(private authService: AuthService){
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      //console.log(this.currentUser);
    })
  }

  ngOnInit(): void {
    ////console.log(this.currentUser);
  } 

  logout(){
    this.authService.logout();
  }
}
