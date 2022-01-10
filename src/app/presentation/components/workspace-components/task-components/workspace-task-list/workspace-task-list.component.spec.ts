/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WorkspaceTaskListComponent } from './workspace-task-list.component';

describe('MemberTasklistComponent', () => {
  let component: WorkspaceTaskListComponent;
  let fixture: ComponentFixture<WorkspaceTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
