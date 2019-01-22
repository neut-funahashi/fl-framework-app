import { Component, OnInit } from '@angular/core';
import { FlAlertService, FlComponentBase } from 'fl-framework-angular';
import { WaitDialogService } from 'fl-framework-angular';
import { isEmpty,clearCanvas } from 'fl-framework-angular';
import { FlHttpRequestService } from 'fl-framework-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends FlComponentBase {
  initializeView(): void {
  }
  createCompleteView(): void {
  }
  public lineW:Number;

  ngOnInit(): void {
    // setTimeout(()=>{
    //   this.flService.post('Test','init',{}).subscribe((e)=>{

    //   });
    //   this.waitDialog.show();
    //   setTimeout(()=>{
    //     this.waitDialog.close();
    //     this.alert.show('a',"b");
    //   },1000);
    // },500);
  }
  title = 'framework-app';

  clearCanvas(element:HTMLCanvasElement) {
    clearCanvas(element);
  }

  constructor(private waitDialog:WaitDialogService) {
    super();
    this.lineW = 1;
  }
}
