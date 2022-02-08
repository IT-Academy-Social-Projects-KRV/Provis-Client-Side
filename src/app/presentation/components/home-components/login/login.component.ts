import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SignInUpValidator } from 'src/app/core/validators/signInUpValidator';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserLogin } from 'src/app/core/models/user/userLogin';
import { AlertService } from 'src/app/core/services/alerts.service';
import { SocialUser } from 'angularx-social-login';
import { UserExternalAuth } from 'src/app/core/models/user/UserExternalAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  userForLogin: UserLogin = new UserLogin();
  
  constructor(private fb:FormBuilder, private service: AuthenticationService, 
    private alertService: AlertService, private router: Router){
    this.loginForm=fb.group({
        "email":["",SignInUpValidator.getEmailValidator()],
        "password" : [""]
    })
  }
  
  ngOnInit(): void {
  }

  public externalLog(){
    this.service.externalLoginGoogle();
  }

  submit()
  {
    if(this.loginForm.valid){
      this.userForLogin = Object.assign({}, this.loginForm.value);
      this.service.login(this.userForLogin).subscribe(
        () => {
          this.alertService.successMessage();
        },
        err => {
          this.alertService.errorMessage(err);
        }
      )
    }
  }
}
