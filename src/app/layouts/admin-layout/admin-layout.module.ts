import {NgModule} from '@angular/core';
import {MatModule} from '../../mat.module';
import {RouterModule} from '@angular/router';
import {AdminLayoutRoutes} from './admin-layout.routing';
<<<<<<< HEAD
=======
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {ClientsComponent} from '../../clients/clients.component';
import {TjsComponent} from '../../tjs/tjs.component';
import {ManagersComponent} from '../../managers/managers.component';
import {DetailsComponent} from '../../details/details.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';

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
import {UpdateManagerComponent} from '../../updates-data/update-manager/update-manager.component';
import {UpdatePersonComponent} from '../../updates-data/update-person/update-person.component';
import {UpdateClientComponent} from '../../updates-data/update-client/update-client.component';
import {UpdateProjectComponent} from '../../updates-data/update-project/update-project.component';
import {UpdateTjComponent} from '../../updates-data/update-tj/update-tj.component';
import {MatTableModule} from '@angular/material/table';
import {ComponentsModule} from '../../components/components.module';
>>>>>>> origin/wajdi

@NgModule({
    imports: [
        MatModule,
        RouterModule.forChild(AdminLayoutRoutes)
    ],
    declarations: [
<<<<<<< HEAD
    ],
    exports: [
=======
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
>>>>>>> origin/wajdi
    ]
})

export class AdminLayoutModule {
}
