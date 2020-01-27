import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../config';
import {Manager} from '../managers/manager';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }


  getManagers() {
    return this.http.get(`${config.apiUrl}/manager/`);
  }

  saveManager(data : Manager){
    this.http.post(`${config.apiUrl}/manager/`, data)
        .subscribe(
            res => {
              console.log(res);
            }
        );
  }

  deleteManager(id:number){
    this.http.delete(`${config.apiUrl}/manager/${id}`)
        .subscribe(
            res => {
              console.log(res);
            }
        );
  }
}
