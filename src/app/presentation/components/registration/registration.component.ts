import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ɵNgNoValidate, FormControlName, FormBuilder} from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';
import { AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm : FormGroup;
  constructor(private fb:FormBuilder){
      this.registerForm=fb.group({
          "userFirstName":["",[
              Validators.required,
              Validators.pattern("[A-Za-z]{2,50}")]],
          "userLastName":["",[
              Validators.required,
              Validators.pattern("[A-Za-z]{2,50}")]],
          "userUsername":["",[
              Validators.required,
              Validators.pattern("[A-Za-z0-9-_]{3,50}")]],
          "userEmail":["",[
              Validators.required,
              Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
          "userPassword":["",[
              Validators.required,
              Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,50}$")
                  ]],
          "userConfirmPassword":["",[
              Validators.required
          ]]
         
      },
      {
          validator: this.confirmPasswordValidator("userPassword","userConfirmPassword")
      })
  }
  confirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName]          
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  ngOnInit(): void {
  }
  submit(){
    alert("Ви успішно зареєструвались!");
  }
}
