import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../config';
import {Project} from '../projects/project';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private http: HttpClient) {
    }

    getProjects() {
        return this.http.get(`${config.apiUrl}/project/`);
    }

    saveProject(data: Project, clientId: number) {
        this.http.post(`${config.apiUrl}/project/client/${clientId}/project`, data)
            .subscribe(
                res => {
                }
            );
    }

    deleteProject(id: number) {
        this.http.delete(`${config.apiUrl}/project/${id}`)
            .subscribe(
                res => {
                }
            );
    }
}
