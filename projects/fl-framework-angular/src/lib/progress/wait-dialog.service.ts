import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { FlDialog } from '../dialog/fl-dialog';
import { WaitDialogComponent } from './wait-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class WaitDialogService {
  private dialogRef:MatDialogRef<WaitDialogComponent>;
  private count:number = 0;
  constructor(private dialog:FlDialog) { }
  show() {
    this.count++;
    if (this.dialogRef == null) {
      const dialogConfig:MatDialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = false;
      dialogConfig.panelClass = 'transparent';
      this.dialogRef = this.dialog.open(WaitDialogComponent,dialogConfig);
    }
    return this.dialogRef.afterClosed(); 
  }
  close() {
    this.count--;
    if (this.dialogRef != null && this.count <= 0) {
      this.count = 0;
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }
}
