import {NgModule} from '@angular/core';
import {AppComponent} from '../../app.component';
import {AdminLayoutComponent} from './admin-layout.component';
import {LoginComponent} from '../../login/login.component';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {ClientsComponent} from '../../clients/clients.component';
import {TjsComponent} from '../../tjs/tjs.component';
import {PersonsComponent} from '../../persons/persons.component';
import {ManagersComponent} from '../../managers/managers.component';
import {DetailsComponent} from '../../details/details.component';
import {ProjectsComponent} from '../../projects/projects.component';
import {InterventionsComponent} from '../../interventions/interventions.component';
import {UpdateManagerComponent} from '../../updates-data/update-manager/update-manager.component';
import {UpdatePersonComponent} from '../../updates-data/update-person/update-person.component';
import {UpdateClientComponent} from '../../updates-data/update-client/update-client.component';
import {UpdateProjectComponent} from '../../updates-data/update-project/update-project.component';
import {UpdateTjComponent} from '../../updates-data/update-tj/update-tj.component';
import {DetailsWorkComponent} from '../../details-work/details-work.component';
import {CalendarComponent} from '../../calendar/calendar.component';
import {MatModule} from '../../mat.module';
import {RouterModule} from '@angular/router';
import {AdminLayoutRoutes} from './admin-layout.routing';

@NgModule({
    imports: [
        MatModule,
        RouterModule.forChild(AdminLayoutRoutes)
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        LoginComponent,
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
    exports: [
    ]
})

export class AdminLayoutModule {
}
