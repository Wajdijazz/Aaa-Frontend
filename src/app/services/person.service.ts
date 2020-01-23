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
    return this.http.get(`${config.apiUrl}/persons`);
  }


  savePerson(data: Person) {
    this.http.post(`${config.apiUrl}/persons`, data)
        .subscribe(
            res => {
              console.log(res);
            }
        );
  }

}
