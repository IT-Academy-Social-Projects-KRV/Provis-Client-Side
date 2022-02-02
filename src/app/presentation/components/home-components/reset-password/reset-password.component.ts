import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPassword } from 'src/app/core/models/user/resetPassword';
import { AlertService } from 'src/app/core/services/alerts.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SignInUpValidator } from 'src/app/core/validators/signInUpValidator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  
  resetPasswordForm : FormGroup;
  userResetPassword: ResetPassword = new ResetPassword();

  constructor(private fb:FormBuilder, 
    private service: AuthenticationService, 
    private alertService: AlertService,
    private router: Router) {
    this.resetPasswordForm=fb.group({
        "email":["",SignInUpValidator.getEmailValidator()],
        "newPassword":["",SignInUpValidator.getPasswordValidator(8,50)],
        "confirmPassword":["",SignInUpValidator.getRequiredValidator()],
        "code":["",SignInUpValidator.getRequiredValidator()]
    },
    {
        validator: SignInUpValidator.confirmPasswordValidator("newPassword","confirmPassword")
    })
  }

  ngOnInit() {
  }

  resetPassword() {
    if(this.resetPasswordForm.valid){
      this.userResetPassword = Object.assign({}, this.resetPasswordForm.value);
    }

    this.service.resetPassword(this.userResetPassword).subscribe(
      () => {
        this.alertService.successMessage();
        this.router.navigate(['login']);
      },
      err => {
        this.alertService.errorMessage(err);
      }
    )
  }

}
