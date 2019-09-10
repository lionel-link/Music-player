import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = "http://localhost:8084/"

  constructor(private http: HttpClient) { }

  postApi = (lien, data) => {
    return this.http.post(this.baseUrl + lien, data)
  }

  getApi = (lien)=>{
    return this.http.get(this.baseUrl+lien)
  }
}
