import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router) {
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

  moveToRegister(){
    this.router.navigate(['/register']);
  }

}

  

  

  
