import { AuthenticationService } from './../../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { MatDialog } from '@angular/material/dialog';
import { ModalInvitesComponent } from '../modal-invites/modal-invites.component';
=======
import { UserService } from './../../../core/services/user.service';
import{ ActiveInvites } from './../../../core/models/activeInvites';
>>>>>>> feat: logic that set if there are active invites

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
  providers: [AuthenticationService]
})

export class UserHeaderComponent implements OnInit {
  
  userName: string | undefined;
  
  constructor(private authenticationService: AuthenticationService, private router: Router, public dialog: MatDialog) { }
    
  // invite: boolean | undefined;

  // constructor(private authenticationService: AuthenticationService,private userService: UserService, private router: Router) { }
  
  ngOnInit() {
    this.userName = this.authenticationService.currentUser.Username?.toString();
    this.userService.getActiveInvites().subscribe((data: ActiveInvites)=>{
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
