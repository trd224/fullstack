import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: any;

  constructor(private userService: UserService){
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser);
    })
  }

  ngOnInit(): void {
    //console.log(this.currentUser);
  } 
}
