import {Person} from '../entities/person';
import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {PersonService} from '../services/person.service';
import {Manager} from '../entities/manager';
import {ManagerService} from '../services/manager.service';
import {MatDialog} from '@angular/material/dialog';
import {UpdatePersonComponent} from '../updates-data/update-person/update-person.component';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-persons',
    templateUrl: './persons.component.html',
    styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit, OnDestroy {

    mySubscription: any;
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
        managerId: null,
        managerDto: null,
        isActive: null

    }

    constructor(private personService: PersonService, private managerService: ManagerService, public dialog: MatDialog,
                private router: Router) {
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
        this.getAllPersons();
    }

    getAllPersons() {
        this.personService.getPersons().subscribe((data: Person[]) => {
            this.persons = data;
        })
        return this.persons
    }

    getAllManagers() {
        this.managerService.getManagers().subscribe((data: Manager[]) => {
            this.managers = data
        })
    }

    deletPerson(personId) {
        this.personService.deletePerson(personId)
        this.router.navigateByUrl('/persons');
    }

    selectManager(managerId) {
        this.Idmanager = managerId;
    }

    addPerson(data: Person) {
        data.managerId = this.Idmanager;
        data.isActive = true;
        this.personService.savePerson(data);
        this.getAllPersons();
        this.router.navigateByUrl('/persons');
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

    ngOnDestroy() {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
    }


    disablePerson(personId: number) {
        this.persons.forEach(person => {
            if (person.personId === personId) {
                person.isActive = !person.isActive;
            }
        });
        this.person.isActive = false;
        this.personService.updateisActivePerson(personId, this.person);
    }

    enablePerson(personId: number) {
        this.persons.forEach(person => {
            if (person.personId === personId) {
                person.isActive = !person.isActive;
            }
        });
        this.person.isActive = true;
        this.personService.updateisActivePerson(personId, this.person);
    }
}
