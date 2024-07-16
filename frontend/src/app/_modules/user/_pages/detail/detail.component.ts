import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, AfterViewInit {

  user: any;
  constructor(private userService: UserService, private route: ActivatedRoute){}

  ngOnInit(): void {
   
    let userid = this.route.snapshot.params['id'];

    this.userService.getUserById(userid).subscribe(res => {
      console.log(res);
      this.user = res;
    }, err => {

    })
  }

  ngAfterViewInit(): void {
    
  }
}
