import { Component, OnInit } from '@angular/core';
import {Client} from '../clients/client';
import {ClientService} from '../services/client.service';
import {Project} from './project';
import {ProjectService} from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  clients:Client[];
  projects:Project[]
  client:Client={
    clientId:null,
    clientName:'',
      clientContact:''
  }
IdClient;
  project:Project={
    projectId:null,
    projectName:'',
    client:null

  }
  constructor(private clientService:ClientService,private projectService:ProjectService) { }

  ngOnInit() {
 this.getAllClients()
    this.getAllProjects()
  }

  getAllProjects(){
      this.projectService.getPerojects().subscribe((data:Project[])=>{
          this.projects=data

      })

  }

  getAllClients(){
    this.clientService.getClients().subscribe((data:Client[])=>{
      this.clients=data

    })

  }
  selectClient(clientId){
   this.IdClient=clientId
  }



  addProject(data:Project){
      data.client=this.IdClient
      console.log(data)


      this.projectService.saveProject(data);

  }

}
