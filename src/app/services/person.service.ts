import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';
import {Person} from '../persons/person';



@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  getPersons() {
    return this.http.get(`${config.apiUrl}/person/`);
  }


  savePerson(data: Person,managerId:number) {
    this.http.post(`${config.apiUrl}/person/manager/${managerId}/person`, data)
        .subscribe(
            res => {
              console.log(res);
            }
        );
  }

    deletePerson(id: number) {
        this.http.delete(`${config.apiUrl}/person/${id}`)
            .subscribe(
                res => {
                    console.log(res);
                }
            );
    }

}
