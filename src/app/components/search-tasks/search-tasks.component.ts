import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskManagerService } from 'src/app/service/task-manager.service';
import { TaskAPIModel, Task, User } from '../../model/api.model';

@Component({
  selector: 'app-search-tasks',
  templateUrl: './search-tasks.component.html',
  styleUrls: ['./search-tasks.component.scss'],
})
export class SearchTasksComponent implements OnInit {
  searchInput = new FormControl('');
  taskList: Task[] = [];
  filterList: Task[] = [];
  taskListAPI = '';
  filterListAPI = '';
  displayedColumns = [
    'title',
    'assigned_to',
    'assigned_name',
    'priority',
    'due_date',
    'created_on',
  ];
  constructor(
    private router: Router,
    private taskManagerService: TaskManagerService,
    private activatedRoute: ActivatedRoute
  ) {
    this.fetchTaskList();
    this.activatedRoute.queryParams.subscribe((query) => {
      this.searchInput.setValue(query.q);
      this.search();
    });
  }

  ngOnInit(): void {}

  searchTasks() {
    this.router.navigateByUrl(`/tasks/search?q=${this.searchInput.value}`);
  }

  fetchTaskList(): void {
    this.taskListAPI = 'Initiated';
    this.taskManagerService.getAPI('list').subscribe(
      (res: TaskAPIModel) => {
        if (res.status === 'success' && res.tasks && res.tasks.length > 0) {
          this.taskList = res.tasks;
          this.search();
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
  search() {
    this.filterList = [];
    this.filterList = this.taskList.filter(
      (a) =>
        a.message.toLowerCase().search(this.searchInput.value.toLowerCase()) !==
        -1
    );
  }
}
