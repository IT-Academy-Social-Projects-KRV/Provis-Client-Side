import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { delay, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { WorkspaceDescription } from '../../models/workspace/workspaceDescription';

@Injectable({
  providedIn: 'root'
})

export class EditTaskResolver implements Resolve<any>{

  constructor(private router: Router, private workspaceService: WorkspaceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WorkspaceDescription> {
    let workspaceId = +route.parent?.params['id'];
    let description = this.workspaceService.getWorkspaceDecscription(workspaceId);
    return description.pipe(delay(4000));
  }
}
