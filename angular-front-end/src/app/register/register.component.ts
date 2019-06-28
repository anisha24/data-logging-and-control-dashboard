import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RegisteruserService } from '../registeruser.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  successMessage: String = '';
  submitted = false;

  constructor(
    private _registeruserservice : RegisteruserService,
    private formBuilder: FormBuilder

  ) {
    this.myForm = new FormGroup
    ({
      fname: new FormControl(null, Validators.required),
      lname: new FormControl(null, Validators.required),
      uname: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9_.]+')])),
      password: new FormControl(null, Validators.required),
      cnfpass: new FormControl(null, this.passValidator)
    });

    this.myForm.controls.password.valueChanges
      .subscribe(
        x => this.myForm.controls.cnfpass.updateValueAndValidity()
    );

   }

  ngOnInit() {
  }

  isValid(controlName) {
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }

  passValidator(control: AbstractControl) 
  {
    if (control && (control.value !== null || control.value !== undefined)) 
    {
      const cnfpassValue = control.value;
      const passControl = control.root.get('password');
      if (passControl) 
      {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') 
        {
          return
          {
            isError: true
          };
        }
      }
    }
    return null;
  }

  register() {

    this.submitted = true;

    if (this.myForm.invalid) {
      console.log("Invalid Form");
      return;
  }

    console.log(this.myForm.value);

    if (this.myForm.valid) {
      this._registeruserservice.submitRegister(this.myForm.value)
        .subscribe(
          data => this.successMessage = 'Registration Success',
          error => this.successMessage = 'Some error'
        );
    }
  }


}
