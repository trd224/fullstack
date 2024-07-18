import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users!: any[];

  constructor(
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
      console.log(res)
    }, err => {

    })
  }

  goToDetail(user: any){
    console.log(user._id);
    this.router.navigate([`/users/${user._id}`])
  }
}
