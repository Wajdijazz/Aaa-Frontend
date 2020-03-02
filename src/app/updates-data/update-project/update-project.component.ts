import {Component, Inject, OnInit} from '@angular/core';
import {Project} from '../../entities/project';
import {Client} from '../../entities/client';
import {ClientService} from '../../services/client.service';
import {ProjectService} from '../../services/project.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Manager} from '../../entities/manager';
import {ManagerService} from '../../services/manager.service';

@Component({
    selector: 'app-update-project',
    templateUrl: './update-project.component.html',
    styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {
    project: Project = {
        projectId: null,
        projectName: '',
        clientDto: null,
        managerDto: null,
        isActive: null
    }
    client: Client = {
        clientId: null,
        clientName: '',
        clientContact: ''
    }
    clients: Client[];
    private IdClient: any;
    manager: Manager = {
        managerId: null,
        firstName: '',
        lastName: ''
    };
    private managers: Manager[];
    private IdManager: any;


    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private clientService: ClientService,
                private projectService: ProjectService, public dialog: MatDialog, private router: Router,
                private managerService: ManagerService) {
    }

    ngOnInit() {
        this.getAllClients();
        this.getAllManagers();


    }

    getAllClients() {
        this.clientService.getClients().subscribe((data: Client[]) => {
            this.clients = data
        })
    }

    selectClient(clientId) {
        this.IdClient = clientId
    }

    selectManager(managerId) {
        this.IdManager = managerId;
    }


    updateProject(data: Project) {
        data.projectId = this.data.project.projectId
        this.projectService.updateProject(data, this.IdClient, this.IdManager);
        console.log(data)
        this.dialog.closeAll()
        this.router.navigateByUrl('/projects');
    }

    private getAllManagers() {
        this.managerService.getManagers().subscribe((data: Manager[]) => {
            this.managers = data;
        })
    }
}
