import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ManagerService} from '../../services/manager.service';
import {Client} from '../../entities/client';
import {ClientService} from '../../services/client.service';
import {Router} from '@angular/router';

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

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private clientService: ClientService,
                public dialog: MatDialog, private router: Router) {
    }

    ngOnInit() {
    }

    updateClient(data: Client) {
        data.clientId = this.data.client.clientId
        this.clientService.updateClient(data)
        console.log(data)
        this.dialog.closeAll()
        this.router.navigateByUrl('/clients');
    }
}
