import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TwoFactorDTO } from 'src/app/core/models/twoFactorDTO';
import { UserTwoStepCode } from 'src/app/core/models/userTwoStepCode';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-two-setp-verification',
  templateUrl: './two-setp-verification.component.html',
  styleUrls: ['./two-setp-verification.component.css']
})
export class TwoSetpVerificationComponent implements OnInit {

  twoStepForm: FormGroup;
  token: UserTwoStepCode;

  constructor(private service: AuthenticationService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute) {
    this.twoStepForm = fb.group({
      "token": ['']
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
            timer: 1500
          });
        },
        err => {
          let errorMessage: string = '';
          if(err.error.errors && typeof err.error.errors === 'object'){
            const errors = err.error.errors;

            for(let key in errors){
              for(let indexError in errors[key]){
                errorMessage += errors[key][indexError] + '\n';
              }
            }

           this.showAlert(errorMessage);

            return;
          }

          if(err.error && typeof err.error === 'object'){
            errorMessage += err.error.error;

            this.showAlert(errorMessage);

            return;
          }
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
