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

  public retryCount = 0;

  // tslint:disable-next-line: ban-types
  post<T>(url: string, param: any, httpOptions: Object = null, isDisplay: boolean = true): Observable<T> {
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

  get<T>(url: string, params?: any, isDisplay: boolean = true): Observable<T> {
    const queryString: string = this.convertParams(params).toString();
    const apiUrl = queryString ? url + '?' + queryString : url;
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


  getp<T>(url: string, params?: any, isDisplay: boolean = true): Observable<T> {
    const queryString = this.convertParams(params).toString();
    const apiUrl = queryString ? url + '?' + queryString : url;
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

  private convertParams(params: any): HttpParams {
    let result: HttpParams = new HttpParams({});
    for (const key of Object.keys(params) )  {
      result = result.set(key, params[key]);
    }
    return result;
  }
}
