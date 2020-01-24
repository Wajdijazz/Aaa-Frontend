import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';
import {Project} from '../projects/project';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getPerojects() {
    return this.http.get(`${config.apiUrl}/project/`);
  }

  saveProject(data:Project,clientId :number){
    this.http.post(`${config.apiUrl}/project/`, data)

    this.http.post(`${config.apiUrl}/project/client/${clientId}/project`, data)

        .subscribe(
            res => {
              console.log(clientId);
                console.log(data);
            }
        );
  }

}
