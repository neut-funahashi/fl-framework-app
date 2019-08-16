import { Injectable } from '@angular/core';
import { isEmpty } from '../utils/fi-utils';

@Injectable({
  providedIn: 'root'
})
export class AlertLabels {
  YES_LABEL: string;
  NO_LABEL: string;
  OK_LABEL: string;
  CANCEL_LABEL: string;

  constructor() {
    this.setDefault();
  }
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
