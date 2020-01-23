import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ClientsComponent } from '../../clients/clients.component';
import { TjsComponent } from '../../tjs/tjs.component';
import { ManagersComponent } from '../../managers/managers.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';

import {PersonsComponent} from '../../persons/persons.component';
import {ProjectsComponent} from '../../projects/projects.component';
import {MatListModule} from '@angular/material/list';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTabsModule,
    MatListModule,
  ],
  declarations: [
    DashboardComponent,
    ClientsComponent,
    TjsComponent,
    PersonsComponent,
    ManagersComponent,

    PersonsComponent,
    ProjectsComponent

  ]
})

export class AdminLayoutModule {}
