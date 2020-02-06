import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UpdatePersonComponent } from './updates-data/update-person/update-person.component';
import { UpdateClientComponent } from './updates-data/update-client/update-client.component';
import { UpdateProjectComponent } from './updates-data/update-project/update-project.component';
import { UpdateTjComponent } from './updates-data/update-tj/update-tj.component';
import { DetailsWorkComponent } from './details-work/details-work.component';





@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        }),
        MatDialogModule,
        MatFormFieldModule
    ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,








  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
