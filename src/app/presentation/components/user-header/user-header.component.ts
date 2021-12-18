import { AuthenticationService } from './../../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../../core/models/userInfo'
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
  providers: [AuthenticationService]
})
export class UserHeaderComponent implements OnInit {
  
  userMessageCount = '2';
  userName: string | undefined;
  
  constructor(private authenticationService: AuthenticationService, private router: Router) { }
  
  ngOnInit() {
    this.userName = this.authenticationService.currentUser.Username?.toString();
  }

  toggle = false;
  toggleDropmenu() {
    this.toggle = !this.toggle;
  }

  logout(){
    this.authenticationService.Logout().subscribe(()=>{
      this.router.navigate(['']);
    });
  }

}
