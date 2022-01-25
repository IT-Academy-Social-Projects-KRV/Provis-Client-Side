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
import { MatSelectModule } from '@angular/material/select';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatExpansionModule} from '@angular/material/expansion';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';

import { HomeComponent } from './presentation/components/home-components/home/home.component';
import { AboutComponent } from './presentation/components/home-components/about/about.component';
import { ContactComponent } from './presentation/components/home-components/contact/contact.component';
import { LoginComponent } from './presentation/components/home-components/login/login.component';
import { RegistrationComponent } from './presentation/components/home-components/registration/registration.component';
import { HeaderComponent } from './presentation/components/home-components/header/header.component';
import { FooterComponent } from './presentation/components/home-components/footer/footer.component';
import { WorkspaceCreateComponent } from './presentation/components/workspace-components/workspace-create/workspace-create.component';
import { UserWorkspaceListComponent } from './presentation/components/user-components/user-workspace-list/user-workspace-list.component';
import { UserComponent } from './presentation/components/user-components/user/user.component';
import { UserMenuComponent } from './presentation/components/user-components/user-menu/user-menu.component';
import { UserProfileComponent } from './presentation/components/user-components/user-profile/user-profile.component';
import { ConfirmEmailComponent } from './presentation/components/user-components/confirm-email/confirm-email.component';
import { WorkspaceMemberManagmentComponent } from './presentation/components/workspace-components/workspace-member-managment/workspace-member-managment.component';
import { WorkspaceMemberListComponent } from './presentation/components/workspace-components/workspace-member-list/workspace-member-list.component';
import { WorkspaceCalendarComponent } from './presentation/components/workspace-components/workspace-calendar/workspace-calendar.component';
import { WorkspaceTaskListComponent } from './presentation/components/workspace-components/task-components/workspace-task-list/workspace-task-list.component';
import { WorkspaceUserTaskListComponent } from './presentation/components/workspace-components/task-components/workspace-user-task-list/workspace-user-task-list.component';
import { WorkspaceTaskAttachmentsComponent } from './presentation/components/workspace-components/task-components/workspace-task-attachments/workspace-task-attachments.component';
import { WorkspaceTaskAssignComponent } from './presentation/components/workspace-components/task-components/workspace-task-assign/workspace-task-assign.component';

import { AuthInterceptorProvider } from './core/services/interceptors/auth.interceptor';
import { WorkspaceService } from './core/services/workspace.service';
import { AuthenticationService } from './core/services/authentication.service';
import { UserService } from './core/services/user.service';
import { WorkspaceInviteComponent } from './presentation/components/workspace-components/workspace-invite/workspace-invite.component';
import { WorkspaceTaskCreateComponent } from './presentation/components/workspace-components/task-components/workspace-task-create/workspace-task-create.component';
import { WorkspaceComponent } from './presentation/components/workspace-components/workspace/workspace.component';
import { WorkspaceInfoComponent } from './presentation/components/workspace-components/workspace-info/workspace-info.component';
import { WorkspaceSettingsComponent } from './presentation/components/workspace-components/workspace-settings/workspace-settings.component';
import { UserInviteListComponent } from './presentation/components/user-components/user-invite-list/user-invite-list.component';
import { WorkspaceMenuComponent } from './presentation/components/workspace-components/workspace-menu/workspace-menu.component';
import { WorkspaceUpdateComponent } from './presentation/components/workspace-components/workspace-update/workspace-update.component';
import { TwoSetpVerificationComponent } from './presentation/components/user-components/two-step-verification/two-step-verification.component';
import { ChangeTwoFaComponent } from './presentation/components/user-components/change-two-fa/change-two-fa.component';
import { AlertService } from './core/services/alerts.service';
import { ErrorInterceptorProvider } from './core/services/interceptors/error.interceptor';
import { IfUserRolesDirective } from './core/directives/IfUserRoles.directive';
import { WorkspaceTaskEditComponent } from './presentation/components/workspace-components/task-components/workspace-task-edit/workspace-task-edit.component';
import { DataShareService } from './core/services/DataShare.service';
import { WorkspaceTaskHistoryComponent } from './presentation/components/workspace-components/task-components/workspace-task-history/workspace-task-history.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SpinLoaderComponent } from './presentation/components/common components/spin-loader/spin-loader.component';
import { CommentService } from './core/services/comment.service';
import { TaskCommentsComponent } from './presentation/components/workspace-components/task-components/comment-components/task-comments/task-comments.component';
import { TaskCommentEditComponent } from './presentation/components/workspace-components/task-components/comment-components/task-comment-edit/task-comment-edit.component';


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
    WorkspaceCreateComponent,
    UserWorkspaceListComponent,
    UserComponent,
    UserMenuComponent,
    UserProfileComponent,
    WorkspaceComponent,
    WorkspaceInfoComponent,
    WorkspaceSettingsComponent,
    WorkspaceInviteComponent,
    UserInviteListComponent,
    ConfirmEmailComponent,
    WorkspaceMenuComponent,
    WorkspaceMemberManagmentComponent,
    WorkspaceMemberListComponent,
    WorkspaceCalendarComponent,
    WorkspaceTaskCreateComponent,
    TwoSetpVerificationComponent,
    ChangeTwoFaComponent,
    WorkspaceTaskListComponent,
    WorkspaceTaskCreateComponent,
    WorkspaceUpdateComponent,
    WorkspaceUserTaskListComponent,
    WorkspaceTaskAttachmentsComponent,
    WorkspaceTaskAssignComponent,
    WorkspaceTaskEditComponent,
    WorkspaceTaskHistoryComponent,
    IfUserRolesDirective,
    WorkspaceTaskEditComponent,
    SpinLoaderComponent,
    TaskCommentsComponent,
    TaskCommentEditComponent

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
    MatCardModule,
    MatSelectModule,
    CdkAccordionModule,
    MatExpansionModule,
    DragDropModule,
    MatListModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  providers: [
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthenticationService,
    WorkspaceService,
    UserService,
    AlertService,
    DataShareService,
    CommentService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
