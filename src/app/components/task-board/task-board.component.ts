import { Component } from '@angular/core';
import { TaskManagerService } from '../../service/task-manager.service';
import { TaskAPIModel, Task, User } from '../../model/api.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent {
  title = 'Task-Manager';
  taskList: Task[] = [] as any;
  lowPriorityTasks: Task[] = [];
  mediumPriorityTasks: Task[] = [];
  highPriorityTasks: Task[] = [];
  userList = [] as any;
  userObject: any;
  taskListAPI = 'Initialized';
  userListAPI = 'Initialized';
  searchInput = new FormControl('');

  constructor(
    private taskManagerService: TaskManagerService,
    private router: Router
  ) {
    this.fetchTaskList();
    this.fetchUserDetails();
  }

  fetchTaskList(): void {
    this.taskManagerService.getAPI('list').subscribe(
      (res: TaskAPIModel) => {
        if (res.status === 'success' && res.tasks && res.tasks.length > 0) {
          this.taskList = res.tasks;
          this.segregateTasksOnPriority(res.tasks);
        } else {
          console.error('Task List GET API Error', res.error);
        }
        this.taskListAPI = res.status;
      },
      (err) => {
        console.error('Task List GET API Failure', err);
      }
    );
  }

  fetchUserDetails(): void {
    this.taskManagerService.getAPI('listusers').subscribe(
      (res: TaskAPIModel) => {
        const userListApiResponse: TaskAPIModel = res;
        if (userListApiResponse.status === 'success') {
          this.userList = userListApiResponse.users;
          this.userListArrayToObject(this.userList);
        } else {
          console.error('Task List GET API Error', userListApiResponse.error);
        }
        this.userListAPI = userListApiResponse.status;
      },
      (err) => {
        console.error('Task List GET API Failure', err);
      }
    );
  }

  segregateTasksOnPriority(taskList: any): void {
    this.lowPriorityTasks = taskList.filter((a: any) => a.priority === '1');
    this.mediumPriorityTasks = taskList.filter((a: any) => a.priority === '2');
    this.highPriorityTasks = taskList.filter((a: any) => a.priority === '3');
  }

  userImagePath(userId: string): void {
    return this.userList.filter((user: User) => user.id === userId)[0].picture;
  }

  userListArrayToObject(userList: User[]): void {
    this.userObject = {};
    userList.forEach((element) => {
      this.userObject[element.id] = element;
    });
  }
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateTaskPriorityArrays(
        event.container.id.charAt(0),
        event.currentIndex
      );
      this.changePriority(event.item.data.id, event.container.id.charAt(0));
    } else {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  changePriority(taskId: string, priority: string): void {
    const formData = new FormData();
    formData.append('taskid', taskId);
    formData.append('priority', priority);
    this.taskManagerService.postAPI('update', formData).subscribe(
      (res: TaskAPIModel) => {
        const userListApiResponse: TaskAPIModel = res;
        if (userListApiResponse.status !== 'success') {
          this.refreshPage();
          console.error('Task Update API Error', userListApiResponse.error);
        }
        this.userListAPI = userListApiResponse.status;
      },
      (err) => {
        console.error('Task Update API Failure', err);
      }
    );
  }

  updateTaskPriorityArrays(priority: string, index: number): void {
    switch (priority) {
      case '1':
        this.lowPriorityTasks[index].priority = priority;
        break;
      case '2':
        this.mediumPriorityTasks[index].priority = priority;
        break;
      case '3':
        this.highPriorityTasks[index].priority = priority;
        break;
      default:
        break;
    }
  }

  refreshPage(): void {
    this.fetchTaskList();
    this.fetchUserDetails();
  }

  editTaskRedirection(taskId: string): void {
    this.router.navigateByUrl('/tasks/edit/' + taskId);
  }

  searchTasks() {
    this.router.navigateByUrl(`/tasks/search?q=${this.searchInput.value}`);
  }
}
