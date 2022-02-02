import { AuthenticationService } from '../../../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserInviteListComponent } from '../user-invite-list/user-invite-list.component';
import { UserService } from '../../../../core/services/user.service';
import { UserInfoActiveInvites } from '../../../../core/models/user/userInfoActiveInvites';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
  providers: [AuthenticationService]
})

export class UserMenuComponent implements OnInit {
  
  userName: string | undefined;
  invite: boolean | undefined;
  public isExternalAuth: boolean;

  constructor(private authenticationService: AuthenticationService, private userService: UserService, 
    private router: Router, public dialog: MatDialog, private _socialAuthService: SocialAuthService) { }

  ngOnInit() {
    this.userName = this.authenticationService.currentUser.username?.toString();
    this.userService.getActiveInvites().subscribe((data: UserInfoActiveInvites)=>{
       this.invite = data.isActiveInvite;
    })
    this._socialAuthService.authState.subscribe(user => {
      this.isExternalAuth = user != null;
    });
  }

  logout(){
    this.authenticationService.Logout().subscribe(()=>{
      
      if (this.isExternalAuth) {
        this.authenticationService.signOutExternal();
      }
      this.router.navigate(['']);
    });
  }

  modalInvites() {
    const dialogRef = this.dialog.open(UserInviteListComponent);
  }
}
