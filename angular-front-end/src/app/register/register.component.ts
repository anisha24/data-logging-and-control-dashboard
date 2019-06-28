import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RegisteruserService } from '../registeruser.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegSuccessDialogComponent } from '../reg-success-dialog/reg-success-dialog.component';
import { RegFailureDialogComponent } from '../reg-failure-dialog/reg-failure-dialog.component';

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
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog)

  {
    
   }

  ngOnInit() {

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

    if (this.myForm.valid) 
    {
      this._registeruserservice.submitRegister(this.myForm.value)
        .subscribe(
          data => this.openSuccessDialog(),
          error => this.openFailureDialog(),
        );
    }
  }


  moveToLogin()
  {
    this.router.navigate(['/']);
  }

  openSuccessDialog() :void {


      let dialogRef = this.dialog.open(RegSuccessDialogComponent , {
        data: { message : "Registration Succes"}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
      this.router.navigate(['']);
    
  }

  openFailureDialog() :void {


      let dialogRef = this.dialog.open(RegFailureDialogComponent , {
        data: { message : "Registration Failure"}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
      
    
  }


}
