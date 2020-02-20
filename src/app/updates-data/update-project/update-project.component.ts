import {Component, Inject, OnInit} from '@angular/core';
import {Project} from '../../projects/project';
import {Client} from '../../clients/client';
import {ClientService} from '../../services/client.service';
import {ProjectService} from '../../services/project.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
    selector: 'app-update-project',
    templateUrl: './update-project.component.html',
    styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {
    project: Project = {
        projectId: null,
        projectName: '',
        clientId: null,
        managerId:null
    }
    client: Client = {
        clientId: null,
        clientName: '',
        clientContact: ''
    }
    clients: Client[];
    private IdClient: any;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private clientService: ClientService,
                private projectService: ProjectService, public dialog: MatDialog, private router: Router) {
    }

    ngOnInit() {
        this.getAllClients()
    }

    getAllClients() {
        this.clientService.getClients().subscribe((data: Client[]) => {
            this.clients = data
        })
    }

    selectClient(clientId) {
        this.IdClient = clientId
    }

    updateProject(data: Project) {
        data.projectId=this.data.project.projectId
        data.clientId=this.IdClient
        this.projectService.updateProject(data)
        console.log(data)
        this.dialog.closeAll()
        this.router.navigateByUrl('/projects');
    }

}
