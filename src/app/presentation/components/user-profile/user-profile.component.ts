import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/core/models/userProfile';
import { UserService } from 'src/app/core/services/user.service';
import { SignInUpValidator } from 'src/app/core/validators/signInUpValidator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userProfileForm : FormGroup;
  userProfile: UserProfile = new UserProfile();

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
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
  }

  update(){
    //there will be logic for update user info.
  }

  confirmEmail(){
    this.userService.sendConfirmEmail().subscribe(
      () => {
        Swal.fire({
          title: 'Check your email address',
          text: "You need to copy confirmation code and enter it in this page!",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok i understand!'
        });

        this.router.navigate(['user/confirmemail']);
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
