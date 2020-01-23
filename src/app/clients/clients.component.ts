import { Component, OnInit } from '@angular/core';
import {ClientService} from '../services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor(private clientService: ClientService) { }


  // Declaration liste des clients à recupérer
  clients;
  ngOnInit() {
    return this.clientService.getAllClient().subscribe(data=>{this.clients=data;},err=>{
      console.log(err);
    })
  }

}
