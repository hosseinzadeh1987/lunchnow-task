import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocationService {

  constructor(private http: HttpClient) { }

  getJson() {
    return this
            .http
            .get('./assets/List.json');
        }
}
