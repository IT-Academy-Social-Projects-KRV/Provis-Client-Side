import { UserService } from 'src/app/core/services/user.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { UserInvite } from 'src/app/core/models/userInviteList';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-invites',
  templateUrl: './modal-invites.component.html',
  styleUrls: ['./modal-invites.component.css']
})
export class ModalInvitesComponent implements OnInit {

  userInviteList: UserInvite [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserInvite().subscribe((data: UserInvite[])=>{
      this.userInviteList = data;
    })
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

  deny(inviteId:number)
  {
    this.userService.denyUserInvite(inviteId).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "Invite was successfully declined"
        })
        this.userInviteList[this.userInviteList.findIndex(x=>x.id==inviteId)].isConfirm=false;
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
