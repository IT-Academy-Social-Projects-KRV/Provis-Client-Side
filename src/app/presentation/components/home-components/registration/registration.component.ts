import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/core/models/user/userRegister';
import { AlertService } from 'src/app/core/services/alerts.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SignInUpValidator } from 'src/app/core/validators/signInUpValidator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm : FormGroup;
  userForRegistreation: UserRegister = new UserRegister();

  constructor(formBuilder:FormBuilder, 
    private service: AuthenticationService, 
    private router: Router, 
    private alertService: AlertService){
      this.registerForm=formBuilder.group({
          "Name":["",SignInUpValidator.getNameValidator(3,50)],
          "Surname":["",SignInUpValidator.getNameValidator(3,50)],
          "Username":["",SignInUpValidator.getUserNameValidator(3,50)],
          "Email":["",SignInUpValidator.getEmailValidator()],
          "Password":["",SignInUpValidator.getPasswordValidator(8,50)],
          "ConfirmPassword":["",SignInUpValidator.getRequiredValidator()]
      },{
          validator: SignInUpValidator.confirmPasswordValidator("Password","ConfirmPassword")
      })
  }

  ngOnInit(): void {
  }

  submit(){
    if(this.registerForm.valid){
      this.userForRegistreation = Object.assign({}, this.registerForm.value);
      this.service.register(this.userForRegistreation).subscribe(
        () => {
          this.alertService.successMessage('Register')
          this.router.navigate(['login']);
        },
        err => {
          this.alertService.errorMessage(err);
        }
      )
    }
  }
}
