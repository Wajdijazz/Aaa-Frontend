import {Component, Inject, OnInit} from '@angular/core';
import {Person} from '../../entities/person';
import {Manager} from '../../entities/manager';
import {PersonService} from '../../services/person.service';
import {ManagerService} from '../../services/manager.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

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
        managerId: null,
        managerDto:null,
        isActive:null

    }
    manager: Manager = {
        managerId: null,
        firstName: '',
        lastName: ''
    }
    private Idmanager: any;
    private managers: Manager[];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private personService: PersonService,
                private managerService: ManagerService, public dialog: MatDialog, private router: Router) {
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
        person.managerId = this.Idmanager
        person.personId = this.data.person.personId
        this.personService.updatePerson(person)
        this.dialog.closeAll()
        this.router.navigateByUrl('/persons');
    }
}
