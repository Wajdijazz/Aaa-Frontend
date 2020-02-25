import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRouting} from './app.routing';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from './login/login.component';


// Import module for angular-calendar
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {CommonModule} from '@angular/common';
import {FlatpickrModule} from 'angularx-flatpickr';
import {FooterComponent} from './components/footer/footer.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ClientsComponent} from './clients/clients.component';
import {TjsComponent} from './tjs/tjs.component';
import {PersonsComponent} from './persons/persons.component';
import {ManagersComponent} from './managers/managers.component';
import {DetailsComponent} from './details/details.component';
import {ProjectsComponent} from './projects/projects.component';
import {InterventionsComponent} from './interventions/interventions.component';
import {UpdateManagerComponent} from './updates-data/update-manager/update-manager.component';
import {UpdatePersonComponent} from './updates-data/update-person/update-person.component';
import {UpdateClientComponent} from './updates-data/update-client/update-client.component';
import {UpdateProjectComponent} from './updates-data/update-project/update-project.component';
import {UpdateTjComponent} from './updates-data/update-tj/update-tj.component';
import {DetailsWorkComponent} from './details-work/details-work.component';
import {CalendarComponent} from './calendar/calendar.component';

import {BrowserModule} from '@angular/platform-browser';
import {MatModule} from './mat.module';


@NgModule({
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        LoginComponent,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        DashboardComponent,
        ClientsComponent,
        TjsComponent,
        PersonsComponent,
        ManagersComponent,
        DetailsComponent,
        PersonsComponent,
        ProjectsComponent,
        InterventionsComponent,
        UpdateManagerComponent,
        UpdatePersonComponent,
        UpdateClientComponent,
        UpdateProjectComponent,
        UpdateTjComponent,
        DetailsWorkComponent,
        CalendarComponent
    ],
    imports: [
        MatModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        AppRouting,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        FlatpickrModule.forRoot(),
        ReactiveFormsModule,
    ],
    providers: [
        // InterventionService,
        // PersonService,
        // ProjectService,
        // TjService,
        // ClientService,
        // DatasetService,
        // ManagerService
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        CalendarComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
