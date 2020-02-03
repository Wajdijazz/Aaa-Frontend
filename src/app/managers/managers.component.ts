import {Component, OnInit} from '@angular/core';
import {ManagerService} from '../services/manager.service';
import {Manager} from './manager';
import {NavigationEnd, Router} from '@angular/router';

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

    constructor(private managerService: ManagerService) {
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

}
