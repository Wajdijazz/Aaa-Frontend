import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import {ClientsComponent} from '../../clients/clients.component';
import {PersonsComponent} from '../../persons/persons.component';
import {ProjectsComponent} from '../../projects/projects.component';
import { DetailsComponent } from '../../details/details.component';
import {TjsComponent} from '../../tjs/tjs.component';
import {ManagersComponent} from '../../managers/managers.component';
import {InterventionsComponent} from '../../interventions/interventions.component';



export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'persons',   component: PersonsComponent },
    { path: 'projects',     component: ProjectsComponent },
    { path: 'clients',      component: ClientsComponent },
    { path: 'tjs',      component: TjsComponent },
    {path : 'managers', component: ManagersComponent},
    {path : 'interventions', component: InterventionsComponent},
    {path : 'details', component: DetailsComponent},



];
