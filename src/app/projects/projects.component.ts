import {Component, OnInit} from '@angular/core';
import {Client} from '../entities/client';
import {ClientService} from '../services/client.service';
import {Project} from '../entities/project';
import {ProjectService} from '../services/project.service';
import {MatDialog} from '@angular/material/dialog';
import {UpdatePersonComponent} from '../updates-data/update-person/update-person.component';
import {UpdateProjectComponent} from '../updates-data/update-project/update-project.component';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
    mySubscription: any;
    clients: Client[];
    projects: Project[];
    client: Client = {
        clientId: null,
        clientName: '',
        clientContact: ''
    }
    IdClient;
    project: Project = {
        projectId: null,
        projectName: '',
        clientId: null

    }

    constructor(private clientService: ClientService, private projectService: ProjectService, public dialog: MatDialog,
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
        this.getAllClients();
        this.getAllProjects();
    }

    getAllProjects() {
        this.projectService.getProjects().subscribe((data: Project[]) => {
            this.projects = data;
        })
    }

    getAllClients() {
        this.clientService.getClients().subscribe((data: Client[]) => {
            this.clients = data;
        })
    }

    selectClient(clientId) {
        this.IdClient = clientId;
    }

    addProject(data: Project) {
        data.clientId = this.IdClient;
        this.projectService.saveProject(data);
        this.getAllProjects();
        this.router.navigateByUrl('/projects');
    }

    deletProject(projectId) {
        this.projectService.deleteProject(projectId);
        this.router.navigateByUrl('/projects');
    }

    updateProject(project): void {
        let dialogRef = this.dialog.open(UpdateProjectComponent, {
            width: '900px',
            data: {project}
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
