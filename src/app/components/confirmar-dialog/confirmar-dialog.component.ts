import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-dialog',
  imports: [MatDialogModule, FormsModule, MatButtonModule],
  templateUrl: './confirmar-dialog.component.html',
  styleUrl: './confirmar-dialog.component.css',
})
export class ConfirmarDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmarDialogComponent>) {}

  close() {
    this.dialogRef.close(false);
  }

  Confirmar() {
    this.dialogRef.close(true);
  }
}
