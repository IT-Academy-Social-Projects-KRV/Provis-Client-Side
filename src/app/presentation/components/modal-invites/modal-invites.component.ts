import { UserService } from 'src/app/core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserInvite } from 'src/app/core/models/user/userInvite';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alerts.service';

@Component({
  selector: 'app-modal-invites',
  templateUrl: './modal-invites.component.html',
  styleUrls: ['./modal-invites.component.css']
})
export class ModalInvitesComponent implements OnInit {

  userInviteList: UserInvite [];

  constructor(private userService: UserService, 
    private router: Router, 
    private alertService: AlertService) { }

  ngOnInit() {
    this.userService.getUserInvite().subscribe((data: UserInvite[])=>{
      this.userInviteList = data;
    })
  }

  deny(inviteId:number)
  {
    this.userService.denyUserInvite(inviteId).subscribe(
      () => {
        this.alertService.successMessage("Invite was successfully declined")
        this.userInviteList[this.userInviteList.findIndex(x=>x.id==inviteId)].isConfirm=false;
      },
      err => {
        this.alertService.errorMessage(err);
      }
    )
  }

  accept(inviteId:number)
  {
    this.userService.acceptUserInvite(inviteId).subscribe(
      () => {
        this.alertService.successMessage('Invite was successfully accepted')
        this.userInviteList[this.userInviteList.findIndex(x=>x.id==inviteId)].isConfirm=true;
      },
      err => {
        this.alertService.errorMessage(err);
      }
    )
  }
}
