/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WorkspaceMemberListComponent } from './workspace-member-list.component';

describe('MemberListComponent', () => {
  let component: WorkspaceMemberListComponent;
  let fixture: ComponentFixture<WorkspaceMemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceMemberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
