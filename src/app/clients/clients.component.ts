import {Component, OnInit} from '@angular/core';
import {ClientService} from '../services/client.service';
import {Person} from '../entities/person';
import {Client} from '../entities/client';
import {MatDialog} from '@angular/material/dialog';
import {UpdateManagerComponent} from '../updates-data/update-manager/update-manager.component';
import {UpdateClientComponent} from '../updates-data/update-client/update-client.component';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
    mySubscription: any;
    clients: Client[];
    client: Client = {
        clientId: null,
        clientName: '',
        clientContact: '',
    }

    constructor(private clientService: ClientService, public dialog: MatDialog, private router: Router) {
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
        this.getAllClients();
    }

    getAllClients() {
        this.clientService.getClients().subscribe((data: Client[]) => {
            this.clients = data;
        })
    }

    addClient(data: Client) {
        this.clientService.saveClient(data);
        this.getAllClients();
        this.router.navigateByUrl('/clients');
    }

    deleteClient(clientId) {
        this.clientService.deleteClient(clientId);
        this.router.navigateByUrl('/clients');
    }

    updateClient(client): void {
        let dialogRef = this.dialog.open(UpdateClientComponent, {
            width: '900px',
            data: {client}
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
