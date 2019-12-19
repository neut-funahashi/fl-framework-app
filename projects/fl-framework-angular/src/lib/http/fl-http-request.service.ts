import { Injectable, Inject } from '@angular/core';
import { FlAlertService } from '../fl-alert/fl-alert.service';
import { HttpHeaders } from '@angular/common/http';
import { FlHttpClientService } from './fl-http-client.service';
import { Observable } from 'rxjs';
import { endsWithCharAppend, isEmpty } from '../utils/fi-utils';
import { AlertFlags } from '../fl-alert/fl-alert.component';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlHttpRequestService {

  constructor(
    private http: FlHttpClientService,
    @Inject('flRequestEndPoint') private config: FlHttpEndPoint,
    private alert: FlAlertService
  ) { }

  public postAny<T extends any>(
    serviceName: string,
    methodName: string,
    param: any,
    isDisplay: boolean = true,
    isErrorAlert: boolean = true
  ): Observable<T> {
    const flHeaders = {};
    flHeaders['FRAMEWORK-HTTP-HEADER'] = this.config.appVersion;
    flHeaders[this.config.versionName] = this.config.appVersion;
    if (param.__headers__ != null) {
      const appendHeaders = param.__headers__;
      for (const key of Object.keys(appendHeaders)) {
        flHeaders[key] = appendHeaders[key];
      }
      delete param.__headers__;
    }
    const httpOptions = {
      headers: new HttpHeaders(flHeaders)
    };
    return this.http.post<T>(this.createUrl(serviceName, methodName), param, httpOptions, isDisplay ? true : isDisplay)
      .pipe(
        tap(result => {
          if (result) {
            // 権限エラー
            // 再描画が必要なパターン
            // メッセージ表示
            if (isErrorAlert && result.result && !result.result.success) {

              this.alert.show(result.result.message, result.result.msgId, AlertFlags.OK, result.result.msgKind);
            }
          }
        }, (error) => {
          this.alert.showError('サーバとの通信に失敗しました。\n申し訳ございませんが、しばらくしてから再度実行してください。'
            , 'Error', AlertFlags.OK);
        })
      );
  }

  public post<T extends IReturnDto>(
    serviceName: string,
    methodName: string,
    param: any,
    isDisplay: boolean = true,
    isErrorAlert: boolean = true): Observable<T> {
    return this.postAny<T>(serviceName, methodName, param, isDisplay, isErrorAlert);
  }

  private createUrl(serviceName: string, methodName: string): string {
    if (this.config == null) {
      throw new Error('providers: provide: \'flRequestEndPoint\' is not found.\nPlease set up FlHttpEndPoint.');
    }
    if (this.config.isDefault === true) {
      this.config.isDefault = false;
      // tslint:disable-next-line: max-line-length
      console.log('Warning: Server connection settings are the default for the framework.\n' +
        'Please set the FlHttpEndPoint to the provider with the name "flRequestEndPoint".');
    }
    return (isEmpty(this.config.host) ? '' : endsWithCharAppend(this.config.host, '/'))
      + endsWithCharAppend(this.config.contextName, '/')
      + endsWithCharAppend(serviceName, '/')
      + endsWithCharAppend(methodName, '/');
  }

}
export interface FlHttpEndPoint {
  host: string;
  contextName: string;
  appVersion: string;
  versionName: string;
  isDefault: boolean;
}
export interface IReturnDto {
  result: ResultDto;
}
export interface ResultDto {
  success: boolean;
  message: string;
  msgId: string;
  msgKind: number;
}
