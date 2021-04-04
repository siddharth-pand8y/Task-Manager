import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { TaskAPIModel } from '../model/api.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {
  httpOptions = {
    headers: new HttpHeaders({
      AuthToken: environment.authToken,
    }),
  };
  constructor(private http: HttpClient, private matSnackBar: MatSnackBar) {}

  getAPI(action: string) {
    return this.http
      .get<TaskAPIModel>(environment.path + action, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  postAPI(action: string, body: any) {
    return this.http
      .post<TaskAPIModel>(environment.path + action, body, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred');
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  displayErrorSnack(message: string): void {
    this.matSnackBar.open(message, 'Close');
  }
  displaySuccessSnack(message: string):void {
    this.matSnackBar.open(message, 'Close', {
      duration: 3000
    });

  }
  
}
