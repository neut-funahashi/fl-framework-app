import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class FlDialog {
    constructor(protected madDialog: MatDialog, protected router: Router) {
    }
    open<T, D = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig<D>): MatDialogRef<T> {
        const result: MatDialogRef<T> = this.madDialog.open(componentOrTemplateRef, config);
        const subs: Subscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                if (result) {
                    // 強制close
                    result.close();
                }
            }
        });
        result.afterClosed().subscribe(
            () => {
                subs.unsubscribe();
            }
        );
        return result;
    }
}
