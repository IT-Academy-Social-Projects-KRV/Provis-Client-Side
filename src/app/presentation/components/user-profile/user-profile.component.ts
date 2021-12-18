import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserProfile } from 'src/app/core/models/userProfile';
import { UserService } from 'src/app/core/services/user.service';
import { SignInUpValidator } from 'src/app/core/validators/signInUpValidator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userInfoForm : FormGroup;
  userProfile: UserProfile = new UserProfile();

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userInfoForm = this.fb.group({
      Name:[this.userProfile.Name,SignInUpValidator.getNameValidator(3,50)],
      Surname:[this.userProfile.Surname,SignInUpValidator.getNameValidator(3,50)],
      Username:[this.userProfile.Username,SignInUpValidator.getUserNameValidator(3,50)],
      Email:[this.userProfile.Email,SignInUpValidator.getEmailValidator()]
    });

    
  }

  ngOnInit() {
    this.userService.getUserPrifile().subscribe((data: UserProfile)=>{
      this.userProfile = data;
      console.log(this.userProfile);
      this.userInfoForm.patchValue({
        Name: "sdsdsds",
        Surname: data.Surname,
        Username: data.Username,
        Email: data.Email
      });
    });
  }

  update(){
    console.log(this.userProfile);
  }
}
