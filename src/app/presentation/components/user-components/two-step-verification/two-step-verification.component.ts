import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTwoFactor } from 'src/app/core/models/user/userTwoFactor';
import { UserTwoStepCode } from 'src/app/core/models/user/userTwoStepCode';
import { AlertService } from 'src/app/core/services/alerts.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ConfirmCodeValidator } from 'src/app/core/validators/confirmCodeValidator';

@Component({
  selector: 'app-two-step-verification',
  templateUrl: './two-step-verification.component.html',
  styleUrls: ['./two-step-verification.component.css']
})
export class TwoSetpVerificationComponent implements OnInit {

  twoStepForm: FormGroup;
  token: UserTwoStepCode;

  constructor(private service: AuthenticationService,
    private alertService: AlertService,
    fornBuilder: FormBuilder,
    private activeRoute: ActivatedRoute) {
    this.twoStepForm = fornBuilder.group({
      "token": ["", ConfirmCodeValidator.getConfirmCode()]
    });
  }

  ngOnInit() {
    this.alertService.warningMessage('You need to copy code and enter it in this page!', 
    'Check your email address ' + this.activeRoute.snapshot.queryParams['email']);
  }

  submit(){
    if(this.twoStepForm.valid){
      this.token = Object.assign({}, this.twoStepForm.value);
      let twoFactorDTO: UserTwoFactor = {
        token: this.token.token,
        email: this.activeRoute.snapshot.queryParams['email'],
        provider: this.activeRoute.snapshot.queryParams['provider']
      }

      this.service.twoStepLogin(twoFactorDTO).subscribe(
        () => {
          this.alertService.successMessage('Login');
        },
        err => {
          this.showAlert(err);
        }
      );
    }
  }

  showAlert(error: string){
    this.alertService.errorMessage(error);
  }
}
