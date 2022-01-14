import { Directive, OnInit, TemplateRef, Input, ViewContainerRef } from '@angular/core';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[appIfUserRoles]'
})
export class IfUserRolesDirective implements OnInit {

  @Input() public appIfUserRoles: Array<number>;

  // need change this variable
  currentUserRole: number = 3;

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>) { }

  ngOnInit(): void {
    console.log(this.appIfUserRoles);

    if(this.appIfUserRoles.indexOf(this.currentUserRole) != -1)
    {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      console.log('yes');
    } else {
      this.viewContainerRef.clear();
    }
  };


}


