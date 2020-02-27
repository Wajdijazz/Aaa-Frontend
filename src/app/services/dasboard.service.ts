import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../entities/client';
import {config} from '../config';
import {Dashboard} from '../entities/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DasboardService {

  constructor(private http: HttpClient) {

  }
  saveDashboard(data: Dashboard) {
    this.http.post(`${config.apiUrl}/dashboard/`, data)
        .subscribe(
            res => {
            }
        );
  }
}
