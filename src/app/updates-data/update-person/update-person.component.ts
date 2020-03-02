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
        managerDto:null,
        isActive:null

    }
    manager: Manager = {
        managerId: null,
        firstName: '',
        lastName: ''
    }
    private managers: Manager[];
    private Idmanager: any;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private personService: PersonService,
                private managerService: ManagerService, public dialog: MatDialog, private router: Router) {
    }

    ngOnInit() {
        this.getAllManagers()
    }

    getAllManagers() {
        this.managerService.getManagers().subscribe((manager: Manager[]) => {
            this.managers = manager;
        })
    }

    selectManager(managerId) {
        this.Idmanager = managerId;
    }

    updatePerson(person) {
        person.isActive = this.data.person.isActive;
        person.personId=this.data.person.personId;
        this.personService.updatePerson(person,this.Idmanager);
        this.dialog.closeAll()
        this.router.navigateByUrl('/persons');
    }
}
