import { UserService } from 'src/app/core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserInvite } from 'src/app/core/models/user/userInvite';
import { AlertService } from 'src/app/core/services/alerts.service';

@Component({
  selector: 'app-user-invite-list',
  templateUrl: './user-invite-list.component.html',
  styleUrls: ['./user-invite-list.component.css']
})
export class UserInviteListComponent implements OnInit {

  userInviteList: UserInvite [];
  isLoading: boolean = false;

  constructor(private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.isLoading = true;
    this.userService.getUserInvite().subscribe((data: UserInvite[])=>{
      this.userInviteList = data;
      this.isLoading = false;
    });
  }

  isEmpty(length: number): boolean{
    if(length == 0)
      return true;
    return false;
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
