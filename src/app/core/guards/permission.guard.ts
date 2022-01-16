import { WorkspaceService } from './../services/workspace.service';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { firstValueFrom, map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PermissionGuard implements CanActivate {

  currentUserRole: number;
  workspaceId: number;
  allowedUserRoles: number[];

  constructor(private router: Router, private workspaceService: WorkspaceService, private activeRoute: ActivatedRoute){}

  async canActivate(route: ActivatedRouteSnapshot) : Promise<boolean>{

    if(route.routeConfig?.data){
      this.allowedUserRoles = route.routeConfig.data['userRoles'];
      this.workspaceId = route.parent?.params['id'];
      this.currentUserRole = (await firstValueFrom(this.workspaceService.getWorkspaceInfo(this.workspaceId))).role;

      if(this.allowedUserRoles.indexOf(this.currentUserRole) != -1) {
        return true;
      }

      this.showErrorAlert('you have no permission to view this page');
      this.router.navigate(['']);

      return false;
    }
    return true;
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
