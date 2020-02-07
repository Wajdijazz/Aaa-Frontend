import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../config';

@Injectable({
    providedIn: 'root'
})
export class DatasetService {

    constructor(private http: HttpClient) {
    }


    getDatasetByProjectId(projectId: number) {
        return this.http.get(`${config.apiUrl}/data/${projectId}/`)

    }
}
