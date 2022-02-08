import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChangeSprint } from 'src/app/core/models/sprint/addSprint';
import { SprintDetailInfo } from 'src/app/core/models/sprint/SprintDetailInfo';
import { AlertService } from 'src/app/core/services/alerts.service';
import { DataShareService } from 'src/app/core/services/dataShare.service';
import { SprintService } from 'src/app/core/services/sprint.service';

@Component({
  selector: 'app-change-sprint',
  templateUrl: './change-sprint.component.html',
  styleUrls: ['./change-sprint.component.css']
})
export class ChangeSprintComponent implements OnInit {

  @Input() public workspaceId: number;
  @Input() public sprintId: number;

  sprintForm: FormGroup;
  sprintModel: ChangeSprint = new ChangeSprint;

  constructor(private formBuilder: FormBuilder,
    private sprintService: SprintService,
    private alertService: AlertService,
    private dataShareService: DataShareService,
    public dialog: MatDialog) {
    this.sprintForm = formBuilder.group({
      "name":["",[Validators.maxLength(50), Validators.required]],
      "description":[null, [Validators.maxLength(500)]],
      "dateOfStart":[],
      "dateOfEnd": []
    },
    {
      validators: [this.checkDate]
    })
   }

  ngOnInit() {
    this.sprintService.GetDetailSprintInfo(this.workspaceId, this.sprintId).subscribe(data => {
      this.sprintForm.patchValue(data);

      if(data.dateOfStart)
        this.sprintForm.controls['dateOfStart']
          .setValue(formatDate(data.dateOfStart, 'yyyy-MM-dd','en'));

      if(data.dateOfEnd)
        this.sprintForm.controls['dateOfEnd']
          .setValue(formatDate(data.dateOfEnd, 'yyyy-MM-dd','en'));
    });
  }

  checkDate(g: FormGroup) {
    let isInvalid = (g.get('dateOfStart')?.value && g.get('dateOfEnd')?.value) &&
      (g.get('dateOfStart')?.value > g.get('dateOfEnd')?.value);
    if(isInvalid) {
      g.get('dateOfEnd')?.setErrors({invalidDate: true});
    }
  }

  updateSprint() {
    if(this.sprintForm.valid) {
      this.sprintModel = Object.assign({}, this.sprintForm.value);

      if(this.sprintModel.dateOfEnd?.toString() == '')
        this.sprintModel.dateOfEnd = undefined;

      if(this.sprintModel.dateOfStart?.toString() == '')
        this.sprintModel.dateOfStart = undefined;

      this.sprintService.updateSprint(this.workspaceId, this.sprintId, this.sprintModel).subscribe(()=>{
        let updateSprint: SprintDetailInfo = new SprintDetailInfo();

        updateSprint.id = this.sprintId;
        updateSprint.name = this.sprintModel.name;
        updateSprint.description = this.sprintModel.description;
        updateSprint.dateOfStart = this.sprintModel.dateOfStart;
        updateSprint.dateOfEnd = this.sprintModel.dateOfEnd;
        this.dataShareService.nextUpdateSprint(updateSprint);

        this.dialog.closeAll();
      }, err=> {
        this.alertService.errorMessage(err);
      })
    }
  }

}
