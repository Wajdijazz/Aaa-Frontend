import {Component, OnInit} from '@angular/core';
import {Person} from './person';
import {PersonService} from '../services/person.service';
import {Manager} from '../managers/manager';
import {ManagerService} from '../services/manager.service';
import {MatDialog} from '@angular/material/dialog';
import {UpdateManagerComponent} from '../updates-data/update-manager/update-manager.component';
import {UpdatePersonComponent} from '../updates-data/update-person/update-person.component';

@Component({
    selector: 'app-persons',
    templateUrl: './persons.component.html',
    styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
    persons: Person[];
    managers: Manager[];
    manager: Manager = {
        managerId: null,
        firstName: '',
        lastName: ''
    }
    Idmanager;
    person: Person = {
        personId: null,
        firstName: '',
        lastName: '',
        manager: null,

    }

    constructor(private personService: PersonService, private managerService: ManagerService, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.getAllManagers()
        this.getAllPersons()

    }

    getAllPersons() {
        this.personService.getPersons().subscribe((data: Person[]) => {
            this.persons = data;
        })
    }

    getAllManagers() {
        this.managerService.getManagers().subscribe((data: Manager[]) => {
            this.managers = data
        })
    }

    deletPerson(personId) {
        this.personService.deletePerson(personId)
      window.location.reload();
    }

    selectManager(managerId) {
        this.Idmanager = managerId
    }

    addPerson(data: Person) {
        this.personService.savePerson(data, this.Idmanager)
        window.location.reload();
        this.getAllPersons()
    }

    /**
     * Cette focntion permet d'ouvrire un poup et afficher une formulaire pour modifier une personne
     * @param person
     */
    updatePerson(person): void {
        let dialogRef = this.dialog.open(UpdatePersonComponent, {
            width: '900px',
            data: {person}
        });
        dialogRef.afterClosed().subscribe(result => {
        });

    }


}
