import {Component, OnInit} from '@angular/core';
import {ClientService} from '../services/client.service';
import {Person} from '../persons/person';
import {Client} from './client';

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

    constructor(private clientService: ClientService) {
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
}
