import {Component, OnInit} from '@angular/core';
import {ClientService} from '../services/client.service';
import {Person} from '../entities/person';
import {Client} from '../entities/client';
import {MatDialog} from '@angular/material/dialog';
import {UpdateManagerComponent} from '../updates-data/update-manager/update-manager.component';
import {UpdateClientComponent} from '../updates-data/update-client/update-client.component';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
    clients: Client[];
    client: Client = {
        clientId: null,
        clientName: '',
        clientContact: '',
    }

    constructor(private clientService: ClientService,public dialog: MatDialog) {
    }


    ngOnInit() {
        this.getAllClients()
    }

    getAllClients() {
        this.clientService.getClients().subscribe((data: Client[]) => {
            this.clients = data;
        })
    }

    addClient(data: Client) {
        this.clientService.saveClient(data)
        window.location.reload();
        this.getAllClients()
    }

    deleteClient(clientId) {
        this.clientService.deleteClient(clientId)
        this.getAllClients()
        window.location.reload();
    }

    updateClient(client): void {
        let dialogRef = this.dialog.open(UpdateClientComponent, {
            width: '900px',
            data: {client}
        });
        dialogRef.afterClosed().subscribe(result => {
        });

    }



}
