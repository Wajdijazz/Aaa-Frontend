import {Client} from '../entities/client';
import {Component, OnDestroy, OnInit} from '@angular/core';
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
    client: Client;
    IdClient: number;

    project: Project = {
        projectId: null,
        projectName: '',
        clientId: null,
        managerId: null
    }
    manager: Manager;
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
         project.clientId=this.IdClient;
         project.managerId=this.IdManager;
        this.projectService.saveProject(project);
        this.router.navigateByUrl('/projects');
    }

    deletProject(projectId) {
        this.projectService.deleteProject(projectId);
        this.getAllManagers();
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
