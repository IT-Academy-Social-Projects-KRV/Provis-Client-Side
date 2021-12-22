import { UserService } from 'src/app/core/services/user.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { UserInvite } from 'src/app/core/models/userInviteList';

@Component({
  selector: 'app-modal-invites',
  templateUrl: './modal-invites.component.html',
  styleUrls: ['./modal-invites.component.css']
})
export class ModalInvitesComponent implements OnInit {

  userInviteList: UserInvite [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserInvite().subscribe((data: UserInvite[])=>{
      this.userInviteList = data;
    })
  }
}
