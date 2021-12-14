import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { UserForRegister } from 'src/app/core/models/userForRegister';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SignInUpValidator } from 'src/app/core/validators/signInUpValidator';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm : FormGroup;
  userForRegistreation: UserForRegister = new UserForRegister();

  constructor(private fb:FormBuilder, private service: AuthenticationService, private router: Router){
      this.registerForm=fb.group({
          "Name":["",SignInUpValidator.getNameValidator(3,50)],
          "Surname":["",SignInUpValidator.getNameValidator(3,50)],
          "Username":["",SignInUpValidator.getUserNameValidator(3,50)],
          "Email":["",SignInUpValidator.getEmailValidator()],
          "Password":["",SignInUpValidator.getPasswordValidator(8,50)],
          "ConfirmPassword":["",SignInUpValidator.getRequiredValidator()]
      },{
          validator: SignInUpValidator.confirmPasswordValidator("Password","ConfirmPassword")
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

  submit(){
    if(this.registerForm.valid){
      this.userForRegistreation = Object.assign({}, this.registerForm.value);
      this.service.register(this.userForRegistreation).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Register',
            text: "Success"
          })
          this.router.navigate(['login']);
        },
        err => {
          let errorMessage: string = '';
          if(err.error.errors && typeof err.error.errors === 'object'){
            const errors = err.error.errors;

            for(let key in errors){
              for(let indexError in errors[key]){
                errorMessage += errors[key][indexError] + '\n';
                console.log(errors[key][indexError]);
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
