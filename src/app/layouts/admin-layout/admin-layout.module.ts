import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ClientsComponent } from '../../clients/clients.component';
import { TjsComponent } from '../../tjs/tjs.component';
import { ManagersComponent } from '../../managers/managers.component';
import {MatDatepickerModule} from '@angular/material/datepicker';


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,

} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';

import {PersonsComponent} from '../../persons/persons.component';
import {ProjectsComponent} from '../../projects/projects.component';
import {MatListModule} from '@angular/material/list';
import {InterventionsComponent} from '../../interventions/interventions.component';
import {MatNativeDateModule} from '@angular/material/core';
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
    MatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    DashboardComponent,
    ClientsComponent,
    TjsComponent,
    PersonsComponent,
    ManagersComponent,

    PersonsComponent,
    ProjectsComponent,
      InterventionsComponent

  ]
})

export class AdminLayoutModule {}
