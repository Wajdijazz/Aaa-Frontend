import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../config';
import {Tj} from '../tjs/tj';

@Injectable({
  providedIn: 'root'
})
export class TjService {

  constructor(private http: HttpClient) { }

  saveTj(data:Tj ,projectId :number ,personId: number){
    this.http.post(`${config.apiUrl}/tj/project/${projectId}/person/${personId}`, data)
        .subscribe(
            res => {
                console.log("added");
              console.log(data);
            }
        );
  }

    getTjs() {
        return this.http.get(`${config.apiUrl}/tj/`);
    }

    deleteTj(tjId: number) {
        this.http.delete(`${config.apiUrl}/tj/${tjId}`)
            .subscribe(
                res => {
                    console.log(res);
                }
            );
    }
}
