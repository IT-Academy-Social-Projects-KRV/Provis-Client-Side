import { PermissionGuard } from './core/guards/permission.guard';
import { WorkspaceTaskListComponent } from './presentation/components/workspace-components/task-components/workspace-task-list/workspace-task-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

import { AboutComponent } from './presentation/components/home-components/about/about.component';
import { ContactComponent } from './presentation/components/home-components/contact/contact.component';
import { HomeComponent } from './presentation/components/home-components/home/home.component';
import { LoginComponent } from './presentation/components/home-components/login/login.component';
import { UserComponent } from './presentation/components/user-components/user/user.component';
import { RegistrationComponent } from './presentation/components/home-components/registration/registration.component';
import { UserProfileComponent } from './presentation/components/user-components/user-profile/user-profile.component';
import { UserWorkspaceListComponent } from './presentation/components/user-components/user-workspace-list/user-workspace-list.component';
import { WorkspaceComponent } from './presentation/components/workspace-components/workspace/workspace.component';
import { ConfirmEmailComponent } from './presentation/components/user-components/confirm-email/confirm-email.component';
import { WorkspaceInfoComponent } from './presentation/components/workspace-components/workspace-info/workspace-info.component';
import { WorkspaceSettingsComponent } from './presentation/components/workspace-components/workspace-settings/workspace-settings.component';
import { WorkspaceMemberManagmentComponent } from './presentation/components/workspace-components/workspace-member-managment/workspace-member-managment.component';
import { WorkspaceMemberListComponent } from './presentation/components/workspace-components/workspace-member-list/workspace-member-list.component';
import { WorkspaceCalendarComponent } from './presentation/components/workspace-components/workspace-calendar/workspace-calendar.component';
import { TwoSetpVerificationComponent } from './presentation/components/user-components/two-step-verification/two-step-verification.component';

const userWorkspaceRouters: Routes = [
  {
    path: 'managment',
    component: WorkspaceMemberManagmentComponent,
    canActivate: [PermissionGuard],
    data:{
      userRoles: [1, 2]
    }
  },
  { path: 'memberlist', component: WorkspaceMemberListComponent},
  { path: 'calendar', component: WorkspaceCalendarComponent},
  { path: 'info', component: WorkspaceInfoComponent},
  { path: 'tasklist', component: WorkspaceTaskListComponent},
  {
    path: 'settings',
    component: WorkspaceSettingsComponent,
    canActivate: [PermissionGuard],
    data:{
      userRoles: [1]
    }
  }
];

const userRouters: Routes = [
  { path: 'workspace/list', component: UserWorkspaceListComponent},
  { path: 'profile', component: UserProfileComponent},
  { path: 'workspaces', component: UserWorkspaceListComponent},
  { path: 'workspace/:id', component: WorkspaceComponent, children: userWorkspaceRouters, canActivate: [AuthGuard]},
  { path: 'profile', component: UserProfileComponent },
  { path: 'confirmemail', component: ConfirmEmailComponent },
];

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  {path: 'twoStepVerification', component: TwoSetpVerificationComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'user', component: UserComponent, children: userRouters, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
