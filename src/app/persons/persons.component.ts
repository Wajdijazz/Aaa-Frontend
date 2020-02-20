import {Component, OnInit} from '@angular/core';
import {Person} from '../entities/person';
import {PersonService} from '../services/person.service';
import {Manager} from '../entities/manager';
import {ManagerService} from '../services/manager.service';
import {MatDialog} from '@angular/material/dialog';
import {UpdateManagerComponent} from '../updates-data/update-manager/update-manager.component';
import {UpdatePersonComponent} from '../updates-data/update-person/update-person.component';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-persons',
    templateUrl: './persons.component.html',
    styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
    mySubscription: any;
    persons=[];
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
        this.ngOnDestroy();

    }

    getAllPersons() {
        this.personService.getPersons().subscribe((data: any) => {
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
        this.router.navigateByUrl('/persons');
    }

    selectManager(managerId) {
        this.Idmanager = managerId;
    }

    addPerson(data: Person) {
        data.managerId = this.Idmanager;
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


}
