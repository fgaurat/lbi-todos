import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  findAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.urlTodos)
  }

  delete(todo: Todo): Observable<any> {
    let url_delete = `${environment.urlTodos}/${todo.id}`;
    return this.http.delete<any>(url_delete)
  }

  save(todo: Todo) {
    return this.http.post<Todo>(environment.urlTodos, todo, this.httpOptions);
  }
}
