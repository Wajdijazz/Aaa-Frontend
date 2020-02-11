import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../config';
import {Intervention} from '../interventions/intervention';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InterventionService {

    constructor(private http: HttpClient) {
    }

    saveIntervention(data: Intervention, projectId: number, personId: number) {
        this.http.post(`${config.apiUrl}/intervention/project/${projectId}/person/${personId}`, data)
            .subscribe(
                res => {
                }
            );
    }

    getInterventions() {
        return this.http.get(`${config.apiUrl}/intervention/`);
    }

    deleteIntervention(personId: number, projectId: number) {
        this.http.delete(`${config.apiUrl}/intervention/person/${personId}/project/${projectId}`)
            .subscribe(
                res => {
                }
            );
    }

    deleteInterventionHistorique(interventionId) {
        this.http.delete(`${config.apiUrl}/intervention/${interventionId}`)
            .subscribe(
                res => {
                }
            )
    }

    getInterventionsByPersonAndProject(projectId: number, personId: number) {
        return this.http.get(`${config.apiUrl}/intervention/project/${projectId}/person/${personId}`);
    }

    getWorkedByPersonAndProject(projectId: number, personId: number) {
        return this.http.get(`${config.apiUrl}/intervention/worked/project/${projectId}/person/${personId}`);
    }

    getWorkedByPersonAndProjectByMonth(projectId: number, personId: number, monthNumber: number) {
        return this.http.get(`${config.apiUrl}/intervention/${projectId}/${personId}/${monthNumber}`);
    }
}
