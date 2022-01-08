import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserChangeTwoFactor } from 'src/app/core/models/user/userChangeTwoFactor';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmCodeValidator } from 'src/app/core/validators/confirmCodeValidator';
import Swal from 'sweetalert2';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-change-two-fa',
  templateUrl: './change-two-fa.component.html',
  styleUrls: ['./change-two-fa.component.css']
})
export class ChangeTwoFaComponent implements OnInit {

  twoFactorForm: FormGroup;
  userChange2fa: UserChangeTwoFactor = new UserChangeTwoFactor();
  @Output() public isAdded = new EventEmitter<boolean>(false);

  constructor(private fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<UserProfileComponent>,
    private service: UserService) {
    this.twoFactorForm = fb.group({
      "Token": ["", ConfirmCodeValidator.getConfirmCode()]
    });
  }

  ngOnInit() {
  }

  submit(){
    if(this.twoFactorForm.valid){
      this.userChange2fa = Object.assign({}, this.twoFactorForm.value);
      this.service.changeTwoFactorVerification(this.userChange2fa).subscribe(
        () => {

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Update 2fa',
            text: "Success",
            showConfirmButton: false,
            timer: 1000
          });

          this.router.navigate(['/user/profile']);
          this.isAdded.emit(true);
        },
        err =>{
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
      )
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
