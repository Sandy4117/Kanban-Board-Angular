import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  private apiUrl = 'https://crudcrud.com/api/45886b75cef14ea0bdb423e76d2a8d15/board';

  constructor(private http: HttpClient) {}

  getUser(data: any): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  
  postUserData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }
  
}
