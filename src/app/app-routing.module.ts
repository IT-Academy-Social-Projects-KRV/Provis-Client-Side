import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

import { AboutComponent } from './presentation/components/about/about.component';
import { ContactComponent } from './presentation/components/contact/contact.component';
import { HomeComponent } from './presentation/components/home/home.component';
import { LoginComponent } from './presentation/components/login/login.component';
import { UserComponent } from './presentation/components/user/user.component';
import { RegistrationComponent } from './presentation/components/registration/registration.component';
import { UserProfileComponent } from './presentation/components/user-profile/user-profile.component';
import { WorkspaceListComponent } from './presentation/components/workspace-list/workspace-list.component';
import { WorkspaceComponent } from './presentation/components/workspace/workspace.component';
import { WorkspaceInfoComponent } from './presentation/components/workspace-info/workspace-info.component';
import { WorkspaceSettingsComponent } from './presentation/components/workspace-settings/workspace-settings.component';
import { MemberManagmentComponent } from './presentation/components/member-managment/member-managment.component';
import { MemberListComponent } from './presentation/components/member-list/member-list.component';
import { MemberCalendarComponent } from './presentation/components/member-calendar/member-calendar.component';

const userRouters: Routes = [
  { path: 'workspace/list', component: WorkspaceListComponent},
  { path: 'profile', component: UserProfileComponent},
  { path: 'workspace/:id', component: WorkspaceComponent},
  { path: 'workspaces', component: WorkspaceListComponent},
  { path: 'workspace/:id/managment', component: MemberManagmentComponent, pathMatch: 'full'},
  { path: 'workspace/:id/memberlist', component: MemberListComponent},
  { path: 'workspace/:id/calendar', component: MemberCalendarComponent},
  { path: 'workspace/:id/info', component: WorkspaceInfoComponent},
  { path: 'workspace/:id/settings', component: WorkspaceSettingsComponent}
];

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'user', component: UserComponent, children: userRouters, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
