import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignInUpValidator } from 'src/app/core/validators/signInUpValidator';
import { AlertService } from 'src/app/core/services/alerts.service';
import { ForgotPassword } from 'src/app/core/models/user/forgotPassword';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/core/services/dataShare.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm : FormGroup;
  userForgotPassword: ForgotPassword = new ForgotPassword();

  constructor(private fb:FormBuilder,
    private service: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
    private dataShare: DataShareService) {
    this.forgotPasswordForm=fb.group({
        "email":["",SignInUpValidator.getEmailValidator()]
    })
  }

  ngOnInit() {
  }

  submit()
  {
    if(this.forgotPasswordForm.valid) {
      this.userForgotPassword = Object.assign({}, this.forgotPasswordForm.value);
      this.service.sendResetPasswordToken(this.userForgotPassword).subscribe(
        () => {
          this.dataShare.nextEmail(this.userForgotPassword.email);
          this.router.navigate(['recovery/reset']);
        },
        err => {
          this.alertService.errorMessage(err);
        }
      )
    }
  }
}
