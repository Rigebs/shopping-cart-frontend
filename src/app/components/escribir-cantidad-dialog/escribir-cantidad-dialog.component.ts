import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-escribir-cantidad-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './escribir-cantidad-dialog.component.html',
  styleUrl: './escribir-cantidad-dialog.component.css',
})
export class EscribirCantidadDialogComponent {
  cantidad: number = 1;

  constructor(
    private dialogRef: MatDialogRef<EscribirCantidadDialogComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }

  Confirmar() {
    this.dialogRef.close(this.cantidad);
  }
}
