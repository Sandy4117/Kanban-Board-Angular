import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {  MatInputModule } from '@angular/material/input';
import {  MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KanbanService } from './kanban.service';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
  standalone: true,
  imports: [CdkDropList, CdkDrag, CommonModule, MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
})
export class KanbanComponent {

  addTodo : boolean = false;

  currenttodo : Todo = {name:'', description : '', status:'0'};

  todo:Todo[] = [];
  inProgress:Todo[] = [];
  done:Todo[] = [];

  constructor(private apiService: KanbanService) {}

  ngOnInit(): void {
    // Use your API service methods here
   // this.postData();
    this.getData();
  }

  getData() {
    const data = {}; // Replace with your data
    this.apiService.getUser(data).subscribe(
      (response) => {
        console.log('Response:', response);
        // Handle the response as needed
        this.todo = [...response]
        console.log(this.todo);
        
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error as needed
      }
    );
  }

  postData() {
    const data =  this.currenttodo; // Replace with your data
    this.apiService.postUserData(data).subscribe(
      (response) => {
        console.log('Response:', response);
        this.ngOnInit();
        this.addTodo = false;
        this.currenttodo = {name:'', description : '', status:'0'};
        // Handle the response as needed
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error as needed
      }
    );
  }

  onDrop(event: CdkDragDrop<Todo[]>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      // Move within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move to a different list
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);


    }
  }

  addTodoItem(){
    this.todo.push(this.currenttodo)
    this.addTodo = false
    this.currenttodo  = {name:'', description : '', status:'0'};

  }

  removeItem(id:string | undefined){
   if(id) this.apiService.deleteTodo(id).subscribe({
    next : (d:any)=>{
      this.ngOnInit()
    }
   })
  }

}

interface Todo {
  _id?:string;
  name:string;
  description : string;
  status : string
}
