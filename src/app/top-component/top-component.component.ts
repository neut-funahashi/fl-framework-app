import { Component, OnInit } from '@angular/core';
import { FlComponentBase } from 'fl-framework-angular';
import { WaitDialogService } from 'fl-framework-angular';
import { FlServiceName } from 'fl-framework-angular';

@FlServiceName('Test')
@Component({
  selector: 'app-top-component',
  templateUrl: './top-component.component.html',
  styleUrls: ['./top-component.component.scss']
})
export class TopComponentComponent extends FlComponentBase {
  initializeView(): void {
  }
  createCompleteView(): void {
    this.init({'__headers__':{'APPEND-HEADER-PARAM':'1234567890'}}).subscribe((result)=>{
      console.log(result);
    },(error)=>{
      console.log(error);
    });
  }

  constructor(private waitDialog:WaitDialogService) { 
    super();
  }

}
