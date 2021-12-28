import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmEmailCode } from 'src/app/core/models/confirmEmailCode';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  confirmCodeForm: FormGroup;
  confirmCode: ConfirmEmailCode = new ConfirmEmailCode();

  constructor(private fb: FormBuilder, private service: UserService, private router: Router) { 
    this.confirmCodeForm=fb.group(
      {
        "confirmCode":[""]
      }
    )
  }

  ngOnInit() {
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
    if(this.confirmCodeForm.valid){
      this.confirmCode = Object.assign({}, this.confirmCodeForm.value);
      this.service.confirmEmail(this.confirmCode).subscribe(
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
      );
    }
    else{
      this.showAlert('else');
    }
  }

}
