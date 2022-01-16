import { Directive, OnInit, TemplateRef, Input, ViewContainerRef } from '@angular/core';
import { DataShareService } from '../services/DataShare.service';


@Directive({
  selector: '[appIfUserRoles]'
})

export class IfUserRolesDirective implements OnInit {

  @Input() public appIfUserRoles: Array<number>;

  currentUserRole: number;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private dataShare: DataShareService) { }

  ngOnInit() {
    this.dataShare.workspaceInfo.subscribe(data => {
      this.currentUserRole = data.role;

      if(this.appIfUserRoles.indexOf(this.currentUserRole) != -1) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  };

}
