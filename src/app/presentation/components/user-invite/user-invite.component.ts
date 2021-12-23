import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInvite } from 'src/app/core/models/userInvite';


@Component({
  selector: 'app-user',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.css']
})
export class UserInviteComponent implements OnInit {

    userInvite: UserInvite;

 constructor(private router: Router) {}

  ngOnInit() {
   }

    Invite(): void{
        
    }
}
