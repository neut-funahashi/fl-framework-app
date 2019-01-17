import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject, Injector } from '@angular/core';

import { AppComponent } from './app.component';
import { FlFrameworkModule, FrameworkModule, FrameworkProviders } from 'fl-framework-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule, MatIconModule, MatButtonModule } from '@angular/material';
import { TopComponentComponent } from './top-component/top-component.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
   declarations: [
      AppComponent,
      TopComponentComponent
   ],
   imports: [
      BrowserModule,
      FlFrameworkModule,
      FlexLayoutModule,
      MatButtonModule,
      MatIconModule,
      AppRoutingModule
   ],
   providers: [
      FrameworkProviders,
      // {
      //    provide: 'flRequestEndPoint', useValue:
      //    {
      //      host: '',  //省略は、呼び出し元からコールする
      //      contextName: 'api',
      //      appVersion: '1.0.0',
      //      versionName: 'version'
      //    }
      // }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule extends FrameworkModule
{
  constructor(injector:Injector) {
    super(injector);
  }
}
