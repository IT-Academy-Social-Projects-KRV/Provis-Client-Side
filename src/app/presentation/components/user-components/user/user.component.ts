import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceRole } from 'src/app/core/models/workspace/workspaceRole';
import { DataShareService } from 'src/app/core/services/dataShare.service';
import { WorkspaceService } from 'src/app/core/services/workspace.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

 constructor(private router: Router, private workspaceService: WorkspaceService, private dataShareService: DataShareService) {}

  ngOnInit() {
    this.workspaceService.getWorkspaceRoles().subscribe((data: WorkspaceRole[]) =>{
      this.dataShareService.nextWorkspaceRoles(data);
    })

    if(this.router.url=='/user')
    this.router.navigate(['user/workspace/list']);
   }

}
