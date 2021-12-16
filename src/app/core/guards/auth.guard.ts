import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    
    if(await this.authenticationService.isAuthenticated())
    {
      return true;
    }

    this.showErrorAlert('you need authorization'); 
    this.router.navigate(['login']);

    return false;
  }

  showErrorAlert(error: string){
    Swal.fire({
      position: 'top-right',
      icon: 'error',
      title: '',
      text: error,
      showConfirmButton: false,
      timer: 1000
    });
  }
}
