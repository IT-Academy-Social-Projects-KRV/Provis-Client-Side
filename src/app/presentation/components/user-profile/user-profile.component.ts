import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/core/models/userProfile';
import { ChangeUserInfo } from 'src/app/core/models/changeUserInfo';
import { UserService } from 'src/app/core/services/user.service';
import { SignInUpValidator } from 'src/app/core/validators/signInUpValidator';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ChangeTwoFaComponent } from '../change-two-fa/change-two-fa.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

  userProfileForm : FormGroup;
  userProfile: UserProfile = new UserProfile();
  changeUserInfo: ChangeUserInfo = new ChangeUserInfo();

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, public dialog: MatDialog) {
    this.userProfileForm = this.fb.group({
      name:['',SignInUpValidator.getNameValidator(3,50)],
      surname:['',SignInUpValidator.getNameValidator(3,50)],
      username:['',SignInUpValidator.getUserNameValidator(3,50)],
      email:['',SignInUpValidator.getEmailValidator()]
    });
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

  handleError(err: any){
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

  ngOnInit() {
    this.userService.getUserProfile().subscribe((data: UserProfile) =>{
      this.userProfile = data;
      this.userProfileForm.patchValue(this.userProfile);
    });
  }

  update(){
    if(this.userProfileForm.valid){
      this.changeUserInfo.Name = this.userProfileForm.get('name')?.value;
      this.changeUserInfo.Surname = this.userProfileForm.get('surname')?.value;
      this.changeUserInfo.UserName = this.userProfileForm.get('username')?.value;
      this.userService.updateUserInfo(this.changeUserInfo).subscribe(
       () => {
         Swal.fire({
           position: 'top-end',
           icon: 'success',
           title: 'Update Personal Information',
           text: "Success",
           showConfirmButton: false,
           timer: 1000
         });
       },
       err => {
        this.handleError(err);
       }
     )
   }
  }

  showCheckEmailAlert(){
    Swal.fire({
      title: 'Check your email address ' + this.userProfile.email,
      text: "You need to copy confirmation code and enter it in this page!",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok i understand!'
    });
  }

  confirmEmail(){
    this.userService.sendConfirmEmail().subscribe(
      () => {
        this.showCheckEmailAlert();
        this.router.navigate(['user/confirmemail']);
      },
      err => {
        this.handleError(err);
      }
    );
  }

  modelEnterCode(){
    this.userService.checkIsTwoFactorVerification().subscribe(
      res => {
        if(!res){
          this.showCheckEmailAlert();

          this.userService.sendTwoFactorCode().subscribe();

          let dialogRef = this.dialog.open(ChangeTwoFaComponent);
          dialogRef.componentInstance.isAdded.subscribe(data => {
            if(data){
              dialogRef.close();
            }
          })
        }
        else{
          Swal.fire({
            title: 'You have already activated two-factor authentication, do you want to disable it?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
          }).then((result) => {
            if (result.isConfirmed) {
              this.showCheckEmailAlert();

              this.userService.sendTwoFactorCode().subscribe();

              let dialogRef = this.dialog.open(ChangeTwoFaComponent);
              dialogRef.componentInstance.isAdded.subscribe(data => {
                if(data){
                  dialogRef.close();
                }
              })
            }
          })
        }
      },
      err => {
        this.handleError(err);
      }
    )
  }
}
