import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Manager} from '../../entities/manager';
import {ManagerService} from '../../services/manager.service';

@Component({
    selector: 'app-update-manager',
    templateUrl: './update-manager.component.html',
    styleUrls: ['./update-manager.component.scss']
})
export class UpdateManagerComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private managerService: ManagerService, public dialog: MatDialog) {
    }

    manager: Manager = {

        managerId: null,
        firstName: '',
        lastName: ''
    }

    ngOnInit() {
    }

    updateManager(data: Manager) {
        this.managerService.updateManager(this.data.manager.managerId, data)
        this.dialog.closeAll()
        window.location.reload()
    }
}
