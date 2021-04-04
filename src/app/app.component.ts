import { Component } from '@angular/core';
import { TaskManagerService } from './service/task-manager.service';
import { TaskAPIModel, Task, User } from './model/api.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // title = 'Task-Manager';
  // taskList: Task[] = [] as any;
  // lowPriorityTasks: Task[] = [];
  // mediumPriorityTasks: Task[] = [];
  // highPriorityTasks: Task[] = [];
  // userList = [] as any;
  // userObject: any;
  // taskListAPI = 'Initialized';
  // userListAPI = 'Initialized';

  // constructor(private taskManagerService: TaskManagerService) {
  //   this.fetchTaskList();
  //   this.fetchUserDetails();
  // }

  // fetchTaskList(): void {
  //   this.taskManagerService.getAPI('list').subscribe(
  //     (res: TaskAPIModel) => {
  //       console.log('Get Task Lists', res.tasks);
  //       if (res.status === 'success' && res.tasks && res.tasks.length > 0) {
  //         this.taskList = res.tasks;
  //         this.segregateTasksOnPriority(res.tasks);
  //       } else {
  //         console.error('Task List GET API Error', res.error);
  //       }
  //       this.taskListAPI = res.status;
  //     },
  //     (err) => {
  //       console.error('Task List GET API Failure', err);
  //     }
  //   );
  // }

  // fetchUserDetails(): void {
  //   this.taskManagerService.getAPI('listusers').subscribe(
  //     (res: TaskAPIModel) => {
  //       const userListApiResponse: TaskAPIModel = res;
  //       if (userListApiResponse.status === 'success') {
  //         this.userList = userListApiResponse.users;
  //         this.userListArrayToObject(this.userList);
  //       } else {
  //         console.error('Task List GET API Error', userListApiResponse.error);
  //       }
  //       this.userListAPI = userListApiResponse.status;
  //     },
  //     (err) => {
  //       console.error('Task List GET API Failure', err);
  //     }
  //   );
  // }

  // segregateTasksOnPriority(taskList: any): void {
  //   console.log('Segregation of tasks started');
  //   this.lowPriorityTasks = taskList.filter((a: any) => a.priority === '1');
  //   this.mediumPriorityTasks = taskList.filter((a: any) => a.priority === '2');
  //   this.highPriorityTasks = taskList.filter((a: any) => a.priority === '3');
  //   console.log('Low Priority Tasks', this.lowPriorityTasks);
  // }

  // userImagePath(userId: string): void {
  //   return this.userList.filter((user: User) => user.id === userId)[0].picture;
  // }

  // userListArrayToObject(userList: User[]): void {
  //   this.userObject = {};
  //   userList.forEach((element) => {
  //     this.userObject[element.id] = element;
  //   });
  // }
  // drop(event: CdkDragDrop<Task[]>) {
  //   if (event.previousContainer !== event.container) {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //     console.log('Event', event);
  //     console.log(event.container.id);
  //     this.updateTaskPriorityArrays(
  //       event.container.id.charAt(0),
  //       event.currentIndex
  //     );
  //     this.changePriority(event.item.data.id, event.container.id.charAt(0));
  //   } else {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  // }

  // changePriority(taskId: string, priority: string): void {
  //   const formData = new FormData();
  //   formData.append('taskid', taskId);
  //   formData.append('priority', priority);
  //   this.taskManagerService.postAPI('update', formData).subscribe(
  //     (res: TaskAPIModel) => {
  //       const userListApiResponse: TaskAPIModel = res;
  //       console.log('Change Priority', userListApiResponse);
  //       if (userListApiResponse.status !== 'success') {
  //         this.refreshPage();
  //         console.error('Task Update API Error', userListApiResponse.error);
  //       }
  //       this.userListAPI = userListApiResponse.status;
  //     },
  //     (err) => {
  //       console.error('Task Update API Failure', err);
  //     }
  //   );
  // }

  // updateTaskPriorityArrays(
  //   priority: string,
  //   index: number
  // ): void {
  //   switch (priority) {
  //     case '1':
  //       this.lowPriorityTasks[index].priority = priority;
  //       break;
  //     case '2':
  //       this.mediumPriorityTasks[index].priority = priority;
  //       break;
  //     case '3':
  //       this.highPriorityTasks[index].priority = priority;
  //       break;
  //     default:
  //       break;
  //   }
  // }

  // refreshPage() {
  //   this.fetchTaskList();
  //   this.fetchUserDetails();
  // }
}
