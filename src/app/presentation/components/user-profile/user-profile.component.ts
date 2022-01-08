import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/core/models/userProfile';
import { ChangeUserInfo } from 'src/app/core/models/changeUserInfo';
import { UserService } from 'src/app/core/services/user.service';
import { SignInUpValidator } from 'src/app/core/validators/signInUpValidator';
import { MatDialog } from '@angular/material/dialog';
import { ChangeTwoFaComponent } from '../change-two-fa/change-two-fa.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/core/services/alerts.service';

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

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog) {
    this.userProfileForm = this.fb.group({
      name:['',SignInUpValidator.getNameValidator(3,50)],
      surname:['',SignInUpValidator.getNameValidator(3,50)],
      username:['',SignInUpValidator.getUserNameValidator(3,50)],
      email:['',SignInUpValidator.getEmailValidator()]
    });
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
         this.alertService.successMessage("Update personal information", "Success");
       },
       err => {
        this.catchErr(err);
       }
     )
   }
  }

  showCheckEmailAlert(){
    this.alertService.warningMessage("You need to copy confirmation code and enter it in this page!",
    'Check your email address ' + this.userProfile.email);
  }

  confirmEmail(){
    this.userService.sendConfirmEmail().subscribe(
      () => {
        this.showCheckEmailAlert();
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

          if (
          this.alertService.confirmMessage(
            'You have already activated two-factor authentication, do you want to disable it?',
            'Are you sure?', 
            'Yes, disable'))
          {
            this.showCheckEmailAlert();

            this.userService.sendTwoFactorCode().subscribe();

            let dialogRef = this.dialog.open(ChangeTwoFaComponent);
            dialogRef.componentInstance.isAdded.subscribe(data => {
              if(data){
                dialogRef.close();
              }
            })
          }
          
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
      this.alertService.errorMessage('Max size is ' + environment.imageSettings.maxSize + ' Mb', 'Error')
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

      this.alertService.errorMessage(errorMessage, "Error");
      return;
    }

    if(err.error && typeof err.error === 'object'){
      errorMessage += err.error.error;

      this.alertService.errorMessage(errorMessage, "Error");

      return;
    }
  }
}
