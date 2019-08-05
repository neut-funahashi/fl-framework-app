import { NgModule } from '@angular/core';
import * as material from '@angular/material';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FrameworkDeclarationsComponents, FrameworkEntryComponents, FrameworkProviders } from './framework.module';

@NgModule({
  declarations: [
    FrameworkDeclarationsComponents
  ],
  entryComponents: [
    FrameworkEntryComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FlexLayoutModule,
    material.MatAutocompleteModule,
    material.MatButtonModule,
    material.MatButtonToggleModule,
    material.MatCardModule,
    material.MatCheckboxModule,
    material.MatChipsModule,
    material.MatDatepickerModule,
    material.MatDialogModule,
    material.MatExpansionModule,
    material.MatGridListModule,
    material.MatIconModule,
    material.MatInputModule,
    material.MatListModule,
    material.MatMenuModule,
    material.MatNativeDateModule,
    material.MatPaginatorModule,
    material.MatProgressBarModule,
    material.MatProgressSpinnerModule,
    material.MatRadioModule,
    material.MatRippleModule,
    material.MatSelectModule,
    material.MatSidenavModule,
    material.MatSliderModule,
    material.MatSlideToggleModule,
    material.MatSnackBarModule,
    material.MatSortModule,
    material.MatTableModule,
    material.MatTabsModule,
    material.MatToolbarModule,
    material.MatTooltipModule,
    material.MatStepperModule
  ],
  providers: [
    FrameworkProviders,
    {
      provide: 'flRequestEndPoint', useValue:
      {
        host: '',  // 省略は、呼び出し元からコールする
        contextName: '_api',
        appVersion: '0.0.1',
        versionName: 'version',
        isDefault: true
      }
   }
  ],
  exports: [
    FrameworkDeclarationsComponents
  ]
})
export class FlFrameworkModule { }
