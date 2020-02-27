import {Component, OnDestroy, OnInit} from '@angular/core';
import {Client} from '../entities/client';
import {ClientService} from '../services/client.service';
import {Project} from '../entities/project';
import {ProjectService} from '../services/project.service';
import {MatDialog} from '@angular/material/dialog';
import {UpdateProjectComponent} from '../updates-data/update-project/update-project.component';
import {NavigationEnd, Router} from '@angular/router';
import {ManagerService} from '../services/manager.service';
import {Manager} from '../entities/manager';


@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
    mySubscription: any;
    clients: Client[];
    projects = [];

    client: Client = {
        clientId: null,
        clientName: '',
        clientContact: ''
    };

    IdClient: number;

    project: Project = {
        projectId: null,
        projectName: '',
        clientId: null,
        managerId: null,
        isActive: null
    };
    manager: Manager = {
        managerId: null,
        firstName: '',
        lastName: ''
    };

    IdManager: number;
    private managers: Manager[];

    constructor(private clientService: ClientService, private projectService: ProjectService, public dialog: MatDialog,
                private router: Router, private managerService: ManagerService) {
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
        this.getAllManagers();
    }

    getAllProjects() {
        this.projectService.getProjects().subscribe((data: any) => {
            this.projects = data;
        })
        return this.projects;
    }

    getAllClients() {
        this.clientService.getClients().subscribe((data: Client[]) => {
            this.clients = data;
        })
    }

    getAllManagers() {
        this.managerService.getManagers().subscribe((data: Manager[]) => {
            this.managers = data;
        })
    }

    selectClient(clientId) {
        this.IdClient = clientId;
    }

    selectManager(managerId) {
        this.IdManager = managerId;
    }

    addProject(project: Project) {
        project.clientId = this.IdClient;
        project.managerId = this.IdManager;
        project.isActive = true;
        this.projectService.saveProject(project);
        this.router.navigateByUrl('/projects');
    }

    deletProject(projectId) {
        this.projectService.deleteProject(projectId);
        this.getAllManagers();
        this.router.navigateByUrl('/projects');
    }

    updateProject(project): void {
        const dialogRef = this.dialog.open(UpdateProjectComponent, {
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


    disableProject(projectId: number) {
        this.projects.forEach(project => {
            if (project.projectId === projectId) {
                project.isActive = !project.isActive;
            }
        });
        this.project.isActive = false;
        this.projectService.updateisActivePerson(projectId, this.project);
    }


    enableProject(projectId: number) {
        this.projects.forEach(project => {
            if (project.projectId === projectId) {
                project.isActive = !project.isActive;
            }
        });
        this.project.isActive = true;
        this.projectService.updateisActivePerson(projectId, this.project);
    }
}
