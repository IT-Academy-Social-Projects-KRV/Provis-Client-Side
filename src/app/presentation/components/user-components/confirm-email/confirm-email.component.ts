import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmEmailCode } from 'src/app/core/models/user/confirmEmailCode';
import { AlertService } from 'src/app/core/services/alerts.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  confirmCodeForm: FormGroup;
  confirmationCode: ConfirmEmailCode = new ConfirmEmailCode();

  constructor(formBuilder: FormBuilder, 
    private service: UserService, 
    private router: Router, 
    private alertService: AlertService) {
    this.confirmCodeForm=formBuilder.group(
      {
        "confirmationCode":["", Validators.required]
      }
    )
  }

  ngOnInit() {
  }

  submit(){
    if(this.confirmCodeForm.valid){
      this.confirmationCode = Object.assign({}, this.confirmCodeForm.value);
      this.service.confirmEmail(this.confirmationCode).subscribe(
        () => {
          this.alertService.successMessage('Success');

          this.router.navigate(['user/workspaces']);
        },
        err => {
          this.alertService.errorMessage(err);
        }
      );
    }
  }
}
