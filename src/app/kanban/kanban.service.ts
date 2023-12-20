import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './kanban.component';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  private apiUrl = 'https://crudcrud.com/api/70cc2dc72101410aba701580bfd91adc/todo';

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  
  postUserData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  deleteTodo(id:string){ 
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  updateTodo(todo : Todo){
    
    let payload:any = {...todo}
    payload._id = undefined
    return this.http.put(`${this.apiUrl}/${todo._id}`, payload);
  }
  
}
