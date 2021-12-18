import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './core/services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'provis';

  constructor(private authService: AuthenticationService, private Router: Router) {}

  async ngOnInit(): Promise<void> {
    if(await this.authService.isAuthenticated()) {
      this.Router.navigate(['user/workspace/list']);
    }
  }
}

