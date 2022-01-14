import { Injectable } from '@angular/core';
import { workspaceUserRoles } from '../models/workspace/workspaceUserRole';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

public globalWorkspaceUserRoles: workspaceUserRoles[];

constructor() { }

}
