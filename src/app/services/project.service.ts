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
    return this.http.get(`${config.apiUrl}/projects`);
  }

  saveProject(data:Project){

    this.http.post(`${config.apiUrl}/projects`, data)
        .subscribe(
            res => {
              console.log(res);
            }
        );
  }

}
