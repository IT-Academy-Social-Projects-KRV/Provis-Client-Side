import { AuthenticationService } from './../../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../../core/models/userInfo'
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
  providers: [AuthenticationService]
})

export class UserHeaderComponent implements OnInit {
  
  userMessageCount = '2';
  userName: string | undefined;
  
  constructor(private authenticationService: AuthenticationService, private router: Router, public dialog: MatDialog) { }
    
  ngOnInit() {
    this.userName = this.authenticationService.currentUser.Username?.toString();
  }

   logout(){
    this.authenticationService.Logout().subscribe(()=>{
      this.router.navigate(['']);
    });
  }

  modalInvites() {
    const dialogRef = this.dialog.open(ModalInvitesComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
@Component({
  selector: 'modal-invites',
  templateUrl: '../modal-invites/modal-invites.component.html',
})
export class ModalInvitesComponent {}