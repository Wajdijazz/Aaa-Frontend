import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ManagerService} from '../../services/manager.service';
import {Client} from '../../entities/client';
import {ClientService} from '../../services/client.service';

@Component({
    selector: 'app-update-client',
    templateUrl: './update-client.component.html',
    styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent implements OnInit {
    clients: Client[];
    client: Client = {
        clientId: null,
        clientName: '',
        clientContact: '',
    }

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private clientService: ClientService, public dialog: MatDialog) {
    }

    ngOnInit() {
    }

    updateClient(data: Client) {
        this.clientService.updateClient(this.data.client.clientId, data)
        this.dialog.closeAll()
        window.location.reload()
    }
}
