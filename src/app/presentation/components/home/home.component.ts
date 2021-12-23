import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
 
  constructor(private AuthService: AuthenticationService, private router: Router) { }

  async ngOnInit(): Promise<void> {

    if(await this.AuthService.isAuthenticated())
    {
      this.router.navigate(['/user/workspaces']);
    }
  }
  
}
