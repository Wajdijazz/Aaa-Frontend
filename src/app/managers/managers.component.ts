import {Component, OnInit} from '@angular/core';
import {ManagerService} from '../services/manager.service';
import {Manager} from '../entities/manager';
import {NavigationEnd, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DetailsComponent} from '../details/details.component';
import {UpdateManagerComponent} from '../updates-data/update-manager/update-manager.component';

@Component({
    selector: 'app-managers',
    templateUrl: './managers.component.html',
    styleUrls: ['./managers.component.scss']
})
export class ManagersComponent implements OnInit {
    private managers: Manager[];
    manager: Manager = {

        managerId: null,
        firstName: '',
        lastName: ''
    }

    constructor(private managerService: ManagerService,public dialog: MatDialog) {
    }

    ngOnInit() {
        this.getAllManagers()
    }

    getAllManagers() {
        this.managerService.getManagers().subscribe((data: Manager[]) => {
            this.managers = data;
        })

    }

    addManager(data: Manager) {
        this.managerService.saveManager(data)
        this.getAllManagers()
        window.location.reload()
    }

    deleteManager(managerId) {
        this.managerService.deleteManager(managerId)
        this.getAllManagers()
        window.location.reload();
    }

    /**
     * Cette focntion permet d'ouvrire un poup et afficher une formulaire pour modifier un manager
     * @param manager
     */
    updateManager(manager): void {
        let dialogRef = this.dialog.open(UpdateManagerComponent, {
            width: '900px',
            data: {manager}
        });
        dialogRef.afterClosed().subscribe(result => {
        });

}

}
