import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Manager} from '../../entities/manager';
import {ManagerService} from '../../services/manager.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-update-manager',
    templateUrl: './update-manager.component.html',
    styleUrls: ['./update-manager.component.scss']
})
export class UpdateManagerComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private managerService: ManagerService,
                public dialog: MatDialog, private router: Router) {
    }

    manager: Manager = {

        managerId: null,
        firstName: '',
        lastName: ''
    }

    ngOnInit() {
    }

    updateManager(data: Manager) {
        data.managerId = this.data.manager.managerId
        this.managerService.updateManager(data)
        this.dialog.closeAll()
        this.router.navigateByUrl('/managers');
    }
}
