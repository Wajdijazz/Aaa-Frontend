import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../config';
import {Person} from '../persons/person';
import {Client} from '../clients/client';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    constructor(private http: HttpClient) {
    }

    getClients() {
        return this.http.get(`${config.apiUrl}/client/`);
    }

    saveClient(data: Client) {
        this.http.post(`${config.apiUrl}/client/`, data)
            .subscribe(
                res => {
                }
            );
    }
    updateClient(id:number,data: Client) {
        this.http.put(`${config.apiUrl}/client/${id}`, data)
            .subscribe(
                res => {
                }
            );
    }

    deleteClient(id: number) {
        this.http.delete(`${config.apiUrl}/client/${id}`)
            .subscribe(
                res => {
                }
            );
    }

}
