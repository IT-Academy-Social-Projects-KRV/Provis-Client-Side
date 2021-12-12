import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ɵNgNoValidate, FormControlName, FormBuilder} from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';
import { AbstractControl} from "@angular/forms";
import { SignInUpValidator } from 'src/app/core/validators/signInUpValidator';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm : FormGroup;
  constructor(private fb:FormBuilder){
      this.registerForm=fb.group({
          "userFirstName":["",SignInUpValidator.getNameValidator(2,50)],
          "userLastName":["",SignInUpValidator.getNameValidator(2,50)],
          "userUsername":["",SignInUpValidator.getUserNameValidator(3,50)],
          "userEmail":["",SignInUpValidator.getEmailValidator()],
          "userPassword":["",SignInUpValidator.getPasswordValidator(8,50)],
          "userConfirmPassword":["",SignInUpValidator.getRequiredValidator()]        
      },{
          validator: SignInUpValidator.confirmPasswordValidator("userPassword","userConfirmPassword")
      })
  }
  
  ngOnInit(): void {
  }
  submit(){
    alert("You have succesfully registered");
}
}
