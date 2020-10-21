import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo';
import { TodoService } from '../shared/todo.service';
import { EventBusService } from '../../core/event-bus.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  todo: Todo = {
    title: '',
    completed: false,
    dueDate: 0,
  }

  constructor(private todoService: TodoService, private bus: EventBusService) { }

  ngOnInit(): void {
  }

  addTodo() {
    this.todoService.save(this.todo).subscribe(_ => this.bus.dispatch({ type: 'NEW_TODO' }));
  }
}
