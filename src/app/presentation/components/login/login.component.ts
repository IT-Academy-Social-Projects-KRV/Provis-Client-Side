import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SignInUpValidator } from 'src/app/core/validators/signInUpValidator';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserForLogin } from 'src/app/core/models/userForLogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  userForLogin: UserForLogin = new UserForLogin();

  constructor(private fb:FormBuilder, private service: AuthenticationService, private router: Router){
    this.loginForm=fb.group({        
        "Email":["",SignInUpValidator.getEmailValidator()],
        "Password" : [""]               
    })
}
  ngOnInit(): void {
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

  submit()
  {  
    if(this.loginForm.valid){
      this.userForLogin = Object.assign({}, this.loginForm.value);
      this.service.login(this.userForLogin).subscribe(
        () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Login',
            text: "Success",
            showConfirmButton: false,
            timer: 1000
          });

          this.router.navigate(['user/workspaces']);
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
      )
    }
  }
}
