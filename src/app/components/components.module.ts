import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatIconModule} from '@angular/material/icon';
import {CalendarComponent} from '../calendar/calendar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
    ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CalendarComponent

  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CalendarComponent

  ]
})
export class ComponentsModule { }
