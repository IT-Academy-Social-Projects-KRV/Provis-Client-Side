import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ɵNgNoValidate, FormControlName, FormBuilder} from '@angular/forms';
import { AbstractControl} from "@angular/forms";
@Component({
    selector: 'register-form',
    styles:[`
        input.ng-touched.ng-invalid {border: solid red 2px;}
        input.ng-touched.ng-valid {border: solid green 2px;}
        
    `],
    templateUrl: './app.register-form-component.html'
})
export class RegisterFormComponent{
    registerForm : FormGroup;
    constructor(private fb:FormBuilder){
        this.registerForm=fb.group({
            "userFirstName":["",[
                Validators.required,
                Validators.pattern("[А-Яа-яїієґЇІЄҐ]{2,50}")]],
            "userLastName":["",[
                Validators.required,
                Validators.pattern("[А-Яа-яїієґЇІЄҐ]{2,50}")]],
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
    submit(){
        alert("Ви успішно зареєструвались!");
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
}
