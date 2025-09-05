
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  text: string;
  completed: boolean;
  color?: string;
}

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() isDarkMode = false; 
  @Output() modeToggle = new EventEmitter<void>();

  newTask = '';
  tasks: Task[] = [];
  selectedTaskIndex: number | null = null;

softColors: string[] = [
  '#FFB3BA', 
  '#FFDFBA', 
  '#FFFFBA', 
  '#BAFFC9', 
  '#BAE1FF', 
  '#E7BAFF', 
  '#FFD6E0', 
  '#C9F9FF', 
  '#F6FFA6', 
  '#D7FFD9'  
];


  addTask() {
    if (this.newTask.trim()) {
      this.tasks.unshift({ text: this.newTask, completed: false });
      this.newTask = '';
      this.sortTasks();
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  sortTasks() {
    this.tasks = this.tasks
      .filter(t => !t.completed)
      .concat(this.tasks.filter(t => t.completed));
  }

  openColorPicker(index: number) {
    this.selectedTaskIndex = index;
  }

  setTaskColor(color: string) {
    if (this.selectedTaskIndex !== null) {
      this.tasks[this.selectedTaskIndex].color = color;
    }
    this.closeModal();
  }

  closeModal() {
    this.selectedTaskIndex = null;
  }
}


