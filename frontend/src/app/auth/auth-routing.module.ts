import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form';
import { RegistrationFormComponent } from './registration-form';
import { LoginComponent } from './login.component';
import { RegistrationComponent } from './registration.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
  static components = [
    LoginComponent,
    LoginFormComponent,
    RegistrationComponent,
    RegistrationFormComponent,
  ];
}
