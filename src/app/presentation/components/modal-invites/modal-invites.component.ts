import { UserService } from 'src/app/core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserInvites } from 'src/app/core/models/userInviteList';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-invites',
  templateUrl: './modal-invites.component.html',
  styleUrls: ['./modal-invites.component.css']
})
export class ModalInvitesComponent implements OnInit {

  userInviteList: UserInvites [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserInvite().subscribe((data: UserInvites[])=>{
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
        this.showAlert(err);
      }
    )
  }

  accept(inviteId:number)
  {
    this.userService.acceptUserInvite(inviteId).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "Invite was successfully accepted"
        })
        this.userInviteList[this.userInviteList.findIndex(x=>x.id==inviteId)].isConfirm=true;
      },
      err => {
        this.showAlert(err);
      }
    )
  }
}
