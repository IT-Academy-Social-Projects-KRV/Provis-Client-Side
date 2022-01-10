/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WorkspaceMemberManagmentComponent } from './workspace-member-managment.component';

describe('MemberManagmentComponent', () => {
  let component: WorkspaceMemberManagmentComponent;
  let fixture: ComponentFixture<WorkspaceMemberManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceMemberManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceMemberManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
