import { workspaceUserRoles } from './../models/workspace/workspaceUserRole';
import Swal from 'sweetalert2';
import { Injectable, Input } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { GlobalVariablesService } from '../services/globalVariables.service';


@Injectable({
  providedIn: 'root'
})


export class PermissionGuard implements CanActivate {
  // need change this variable
  currentUserRole: number = 3;

  constructor(private router: Router, private globalVariables: GlobalVariablesService){}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {

    let allowedUserRoles = route.data['userRoles'];

    console.log(this.globalVariables.globalWorkspaceUserRoles);
    if(allowedUserRoles.indexOf(this.currentUserRole) != -1) {
      return true;
    }

    this.showErrorAlert('you have no permission to view this page');
    this.router.navigate(['']);

    return false;
  }

  showErrorAlert(error: string){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'No permission',
      text: error,
      showConfirmButton: false,
      timer: 2000
    });
  }

}
