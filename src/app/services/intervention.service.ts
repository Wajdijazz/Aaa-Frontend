import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tj} from '../tjs/tj';
import {config} from '../config';
import {Intervention} from '../interventions/intervention';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  constructor(private http: HttpClient) { }

  saveIntervention(data:Intervention ,projectId :number ,personId: number){
    this.http.post(`${config.apiUrl}/intervention/project/${projectId}/person/${personId}`, data)
        .subscribe(
            res => {
              console.log("added");
              console.log(data);
            }
        );
  }

  getInterventions() {
    return this.http.get(`${config.apiUrl}/intervention/`);
  }

  deleteIntervention(id: number) {
    this.http.delete(`${config.apiUrl}/intervention/${id}`)
        .subscribe(
            res => {
              console.log(res);
            }
        );
  }

}
