import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TwoFactorDTO } from 'src/app/core/models/twoFactorDTO';
import { UserTwoStepCode } from 'src/app/core/models/userTwoStepCode';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ConfirmCodeValidator } from 'src/app/core/validators/confirmCodeValidator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-two-step-verification',
  templateUrl: './two-step-verification.component.html',
  styleUrls: ['./two-step-verification.component.css']
})
export class TwoSetpVerificationComponent implements OnInit {

  twoStepForm: FormGroup;
  token: UserTwoStepCode;

  constructor(private service: AuthenticationService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute) {
    this.twoStepForm = fb.group({
      "token": ["", ConfirmCodeValidator.getConfirmCode()]
    });
  }

  ngOnInit() {
    Swal.fire({
      title: 'Check your email address ' + this.activeRoute.snapshot.queryParams['email'],
      text: "You need to copy code and enter it in this page!",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok i understand!'
    });
  }

  submit(){
    if(this.twoStepForm.valid){
      this.token = Object.assign({}, this.twoStepForm.value);
      let twoFactorDTO: TwoFactorDTO = {
        token: this.token.token,
        email: this.activeRoute.snapshot.queryParams['email'],
        provider: this.activeRoute.snapshot.queryParams['provider']
      }

      this.service.twoStepLogin(twoFactorDTO).subscribe(
        () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Login',
            text: "Success",
            showConfirmButton: false,
            timer: 1000
          });
        },
        err => {
          this.showAlert(err);
        }
      );
    }
  }

  showAlert(error: string){
    Swal.fire({
      icon: 'error',
      title: error,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }
}
