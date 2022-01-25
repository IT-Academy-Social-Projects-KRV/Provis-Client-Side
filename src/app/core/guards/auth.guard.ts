import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import Swal from 'sweetalert2';
import { AlertService } from '../services/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private alertService: AlertService) { }

  async canActivate(): Promise<boolean> {

    if(await this.authenticationService.isAuthenticatedWithRefreshToken())
    {
      return true;
    }

    this.alertService.successMessage('you need authorization');
    this.router.navigate(['login']);

    return false;
  }
}
