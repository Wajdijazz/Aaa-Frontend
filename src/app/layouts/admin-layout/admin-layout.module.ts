import {NgModule} from '@angular/core';
import {MatModule} from '../../mat.module';
import {RouterModule} from '@angular/router';
import {AdminLayoutRoutes} from './admin-layout.routing';

@NgModule({
    imports: [
        MatModule,
        RouterModule.forChild(AdminLayoutRoutes)
    ],
    declarations: [
    ],
    exports: [
    ]
})

export class AdminLayoutModule {
}
