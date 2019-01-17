import { Injectable } from '@angular/core';
import { FlAlertComponent, AlertFlags, AlertKinds } from './fl-alert.component';
import { FlDialog } from '../dialog/fl-dialog';

@Injectable({
  providedIn: 'root'
})
export class FlAlertService {

  constructor(private dialog: FlDialog) { }

  show(text: String, title: String, flags: Number = AlertFlags.OK, kind: Number = AlertKinds.MSG_KIND_INFOMATION, width = "90%") {
    return this._show(this.dialog, text, title, flags, kind, width);
  }
  showError(text: String, title: String, flags: Number = AlertFlags.OK, width = "90%") {
    return this._show(this.dialog, text, title, flags, AlertKinds.MSG_KIND_ERROR, width);
  }
  showInfo(text: String, title: String, flags: Number = AlertFlags.OK, width = "90%") {
    return this._show(this.dialog, text, title, flags, AlertKinds.MSG_KIND_INFOMATION, width);
  }
  showQuestion(text: String, title: String, flags: Number = AlertFlags.OK | AlertFlags.CANCEL, width = "90%") {
    return this._show(this.dialog, text, title, flags, AlertKinds.MSG_KIND_QUESTION, width);
  }
  showWarning(text: String, title: String, flags: Number = AlertFlags.YES | AlertFlags.NO, width = "90%") {
    return this._show(this.dialog, text, title, flags, AlertKinds.MSG_KIND_WARNING, width);
  }
  showComplete(text: String, title: String, flags: Number = AlertFlags.OK, width = "90%") {
    return this._show(this.dialog, text, title, flags, AlertKinds.MSG_KIND_COMPLETE, width);
  }
  showCallback(text: String, title: String, callbackFunc:(e?)=>void, flags: Number = AlertFlags.OK, kind: Number = AlertKinds.MSG_KIND_INFOMATION, width = "90%") {
    return this._show(this.dialog, text, title, flags, kind, width, callbackFunc);
  }
  private _show(dialog: FlDialog, text: String, title: String, flags: Number = AlertFlags.OK, kind: Number = AlertKinds.MSG_KIND_INFOMATION, width = "200px", callbackFunc?:(e?)=>void) {
    (document.activeElement as any).blur();
    const dialogRef = dialog.open(FlAlertComponent, {
      data: {
        title: title,
        text: text,
        flags: flags,
        kind: kind,
        callback : callbackFunc
      },
      width: width
    });
    return dialogRef.afterClosed();
  }
}
