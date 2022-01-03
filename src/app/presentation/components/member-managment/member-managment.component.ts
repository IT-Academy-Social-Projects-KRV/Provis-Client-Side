import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { numbers } from '@material/slider';
import { WorkspaceMembers } from 'src/app/core/models/workspaceUsersList';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member-managment',
  templateUrl: './member-managment.component.html',
  styleUrls: ['./member-managment.component.css']
})
export class MemberManagmentComponent implements OnInit {

  workspaceId: number;
  workspaceUserList: WorkspaceMembers[];
  constructor(private workspServise: WorkspaceService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.workspaceId = Number(this.route.snapshot.paramMap.get('id'))
    this.workspServise.getWorkspaceUserList(this.workspaceId).subscribe(data=>{
      this.workspaceUserList=data;})
      
  })}

  delete(userId:string): void{
    this.workspServise.delUserFromWorksp(this.workspaceId, userId).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "User was successfully deleted"
        })
        // window.location.reload();
      }
    )
  }
}
