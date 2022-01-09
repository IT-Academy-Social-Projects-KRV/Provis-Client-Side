import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmEmailCode } from 'src/app/core/models/user/confirmEmailCode';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  confirmCodeForm: FormGroup;
  confirmationCode: ConfirmEmailCode = new ConfirmEmailCode();

  constructor(private fb: FormBuilder, private service: UserService, private router: Router) {
    this.confirmCodeForm=fb.group(
      {
        "confirmationCode":["", Validators.required]
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
      this.confirmationCode = Object.assign({}, this.confirmCodeForm.value);
      this.service.confirmEmail(this.confirmationCode).subscribe(
        () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Confirmation',
            text: "Success",
            showConfirmButton: false,
            timer: 1000
          });

          this.router.navigate(['user/workspaces']);
        },
        err => {
          this.showAlert(err);
        }
      );
    }
  }
}
