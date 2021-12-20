import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-invites',
  templateUrl: './modal-invites.component.html',
  styleUrls: ['./modal-invites.component.css']
})
export class ModalInvitesComponent implements OnInit {

  userId: string;
  userName: string | undefined;

  constructor(private authenticationService: AuthenticationService) { }


  ngOnInit() {
    if (this.authenticationService.currentUser.Id)
      this.userId = this.authenticationService.currentUser.Id;

      console.log(this.userId);


    }

}
