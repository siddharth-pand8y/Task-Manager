import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskManagerService } from '../../service/task-manager.service';
import {
  TaskCreationAPIModel,
  TaskAPIModel,
  Task,
  User,
} from '../../model/api.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  taskForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(256)]],
    assignee: [''],
    dueDate: [''],
    priority: ['1'],
  });
  taskEdit: boolean;
  creationDate = '';
  taskId = '';
  taskInfo: Task = {
    id: '',
    message: '',
    assigned_to: '',
    assigned_name: '',
    created_on: '',
    due_date: '',
    priority: '',
  };
  taskApiStatus = '';
  userList = [] as any;
  userListAPI = '';
  constructor(
    private taskManagerService: TaskManagerService,
    private router: Router,
    private acitvatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.taskEdit = this.router.url !== '/tasks/create';
    this.acitvatedRoute.params.subscribe((params) => {
      this.taskId = params.id;
      if(this.taskEdit) {
        this.fetchTaskInfo();
      }
    });
    this.fetchUserDetails();
  }

  ngOnInit(): void {}

  saveButton() {
    const formData = new FormData();

    formData.append('message', this.taskForm.controls['title'].value);

    const date = this.formatDate(this.taskForm.controls['dueDate'].value);

    if (this.checkEmptyInputs('dueDate') && date) {
      formData.append('due_date', date);
    }
    if (this.checkEmptyInputs('assignee')) {
      formData.append('assigned_to', this.taskForm.controls['assignee'].value);
    }
    if (this.checkEmptyInputs('priority')) {
      formData.append('priority', this.taskForm.controls['priority'].value);
    }
    if (this.taskEdit) {
      formData.append('taskid', this.taskId);
      this.editTask(formData);
    } else {
      this.addTask(formData);
    }
  }

  addTask(formData: FormData) {
    this.taskApiStatus = 'Initialized';
    this.taskManagerService.postAPI('create', formData).subscribe(
      (res: TaskCreationAPIModel) => {
        const userListApiResponse: TaskCreationAPIModel = res;
        if (userListApiResponse.status !== 'success') {
          console.error('Task Creation API Error', userListApiResponse.error);
          this.taskManagerService.displayErrorSnack(
            'Something went wrong, please try again'
          );
        } else {
          this.taskManagerService.displaySuccessSnack(
            `Task Created: , ${res.taskid}`
          );
          this.router.navigateByUrl('/task-board');
        }
        this.taskApiStatus = res.status;

      },
      (err) => {
        console.error('Task Update API Failure', err);
        this.taskManagerService.displayErrorSnack(
          'Something went wrong, please try again'
        );
      }
    );
  }

  checkEmptyInputs(control: string): boolean {
    return (
      this.taskForm.controls[control].value !== null &&
      this.taskForm.controls[control].value !== '' &&
      this.taskForm.controls[control].value !== undefined
    );
  }

  editTask(formData: FormData) {
    this.taskApiStatus = 'Initialized';

    this.taskManagerService.postAPI('update', formData).subscribe(
      (res: TaskCreationAPIModel) => {
        const userListApiResponse: TaskCreationAPIModel = res;
        if (userListApiResponse.status !== 'success') {
          console.error('Task Updation API Error', userListApiResponse.error);
          this.taskManagerService.displayErrorSnack(
            'Something went wrong, please try again'
          );
        } else {
          this.taskManagerService.displaySuccessSnack(
            `Task Edited: , ${res.taskid}`
          );
          this.router.navigateByUrl('/task-board');
        }
        this.taskApiStatus = res.status;

      },
      (err) => {
        console.error('Task Update API Failure', err);
        this.taskManagerService.displayErrorSnack(
          'Something went wrong, please try again'
        );
      }
    );
  }

  deleteTask() {
    this.taskApiStatus = 'Initialized';

    const formData = new FormData();
    formData.append('taskid', this.taskId);
    this.taskManagerService.postAPI('delete', formData).subscribe(
      (res: TaskCreationAPIModel) => {
        const userListApiResponse: TaskCreationAPIModel = res;
        if (userListApiResponse.status !== 'success') {
          console.error('Task Deletion API Error', userListApiResponse.error);
          this.taskManagerService.displayErrorSnack(
            'Something went wrong, please try again'
          );
        } else {
          this.taskManagerService.displaySuccessSnack(
            `Task deleted successfully`
          );
          this.router.navigateByUrl('/task-board');
        }
        this.taskApiStatus = res.status;
      },
      (err) => {
        console.error('Task Update API Failure', err);
        this.taskManagerService.displayErrorSnack(
          'Something went wrong, please try again'
        );
      }
    );
  }

  formatDate(date: string) {
    const tDate = new Date(date);
    return this.datePipe.transform(tDate, 'yyyy-MM-dd hh:mm:ss');
  }
  fetchTaskInfo(): void {
    this.taskApiStatus = 'Initialized';

    this.taskManagerService.getAPI('list').subscribe(
      (res: TaskAPIModel) => {
        console.log('Get Task Lists', res.tasks);
        if (res.status === 'success' && res.tasks && res.tasks.length > 0) {
          this.taskInfo = res.tasks.filter((a) => a.id === this.taskId)[0];
          this.taskForm.patchValue({
            title: this.taskInfo.message,
            assignee: this.taskInfo.assigned_to,
            priority: this.taskInfo.priority,
          });
          if (this.taskInfo.due_date) {
            this.taskForm.patchValue({
              dueDate: new Date(this.taskInfo.due_date),
            });
          }
          this.creationDate = this.taskInfo.created_on;
        } else {
          console.error('Task List GET API Error', res.error);
        }
        this.taskApiStatus = res.status;
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
        } else {
          console.error('Task List GET API Error', userListApiResponse.error);
          this.taskManagerService.displayErrorSnack(
            'Unable to fetch user information'
          );
        }
        this.userListAPI = userListApiResponse.status;
      },
      (err) => {
        console.error('Task List GET API Failure', err);
        this.taskManagerService.displayErrorSnack(
          'Unable to fetch user information'
        );
      }
    );
  }
}
