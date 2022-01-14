import { DataShareService } from 'src/app/core/services/DataShare.service';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { GlobalVariablesService } from '../services/globalVariables.service';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class PermissionGuard implements CanActivate {

  currentUserRole: number;

  constructor(private router: Router, private globalVariables: GlobalVariablesService, private dataShare: DataShareService){}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {

    let allowedUserRoles = route.data['userRoles'];

    this.currentUserRole = (await firstValueFrom(this.dataShare.workspaceInfo)).role;

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
