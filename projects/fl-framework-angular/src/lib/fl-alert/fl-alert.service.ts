import { Injectable } from '@angular/core';
import { FlAlertComponent, AlertFlags, AlertKinds } from './fl-alert.component';
import { FlDialog } from '../dialog/fl-dialog';

@Injectable({
  providedIn: 'root'
})
export class FlAlertService {

  constructor(private dialog: FlDialog) { }

  show(text: string, title: string, flags: number = AlertFlags.OK, kind: number = AlertKinds.MSG_KIND_INFOMATION, width = '90%') {
    return this._show(this.dialog, text, title, flags, kind, width);
  }
  showError(text: string, title: string, flags: number = AlertFlags.OK, width = '90%') {
    return this._show(this.dialog, text, title, flags, AlertKinds.MSG_KIND_ERROR, width);
  }
  showInfo(text: string, title: string, flags: number = AlertFlags.OK, width = '90%') {
    return this._show(this.dialog, text, title, flags, AlertKinds.MSG_KIND_INFOMATION, width);
  }
  showQuestion(text: string, title: string, flags: number = AlertFlags.OK + AlertFlags.CANCEL, width = '90%') {
    return this._show(this.dialog, text, title, flags, AlertKinds.MSG_KIND_QUESTION, width);
  }
  showWarning(text: string, title: string, flags: number = AlertFlags.YES + AlertFlags.NO, width = '90%') {
    return this._show(this.dialog, text, title, flags, AlertKinds.MSG_KIND_WARNING, width);
  }
  showComplete(text: string, title: string, flags: number = AlertFlags.OK, width = '90%') {
    return this._show(this.dialog, text, title, flags, AlertKinds.MSG_KIND_COMPLETE, width);
  }
  showCallback(text: string, title: string,
               callbackFunc: (e?: any) => void, flags: number = AlertFlags.OK,
               kind: number = AlertKinds.MSG_KIND_INFOMATION, width = '90%') {
    return this._show(this.dialog, text, title, flags, kind, width, callbackFunc);
  }
  private _show(dialog: FlDialog, text: string, title: string,
                flags: number = AlertFlags.OK, kind: number = AlertKinds.MSG_KIND_INFOMATION,
                width = '200px', callbackFunc?: (e?: any) => void) {
    if (document.activeElement && (document.activeElement as any).blur ) {
      (document.activeElement as any).blur();
    }
    const dialogRef = dialog.open(FlAlertComponent, {
      data: {
        title,
        text,
        flags,
        kind,
        callback: callbackFunc
      },
      width
    });
    return dialogRef.afterClosed();
  }
}
