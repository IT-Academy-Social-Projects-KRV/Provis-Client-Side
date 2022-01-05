import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge'
import { MatCardModule } from '@angular/material/card';

import { HomeComponent } from './presentation/components/home/home.component';
import { AboutComponent } from './presentation/components/about/about.component';
import { ContactComponent } from './presentation/components/contact/contact.component';
import { LoginComponent } from './presentation/components/login/login.component';
import { RegistrationComponent } from './presentation/components/registration/registration.component';
import { HeaderComponent } from './presentation/components/header/header.component';
import { FooterComponent } from './presentation/components/footer/footer.component';
import { AddWorkspaceComponent } from './presentation/components/add-workspace/add-workspace.component';
import { WorkspaceListComponent } from './presentation/components/workspace-list/workspace-list.component';
import { UserComponent } from './presentation/components/user/user.component';
import { UserHeaderComponent } from './presentation/components/user-header/user-header.component';
import { UserProfileComponent } from './presentation/components/user-profile/user-profile.component';
import { ConfirmEmailComponent } from './presentation/components/confirm-email/confirm-email.component';
import { MemberManagmentComponent } from './presentation/components/member-managment/member-managment.component';
import { MemberListComponent } from './presentation/components/member-list/member-list.component';
import { MemberCalendarComponent } from './presentation/components/member-calendar/member-calendar.component';

import { AuthInterceptorProvider } from './core/services/auth.interceptor';
import { WorkspaceService } from './core/services/workspace.service';
import { AuthenticationService } from './core/services/authentication.service';
import { UserService } from './core/services/user.service';
import { UserInviteComponent } from './presentation/components/user-invite/user-invite.component';
import { CreateTaskComponent } from './presentation/components/create-task/create-task.component';
import { WorkspaceComponent } from './presentation/components/workspace/workspace.component';
import { WorkspaceInfoComponent } from './presentation/components/workspace-info/workspace-info.component';
import { WorkspaceSettingsComponent } from './presentation/components/workspace-settings/workspace-settings.component';
import { ModalInvitesComponent } from './presentation/components/modal-invites/modal-invites.component';
import { UserLeftmenuComponent } from './presentation/components/user-leftmenu/user-leftmenu.component';
import { TwoSetpVerificationComponent } from './presentation/components/two-step-verification/two-step-verification.component';
import { ChangeTwoFaComponent } from './presentation/components/change-two-fa/change-two-fa.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    FooterComponent,
    AddWorkspaceComponent,
    WorkspaceListComponent,
    UserComponent,
    UserHeaderComponent,
    UserProfileComponent,
    WorkspaceComponent,
    WorkspaceInfoComponent,
    WorkspaceSettingsComponent,
    UserInviteComponent,
    ModalInvitesComponent,
    ConfirmEmailComponent,
    UserLeftmenuComponent,
    MemberManagmentComponent,
    MemberListComponent,
    MemberCalendarComponent,
    CreateTaskComponent,
    TwoSetpVerificationComponent,
    ChangeTwoFaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatBadgeModule,
    MatCardModule
  ],
  providers: [
    AuthInterceptorProvider,
    AuthenticationService,
    WorkspaceService,
    UserService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }