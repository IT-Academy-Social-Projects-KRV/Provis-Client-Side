import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserChange2fa } from 'src/app/core/models/userChange2fa';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-change-two-fa',
  templateUrl: './change-two-fa.component.html',
  styleUrls: ['./change-two-fa.component.css']
})
export class ChangeTwoFaComponent implements OnInit {

  twoFactorForm: FormGroup;
  userChange2fa: UserChange2fa = new UserChange2fa();
  @Output() public isAdded = new EventEmitter<boolean>(false);

  constructor(private fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<UserProfileComponent>,
    private service: UserService) {
    this.twoFactorForm = fb.group({
      "Token": ['']
    });
  }

  ngOnInit() {
  }

  submit(){
    if(this.twoFactorForm.valid){
      this.userChange2fa = Object.assign({}, this.twoFactorForm.value);
      this.service.changeTwoFactorVerification(this.userChange2fa).subscribe(
        () => {

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Update 2fa',
            text: "Success",
            showConfirmButton: false,
            timer: 1000
          });

          this.router.navigate(['/user/profile']);
          this.isAdded.emit(true);
        }
      )
    }
  }
}
