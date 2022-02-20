import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataShareService } from 'src/app/core/services/dataShare.service';
import { SignInUpValidator } from 'src/app/core/validators/signInUpValidator';
import { SetPassword } from 'src/app/core/models/user/setPassword';
import { AlertService } from 'src/app/core/services/alerts.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-set-password',
  templateUrl: './user-set-password.component.html',
  styleUrls: ['./user-set-password.component.css']
})

export class UserSetPasswordComponent implements OnInit {

    setPasswordForm: FormGroup;
    userSetPassword: SetPassword = new SetPassword();
    @Output() public isUpdated = new EventEmitter<boolean>(false);

  constructor(formBuilder: FormBuilder,
    private alertService: AlertService,
    private service: UserService,
    private dataShareService: DataShareService) {
        this.setPasswordForm=formBuilder.group({
            "Password":["",SignInUpValidator.getPasswordValidator(8,50)],
            "confirmPassword":["",SignInUpValidator.getRequiredValidator()]
        },
        {
            validator: SignInUpValidator.confirmPasswordValidator("Password","confirmPassword")
        })
  }

  ngOnInit() {

  }

  submit() {
    if(this.setPasswordForm.valid){
        this.userSetPassword.Password = this.setPasswordForm.value.Password;
        this.service.setPassword(this.userSetPassword).subscribe(
          () => {
            this.alertService.successMessage();
            this.isUpdated.emit(true);
          },
          err => {
            this.alertService.errorMessage(err);
          }
        )
    }
  }
}
