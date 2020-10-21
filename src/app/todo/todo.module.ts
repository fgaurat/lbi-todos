import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [TodoListComponent, TodoFormComponent],
  exports: [TodoListComponent, TodoFormComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class TodoModule { }
