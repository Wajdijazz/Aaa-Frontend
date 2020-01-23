import { Injectable } from '@angular/core';
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

  getAllClient() {
    return this.http.get(`${config.apiUrl}/clients`);
  }

  saveNewClient(data : Client){
    this.http.post(`${config.apiUrl}/clients`, data)
        .subscribe(
            res => {
              console.log(res);
            }
        );
  }

}
