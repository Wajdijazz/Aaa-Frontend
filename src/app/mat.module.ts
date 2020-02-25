import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

import {
    MatButtonModule, MatDatepickerModule,
    MatInputModule,
    MatListModule, MatNativeDateModule, MatOptionModule,
    MatRippleModule,
    MatSelectModule, MatTableModule,
    MatTabsModule,
    MatTooltipModule
} from '@angular/material';

@NgModule({

    imports: [
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        MatOptionModule,
        MatSelectModule,
        MatListModule,
        MatRippleModule,
        MatTooltipModule,
        MatTabsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule
    ],
    providers: [
    ],
    exports: [
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        MatOptionModule,
        MatSelectModule,
        MatListModule,
        MatRippleModule,
        MatTooltipModule,
        MatTabsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule
    ]
})
export class MatModule {
}
