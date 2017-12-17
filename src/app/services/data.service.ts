import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Inject } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class DataService {
  private url: string;
  constructor(private http: Http) {
    this.url = "./assets/data/foodChains.json";
  }
  Get() {
    return this.http.get(`${this.url}`)
  }
}