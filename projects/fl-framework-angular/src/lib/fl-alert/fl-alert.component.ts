import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isEmpty } from '../utils/fi-utils';

export enum AlertFlags {
  YES = 0x0001,
  NO = 0x0002,
  OK = 0x0004,
  CANCEL = 0x0008
}

export enum AlertKinds {
  /**
   * メッセージの種類：情報
   */
  MSG_KIND_INFOMATION = 0,
  /**
   * メッセージの種類：問い
   */
  MSG_KIND_QUESTION = 1,

  /**
   * メッセージの種類：完了
   */
  MSG_KIND_COMPLETE = 2,

  /**
   * メッセージの種類：警告
   */
  MSG_KIND_WARNING = 3,

  /**
   * メッセージの種類：エラー
   */
  MSG_KIND_ERROR = 4
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-fl-alert',
  templateUrl: './fl-alert.component.html',
  styleUrls: ['./fl-alert.component.scss']
})
export class FlAlertComponent implements OnInit {

  public yesLabel = 'Yes';
  public noLabel = 'No';
  public okLabel = 'OK';
  public cancelLabel = 'Cancel';

  public showYes = true;
  public showNo = true;
  public showOk = true;
  public showCancel = true;

  public kindClass = '';

  constructor(public dialogRef: MatDialogRef<FlAlertComponent>, public labels: AlertLabels, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.showYes = ((data.flags & AlertFlags.YES) !== 0) ? true : false;
    this.showNo = ((data.flags & AlertFlags.NO) !== 0) ? true : false;
    this.showOk = ((data.flags & AlertFlags.OK) !== 0) ? true : false;
    this.showCancel = ((data.flags & AlertFlags.CANCEL) !== 0) ? true : false;

    this.okLabel = labels.OK_LABEL;
    this.yesLabel = labels.YES_LABEL;
    this.noLabel = labels.NO_LABEL;
    this.cancelLabel = labels.CANCEL_LABEL;

    switch (data.kind) {
      case AlertKinds.MSG_KIND_INFOMATION:
        this.kindClass = 'dialog-kind-information';
        break;
      case AlertKinds.MSG_KIND_QUESTION:
        this.kindClass = 'dialog-kind-question';
        break;
      case AlertKinds.MSG_KIND_COMPLETE:
        this.kindClass = 'dialog-kind-complete';
        break;
      case AlertKinds.MSG_KIND_WARNING:
        this.kindClass = 'dialog-kind-warning';
        break;
      case AlertKinds.MSG_KIND_ERROR:
        this.kindClass = 'dialog-kind-error';
        break;
    }
  }

  yesOnClick(): void {
    this._close(AlertFlags.YES);
  }
  noOnClick(): void {
    this._close(AlertFlags.NO);
  }
  okOnClick(): void {
    this._close(AlertFlags.OK);
  }
  cancelOnClick(): void {
    this._close(AlertFlags.CANCEL);
  }
  ngOnInit() {
    // this.dialogRef.updateSize('80%');
  }
  private _close(result: any) {
    if (this.data.callback) {
      this.data.callback(result);
    }
    this.dialogRef.close(result);
  }
}
@Injectable({
  providedIn: 'root'
})
export class AlertLabels {
  YES_LABEL = 'Yes';
  NO_LABEL = 'No';
  OK_LABEL = 'OK';
  CANCEL_LABEL = 'Cancel';

  updateLabels(yesLabel?: string, noLabel?: string, okLabel?: string, cancelLabel?: string) {
    if (!isEmpty(yesLabel)) {
      this.YES_LABEL = yesLabel;
    }
    if (!isEmpty(noLabel)) {
      this.NO_LABEL = noLabel;
    }
    if (!isEmpty(okLabel)) {
      this.OK_LABEL = okLabel;
    }
    if (!isEmpty(cancelLabel)) {
      this.CANCEL_LABEL = cancelLabel;
    }
  }

  setDefault() {
    this.YES_LABEL = 'Yes';
    this.NO_LABEL = 'No';
    this.OK_LABEL = 'OK';
    this.CANCEL_LABEL = 'Cancel';
  }
}
