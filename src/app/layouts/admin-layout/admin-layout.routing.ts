import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import {ClientsComponent} from '../../clients/clients.component';
import {PersonsComponent} from '../../persons/persons.component';
import {ProjectsComponent} from '../../projects/projects.component';
import { DetailsComponent } from '../../details/details.component';
import {TjsComponent} from '../../tjs/tjs.component';
import {ManagersComponent} from '../../managers/managers.component';
import {InterventionsComponent} from '../../interventions/interventions.component';
import {UpdateManagerComponent} from '../../updates-data/update-manager/update-manager.component';
import {UpdatePersonComponent} from '../../updates-data/update-person/update-person.component';
import {UpdateClientComponent} from '../../updates-data/update-client/update-client.component';
import {UpdateProjectComponent} from '../../updates-data/update-project/update-project.component';
import {UpdateTjComponent} from '../../updates-data/update-tj/update-tj.component';



export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'persons',   component: PersonsComponent },
    { path: 'projects',     component: ProjectsComponent },
    { path: 'clients',      component: ClientsComponent },
    { path: 'tjs',      component: TjsComponent },
    {path : 'managers', component: ManagersComponent},
    {path : 'interventions', component: InterventionsComponent},
    {path : 'details', component: DetailsComponent},
    {path : 'update-manager', component: UpdateManagerComponent},
    {path : 'update-person', component: UpdatePersonComponent},
    {path: 'update-client', component: UpdateClientComponent},
    {path: 'update-project', component: UpdateProjectComponent},
    {path: 'update-tj', component: UpdateTjComponent},

];
