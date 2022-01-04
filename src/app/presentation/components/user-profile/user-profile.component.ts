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
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

  image: SafeUrl | null = null;
  defaultImage: string = 'assets/img/user-profile-image.png';
  userProfileForm : FormGroup;
  userProfile: UserProfile = new UserProfile();
  changeUserInfo: ChangeUserInfo = new ChangeUserInfo();

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, public dialog: MatDialog) {
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private sanitizer: DomSanitizer) {
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

  ngOnInit() {
    this.userService.getUserProfile().subscribe((data: UserProfile) =>{
      this.userProfile = data;
      this.userProfileForm.patchValue(this.userProfile);
    });

    this.userService.getUserImage().subscribe((data: Blob) => {
      const blob = new Blob([data], { type: data.type });
      const unsafeImg = URL.createObjectURL(blob);
      this.image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
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
        this.catchErr(err);
       }
     )
   }
  }

  confirmEmail(){
    this.userService.sendConfirmEmail().subscribe(
      () => {
        Swal.fire({
          title: 'Check your email address ' + this.userProfile.email,
          text: "You need to copy confirmation code and enter it in this page!",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok i understand!'
        });

        this.router.navigate(['user/confirmemail']);
      },
      err =>{
        this.catchErr(err);
      }
    );
  }

  modelEnterCode(){
    this.userService.checkIsTwoFactorVerification().subscribe(
      res => {
        if(!res){
          Swal.fire({
            title: 'Check your email address ' + this.userProfile.email,
            text: "To activate two-factor authentication, enter the code sent to your mail",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok i understand!'
          });

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
              Swal.fire({
                title: 'Check your email address ' + this.userProfile.email,
                text: "To disable two-factor authentication, enter the code sent to your mail",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok i understand!'
              });

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
        this.catchErr(err);
      }
    )
  }

  getImageTypes(): string {

    let types: string = '';
    environment.imageSettings.imageTypes.forEach( function(x) {
      types += '.' + x + ',' 
    });

    return types;
  }

  uploadImage(event: any){

    let file: File = event.target.files[0];
    
    if(file.size > environment.imageSettings.maxSize * 1024 * 1024)
    {
      this.showAlert('Max size is ' + environment.imageSettings.maxSize + ' Mb');
      return;
    }

    this.userService.updateUserImage(file).subscribe(() => {
      const unsafeImg = URL.createObjectURL(file);
      this.image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
    },
    err =>{
      this.catchErr(err);
    });
  }

  catchErr(err: any): void {
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
}
