import { Injector } from '@angular/core';
import { FlServiceInjector } from './core/fl-service-injector';
import { FlAlertComponent } from './fl-alert/fl-alert.component';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { ParentClickDirective } from './directives/parent-click-directive';
import { DrawingDirective } from './directives/drawing-directive';
import { WaitDialogComponent } from './progress/wait-dialog.component';

// popup
export const FrameworkPopupComponents = [
  FlAlertComponent,
  WaitDialogComponent
];
// component
export const FrameworkComponents = [

];
// directive
export const FrameworkDirectives = [
  ParentClickDirective,
  DrawingDirective
];
// provider
export const FrameworkProviders = [
  { provide: MAT_DIALOG_DATA, useValue: {} },
  { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { panelClass: 'transparent', hasBackdrop: true, disableClose: true, autoFocus: true } }
];

export const FrameworkDeclarationsComponents = [
  FrameworkPopupComponents,
  FrameworkComponents,
  FrameworkDirectives
];

export const FrameworkEntryComponents = [
  FrameworkPopupComponents
];

// @dynamic
export class FrameworkModule {
  constructor(protected injector: Injector) {
    FlServiceInjector.injector = injector;
  }
}
