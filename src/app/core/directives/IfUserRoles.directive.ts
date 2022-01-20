import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { Directive, OnInit, TemplateRef, Input, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Directive({
  selector: '[appIfUserRoles]'
})

export class IfUserRolesDirective implements OnInit {

  @Input() public appIfUserRoles: Array<number>;

  currentUserRole: number;
  isVisible: boolean = false;
  workspaceId: number;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private route: ActivatedRoute,
    private workspaceService: WorkspaceService) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.workspaceId = data['id'];

      this.workspaceService.getWorkspaceInfo(this.workspaceId).subscribe(data => {
        this.currentUserRole = data.role;

        if(this.appIfUserRoles.indexOf(this.currentUserRole) != -1) {
          if (!this.isVisible) {
            this.isVisible = true;
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          } else {
            this.isVisible = false;
            this.viewContainerRef.clear();
          }
        }
      })
    });
  }
}