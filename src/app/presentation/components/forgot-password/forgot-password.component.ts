import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignInUpValidator } from 'src/app/core/validators/signInUpValidator';
import { AlertService } from 'src/app/core/services/alerts.service';
import { ForgotPassword } from 'src/app/core/models/user/forgotPassword';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm : FormGroup;
  userForgotPassword: ForgotPassword = new ForgotPassword();

  constructor(private fb:FormBuilder, private service: AuthenticationService, private alertService: AlertService){
    this.forgotPasswordForm=fb.group({
        "email":["",SignInUpValidator.getEmailValidator()]
    })
  }

  ngOnInit() {
  }

  submit()
  {
    if(this.forgotPasswordForm.valid){
      this.forgotPasswordForm = Object.assign({}, this.forgotPasswordForm.value);
      this.service.login(this.userForLogin).subscribe(
        () => {
          this.alertService.successMessage();
        },
        err => {
          this.alertService.errorMessage(err);
        }
      )
    }
  }
}
