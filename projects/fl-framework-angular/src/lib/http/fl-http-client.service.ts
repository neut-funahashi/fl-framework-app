import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { WaitDialogService } from '../progress/wait-dialog.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { endsWithCharAppend } from '../utils/fi-utils';

@Injectable({
  providedIn: 'root'
})
export class FlHttpClientService {

  constructor(private http: HttpClient, private waitDialogService: WaitDialogService) { }

  public retryCount: number = 0;

  post<T>(url: string, param: Object, httpOptions: Object = null, isDisplay: Boolean = true): Observable<T> {
    if (isDisplay) {
      this.waitDialogService.show();
    }
    return this.http.post<T>(url, param, httpOptions)
      .pipe(
        tap(result => {}, error => {}, () => {
          if (isDisplay) {
            this.waitDialogService.close();
          }
        }),
        retry(this.retryCount),
        catchError(error => {
          if (isDisplay) {
            this.waitDialogService.close();
          }
          if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
          } else {
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
          }
          return throwError(new Error('http error.'));
        })
      );
  }

  get<T>(url: string, params?: Object, isDisplay: Boolean = true): Observable<T> {
    var queryString: String = this.convertParams(params).toString();
    var apiUrl = queryString ? url + '?' + queryString : url;
    if (isDisplay) {
      this.waitDialogService.show();
    }
    return this.http.get<T>(apiUrl)
      .pipe(       tap(result => {}, error => {}, () => {
        if (isDisplay) {
          this.waitDialogService.close();
        }
      }),
      retry(this.retryCount),
      catchError(error => {
        if (isDisplay) {
          this.waitDialogService.close();
        }
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        return throwError(new Error('http error.'));
      })
    );
  }


  getp<T>(url: string, params?: Object, isDisplay: Boolean = true): Observable<T> {
    var queryString: String = this.convertParams(params).toString();
    var apiUrl = queryString ? url + '?' + queryString : url;
    if (isDisplay) {
      this.waitDialogService.show();
    }
    return this.http.jsonp<T>(apiUrl, 'callback')
      .pipe(       tap(result => {}, error => {}, () => {
        if (isDisplay) {
          this.waitDialogService.close();
        }
      }),
      retry(this.retryCount),
      catchError(error => {
        if (isDisplay) {
          this.waitDialogService.close();
        }
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        return throwError(new Error('http error.'));
      })
    );
  }

  private convertParams(params: Object): HttpParams {
    var result: HttpParams = new HttpParams({});
    for (var key in params) {
      result = result.set(key, params[key]);
    }
    return result;
  }
}
