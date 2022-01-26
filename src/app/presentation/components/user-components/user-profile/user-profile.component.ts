import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/core/models/user/userProfile';
import { UserChangeProfile } from 'src/app/core/models/user/userChangeProfile';
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
  changeUserInfo: UserChangeProfile = new UserChangeProfile();

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog) {
    this.userProfileForm = this.formBuilder.group({
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
      this.changeUserInfo.name = this.userProfileForm.get('name')?.value;
      this.changeUserInfo.surname = this.userProfileForm.get('surname')?.value;
      this.changeUserInfo.userName = this.userProfileForm.get('username')?.value;
      this.userService.updateUserInfo(this.changeUserInfo).subscribe(
       () => {
         this.alertService.successMessage("Update personal information", "Success");
       },
       err => {
        this.alertService.errorMessage(err);
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
        this.alertService.errorMessage(err);
      }
    );
  }

  async modelEnterCode(){
   
        this.userService.checkIsTwoFactorVerification().subscribe(
          async res => {
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
              if(await this.alertService.confirmMessage(
                'You have already activated two-factor authentication, do you want to disable it?',
                'Are you sure?',
                'Yes, disable')){
                this.showCheckEmailAlert();

                this.userService.sendTwoFactorCode().subscribe();

                let dialogRef = this.dialog.open(ChangeTwoFaComponent);
                dialogRef.componentInstance.isAdded.subscribe(data => {
                  if(data){
                    dialogRef.close();
                  }
                })
            }
          }},
          err => {
            this.alertService.errorMessage(err);
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
      this.alertService.errorMessage(err);
    });
  }
}
