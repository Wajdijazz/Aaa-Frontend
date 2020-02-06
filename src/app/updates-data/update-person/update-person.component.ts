import {Component, Inject, OnInit} from '@angular/core';
import {Person} from '../../persons/person';
import {Manager} from '../../managers/manager';
import {PersonService} from '../../services/person.service';
import {ManagerService} from '../../services/manager.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-update-person',
    templateUrl: './update-person.component.html',
    styleUrls: ['./update-person.component.scss']
})
export class UpdatePersonComponent implements OnInit {
    person: Person = {
        personId: null,
        firstName: '',
        lastName: '',
        manager: null,

    }
    manager: Manager = {
        managerId: null,
        firstName: '',
        lastName: ''
    }
    private Idmanager: any;
    private managers: Manager[];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private personService: PersonService,
                private managerService: ManagerService, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.getAllManagers()
    }

    getAllManagers() {
        this.managerService.getManagers().subscribe((data: Manager[]) => {
            this.managers = data
        })
    }

    selectManager(managerId) {
        this.Idmanager = managerId
    }

    updatePerson(person) {
        this.personService.updatePerson(this.data.person.personId, person, this.Idmanager)
        this.dialog.closeAll()
        window.location.reload()
    }
}
