import { Component } from '@angular/core';
import { FlComponentBase, AlertLabels } from 'fl-framework-angular';
import { WaitDialogService } from 'fl-framework-angular';
import { clearCanvas } from 'fl-framework-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends FlComponentBase {
  title = 'framework-app';
  public lineW: number;

  initializeView(): void {
  }
  createCompleteView(): void {
  }
  onClick(): void {
    this.labels.updateLabels('はい', 'いいえ', 'OK', 'キャンセル');
    this.flAlert.showQuestion(this.title, 'クリックしましたか？');
  }
  clearCanvas(element: HTMLCanvasElement) {
    clearCanvas(element);
  }

  constructor(private waitDialog: WaitDialogService, private labels: AlertLabels) {
    super();
    labels.setDefault();
    this.lineW = 1;
  }
}
