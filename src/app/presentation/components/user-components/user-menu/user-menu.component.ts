import { AuthenticationService } from '../../../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserInviteListComponent } from '../user-invite-list/user-invite-list.component';
import { UserService } from '../../../../core/services/user.service';
import { UserInfoActiveInvites } from '../../../../core/models/user/userInfoActiveInvites';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
  providers: [AuthenticationService]
})

export class UserMenuComponent implements OnInit {
  
  userName: string | undefined;
  invite: boolean | undefined;

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.userName = this.authenticationService.currentUser.username?.toString();
    this.userService.getActiveInvites().subscribe((data: UserInfoActiveInvites)=>{
       this.invite = data.isActiveInvite;
    });
  }

  logout(){
    this.authenticationService.Logout().subscribe(()=>{
      this.router.navigate(['']);
    });
  }

  modalInvites() {
    const dialogRef = this.dialog.open(UserInviteListComponent);
  }
}
