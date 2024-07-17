import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { mobileNumberValidator, passwordValidator } from 'src/app/_validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router){

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
   
    })

   

    
  }

  get f(){
   return this.loginForm.controls;
  }

  onSubmit(){
    console.log(this.loginForm.value)
    
    this.submitted = true;

    if(this.loginForm.invalid){
      return;
    }

    let formData = this.loginForm.value;

    this.userService.login(formData).subscribe(res => {
      console.log(res);
      if(res && res.token){
        this.router.navigate(["/dashboard"]);
      }
    })

    
  }
}

