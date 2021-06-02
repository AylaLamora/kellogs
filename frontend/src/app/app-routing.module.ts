import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path: 'principal',component: PrincipalComponent},
  {path: '', pathMatch:'full', redirectTo:'principal' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
