import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../config';
import {Tj} from '../tjs/tj';

@Injectable({
    providedIn: 'root'
})
export class TjService {

    constructor(private http: HttpClient) {
    }

    saveTj(data: Tj, projectId: number, personId: number) {
        this.http.post(`${config.apiUrl}/tj/project/${projectId}/person/${personId}`, data)
            .subscribe(
                res => {
                }
            );
    }


    updateTj(data: Tj, projectId: number, personId: number) {
        this.http.put(`${config.apiUrl}/tj/project/${projectId}/person/${personId}`, data)
            .subscribe(
                res => {
                }
            );
    }

    getTjs() {
        return this.http.get(`${config.apiUrl}/tj/`);
    }

    getTijByProjectAnPerson(projectId: number, personId: number) {
        return this.http.get(`${config.apiUrl}/tj/${projectId}/${personId}`)
    }

    deleteTjByPerson(personId: number) {
        this.http.delete(`${config.apiUrl}/tj/person/${personId}`)
            .subscribe(
                res => {
                }
            );
    }
    deleteTjByProject(projectId: number) {
        this.http.delete(`${config.apiUrl}/tj/project/${projectId}`)
            .subscribe(
                res => {
                }
            );
    }
}
