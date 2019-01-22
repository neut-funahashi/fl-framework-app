import { Injectable, Inject } from '@angular/core';
import { FlAlertService } from '../fl-alert/fl-alert.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FlHttpClientService } from './fl-http-client.service';
import { Observable } from 'rxjs';
import { endsWithCharAppend, isEmpty } from '../utils/fi-utils';
import { AlertFlags } from '../fl-alert/fl-alert.component';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlHttpRequestService {

  constructor(private http: FlHttpClientService,
    @Inject('flRequestEndPoint') private config: FlHttpEndPoint,
    private alert: FlAlertService,
    private router: Router) { }

  public post<T extends IReturnDto>(serviceName: string, methodName: string, param: any, isDisplay: boolean = true, isErrorAlert:boolean = true): Observable<T> {
    var flHeaders = {};
    flHeaders['FRAMEWORK-HTTP-HEADER'] = this.config.appVersion;
    flHeaders[this.config.versionName] = this.config.appVersion;
    if (param['__headers__'] != null) {
      let appendHeaders = param['__headers__'];
      for (let key in appendHeaders) {
        flHeaders[key] = appendHeaders[key];
      }
      delete param['__headers__'];
    }
    var httpOptions = {
      headers: new HttpHeaders(flHeaders)
    };
    return this.http.post<T>(this.createUrl(serviceName, methodName), param, httpOptions, isDisplay ? true : isDisplay)
    .pipe(
      tap(result => {
        if (result) {
          //権限エラー
          //再描画が必要なパターン
          //メッセージ表示
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

  private createUrl(serviceName: string, methodName: string): string {
    if (this.config == null) {
      throw new Error("providers: provide: 'flRequestEndPoint' is not found.\nPlease set up FlHttpEndPoint.");
    }
    if (this.config.isDefault == true) {
      this.config.isDefault = false;
      console.log('Warning: Server connection settings are the default for the framework.\nPlease set the FlHttpEndPoint to the provider with the name "flRequestEndPoint".');
    }
    return (isEmpty(this.config.host) ? "" : endsWithCharAppend(this.config.host, "/") )
    + endsWithCharAppend(this.config.contextName, "/")
    + endsWithCharAppend(serviceName, "/")
    + endsWithCharAppend(methodName, "/");
  }

}
export interface FlHttpEndPoint {
  host: string;
  contextName: string;
  appVersion: string;
  versionName: string;
  isDefault: boolean
}
export interface IReturnDto {
  result: ResultDto;
}
export interface ResultDto {
  success: boolean;
  message: string;
  msgId: string;
  msgKind: Number;
}