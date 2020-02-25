import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {AppComponent} from './app.component';
import {AdminLayoutRoutes} from './layouts/admin-layout/admin-layout.routing';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';

const routes: Routes = [
    {path: 'login' , component : LoginComponent},
    {
        path: '',
        component: AdminLayoutComponent
    }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
       useHash: true
    }),
    RouterModule.forChild(AdminLayoutRoutes)
  ],
  exports: [
      RouterModule
  ],
})
export class AppRouting { }
