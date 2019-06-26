import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;

  constructor() {
    this.myForm = new FormGroup({
      fname: new FormControl(null, Validators.required),
      lname: new FormControl(null, Validators.required),
      uname: new FormControl(null, this.unameValidator),
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

  isTouched(controlName) {
    if(this.myForm.get(controlName).touched)
      return true;
    else
      return false;
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

  unameValidator(control : AbstractControl)
  {
    return null;
  }


}
