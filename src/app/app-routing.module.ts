import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './presentation/components/about/about.component';
import { ContactComponent } from './presentation/components/contact/contact.component';
import { HomeComponent } from './presentation/components/home/home.component';
import { LoginComponent } from './presentation/components/login/login.component';

import { RegistrationComponent } from './presentation/components/registration/registration.component';
import { WorkspaceListComponent } from './presentation/components/workspace-list/workspace-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'workspacelist', component: WorkspaceListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
