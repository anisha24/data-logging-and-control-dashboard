import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisteruserService } from '../registeruser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router,
    private _registeruserservice: RegisteruserService, ) {
    this.loginForm = new FormGroup
      ({
        unameLogin: new FormControl(null, Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z0-9_.]+')])),
        passwordLogin: new FormControl(null, Validators.required),
      });
  }

  ngOnInit() {
  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  moveToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    if (this.loginForm.valid) {
      this._registeruserservice.login(this.loginForm.value)
        .subscribe(
          data => {
            console.log(data);
            localStorage.setItem('token', data.toString());
            this.router.navigate(['/dashboard/dash']);
          },
          error => { }
        );
    }
  }


}






