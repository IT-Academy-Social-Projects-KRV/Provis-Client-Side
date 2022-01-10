/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserInviteListComponent } from './user-invite-list.component';

describe('ModalInvitesComponent', () => {
  let component: UserInviteListComponent;
  let fixture: ComponentFixture<UserInviteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInviteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInviteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
