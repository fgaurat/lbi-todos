import { AfterViewInit, Component, OnInit } from '@angular/core';
import { merge, Observable, scheduled } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { EventBusService } from 'src/app/core/event-bus.service';
import { Todo } from '../shared/todo';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, AfterViewInit {

  todos$: Observable<Todo[]>;

  constructor(private todoService: TodoService, private bus: EventBusService) { }

  ngOnInit(): void {

    const newTodos$ = this.bus.bus$.pipe(filter(message => message.type === 'NEW_TODO'));
    const deleteTodos$ = this.bus.bus$.pipe(
      filter(message => message.type === 'DELETE_TODO'),
      switchMap(message => this.todoService.delete(message.payload as Todo))
    );
    const initTodos$ = this.bus.bus$.pipe(filter(message => message.type === 'INIT_TODO'));

    this.todos$ = merge(newTodos$, deleteTodos$, initTodos$).pipe(
      switchMap(_ => this.todoService.findAll())
    );

  }

  ngAfterViewInit() {
    this.bus.dispatch({ type: 'INIT_TODO' })
  }


  deleteTodo(todo: Todo) {

    this.bus.dispatch({ type: 'DELETE_TODO', payload: todo })

  }

}
