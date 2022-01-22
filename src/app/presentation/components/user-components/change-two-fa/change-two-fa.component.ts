import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserChangeTwoFactor } from 'src/app/core/models/user/userChangeTwoFactor';
import { AlertService } from 'src/app/core/services/alerts.service';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmCodeValidator } from 'src/app/core/validators/confirmCodeValidator';

@Component({
  selector: 'app-change-two-fa',
  templateUrl: './change-two-fa.component.html',
  styleUrls: ['./change-two-fa.component.css']
})
export class ChangeTwoFaComponent implements OnInit {

  twoFactorForm: FormGroup;
  userChange2fa: UserChangeTwoFactor = new UserChangeTwoFactor();
  @Output() public isAdded = new EventEmitter<boolean>(false);

  constructor(formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private service: UserService) {
    this.twoFactorForm = formBuilder.group({
      "Token": ["", ConfirmCodeValidator.getConfirmCode()]
    });
  }

  ngOnInit() {
  }

  submit(){
    if(this.twoFactorForm.valid){
      this.userChange2fa = Object.assign({}, this.twoFactorForm.value);
      this.service.changeTwoFactorVerification(this.userChange2fa).subscribe(
        () => {
          this.alertService.successMessage('Success', 'Update 2fa');
          this.router.navigate(['/user/profile']);
          this.isAdded.emit(true);
        },
        err =>{
          this.alertService.errorMessage(err);
        }
      )
    }
  }
}
