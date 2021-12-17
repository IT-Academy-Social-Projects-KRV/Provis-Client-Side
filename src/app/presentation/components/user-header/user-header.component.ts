import { AuthenticationService } from './../../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../../core/models/userInfo'

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
  providers: [AuthenticationService]
})
export class UserHeaderComponent implements OnInit {
  
  userMessageCount = '2';
  userName: string | undefined;
  
  constructor(private authenticationService: AuthenticationService) { }
  
  ngOnInit() {
    this.userName = this.authenticationService.currentUser.Username?.toString();
    console.log(this.userName);
  }

  toggle = false;
  toggleDropmenu() {
    this.toggle = !this.toggle;
  }

}
