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
import { WorkspaceListComponent } from './presentation/components/workspace-list/workspace-list.component'
import { UserComponent } from './presentation/components/user/user.component';
import { UserHeaderComponent} from './presentation/components/user-header/user-header.component';
import { UserProfileComponent } from './presentation/components/user-profile/user-profile.component';

import { AuthInterceptorProvider } from './core/services/auth.interceptor';
import { WorkspaceService } from './core/services/workspace.service';
import { AuthenticationService } from './core/services/authentication.service';
import { UserService } from './core/services/user.service';
import { UserInviteComponent } from './presentation/components/user-invite/user-invite.component';

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
    WorkspaceListComponent,
    UserComponent,
    UserHeaderComponent,
    UserProfileComponent,
    UserInviteComponent
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
