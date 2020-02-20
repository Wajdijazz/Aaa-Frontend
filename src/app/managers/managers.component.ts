import {Component, OnInit} from '@angular/core';
import {ManagerService} from '../services/manager.service';
import {Manager} from '../entities/manager';
import {NavigationEnd, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {UpdateManagerComponent} from '../updates-data/update-manager/update-manager.component';

@Component({
    selector: 'app-managers',
    templateUrl: './managers.component.html',
    styleUrls: ['./managers.component.scss']
})
export class ManagersComponent implements OnInit {
    mySubscription: any;
    private managers: Manager[];
    manager: Manager = {

        managerId: null,
        firstName: '',
        lastName: ''
    }

    constructor(private managerService: ManagerService, public dialog: MatDialog, private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.mySubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.router.navigated = false;
            }
        });
    }

    ngOnInit() {
        this.getAllManagers();

    }


    getAllManagers() {
        this.managerService.getManagers().subscribe((data: Manager[]) => {
            this.managers = data;
        })

    }

    addManager(data: Manager) {
        this.managerService.saveManager(data);
        this.getAllManagers();
        this.router.navigateByUrl('/managers');
    }

    deleteManager(managerId) {
        this.managerService.deleteManager(managerId);
        this.router.navigateByUrl('/managers');
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

    ngOnDestroy() {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
    }

}
