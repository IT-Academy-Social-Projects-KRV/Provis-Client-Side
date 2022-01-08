import { AuthenticationService } from './../../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalInvitesComponent } from '../modal-invites/modal-invites.component';
import { UserService } from './../../../core/services/user.service';
import { UserInfoActiveInvites } from '../../../core/models/user/userInfoActiveInvites';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
  providers: [AuthenticationService]
})

export class UserHeaderComponent implements OnInit {
  
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
    const dialogRef = this.dialog.open(ModalInvitesComponent);
  }
}
