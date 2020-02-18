import {Component, OnInit} from '@angular/core';
import {Client} from '../entities/client';
import {ClientService} from '../services/client.service';
import {Project} from '../entities/project';
import {ProjectService} from '../services/project.service';
import {MatDialog} from '@angular/material/dialog';
import {UpdatePersonComponent} from '../updates-data/update-person/update-person.component';
import {UpdateProjectComponent} from '../updates-data/update-project/update-project.component';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
    clients: Client[];
    projects: Project[]
    client: Client = {
        clientId: null,
        clientName: '',
        clientContact: ''
    }
    IdClient;
    project: Project = {
        projectId: null,
        projectName: '',
        client: null

    }

    constructor(private clientService: ClientService, private projectService: ProjectService,public dialog: MatDialog) {
    }

    ngOnInit() {
        this.getAllClients()
        this.getAllProjects()
    }

    getAllProjects() {
        this.projectService.getProjects().subscribe((data: Project[]) => {
            this.projects = data
        })
    }

    getAllClients() {
        this.clientService.getClients().subscribe((data: Client[]) => {
            this.clients = data
        })
    }

    selectClient(clientId) {
        this.IdClient = clientId
    }

    addProject(data: Project) {
        this.projectService.saveProject(data, this.IdClient);
        window.location.reload();
    }

    deletProject(projectId) {
        this.projectService.deleteProject(projectId);
        window.location.reload();
    }
    updateProject(project): void {
        let dialogRef = this.dialog.open(UpdateProjectComponent, {
            width: '900px',
            data: {project}
        });
        dialogRef.afterClosed().subscribe(result => {
        });

    }

}
