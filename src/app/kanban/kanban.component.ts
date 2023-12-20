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
  updationFlag:boolean = false;
  updationId : string | undefined;

  currenttodo : Todo = {name:'', description : '', status:'0'};

  todos:Todo[] = [];
  

  constructor(private apiService: KanbanService) {}

  ngOnInit(): void {
    // Use your API service methods here
   // this.postData();
    this.getData();
  }

  getData() {
    this.apiService.getUser().subscribe(
      (response) => {
        console.log('Response:', response);
        // Handle the response as needed
        this.todos = [...response]
        console.log(this.todos);
        
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
        this.todos.push(response)
        this.addTodo = false;
        this.currenttodo = {name:'', description : '', status:'0'};
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error as needed
      }
    );
  }


  updateData(){
    
    this.apiService.updateTodo(this.currenttodo).subscribe(
      (response) => {
        console.log('Response:', response);
        this.ngOnInit()
        this.addTodo = false;
        this.updationFlag = false;
        this.updationId = undefined;
        this.currenttodo = {name:'', description : '', status:'0'};
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error as needed
      }
    );
  }

  onDrop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      // Move within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.todos[event.previousIndex].status = event.container.id
      
      this.apiService.updateTodo(this.todos[event.previousIndex]).subscribe({
        next : (data:any)=>{
          console.log(data)
        }
      })
     

    }
  }


  removeItem(id:string | undefined){
   if(id) this.apiService.deleteTodo(id).subscribe({
    next : (d:any)=>{
      this.ngOnInit()
    }
   })
  }

  editTask(task : Todo){
    
    this.currenttodo = task;
    this.addTodo = true;
    this.updationId = task._id;
    this.updationFlag = true;

  }
}

export interface Todo {
  _id?:string;
  name:string;
  description : string;
  status : string
}
