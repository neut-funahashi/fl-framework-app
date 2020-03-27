import { Injector, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { FlFrameworkModule, FrameworkModule, FrameworkProviders } from 'fl-framework-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopComponentComponent } from './top-component/top-component.component';


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
export class AppModule extends FrameworkModule {
  constructor(injector: Injector) {
    super(injector);
  }
}
