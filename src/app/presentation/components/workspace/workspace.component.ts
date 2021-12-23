import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  protected routeSub: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params)
      console.log(params['id'])
    });
  }
  
  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

  MoveToInvite(){
    
  }
}
