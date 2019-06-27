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
    console.log("Inside password validator");
    if (control && (control.value !== null || control.value !== undefined)) 
    {
      const cnfpassValue = control.value;
      const passControl = control.root.get('password');
      console.log("Inside First if");
      if (passControl) 
      {
        const passValue = passControl.value;
        console.log("Inside second if");
        if (passValue !== cnfpassValue || passValue === '') 
        {
          console.log("Inside third if");
          return
          {
            isError: true
          };
        }
      }
    }
    console.log("Returning null");
    return null;
  }


}
