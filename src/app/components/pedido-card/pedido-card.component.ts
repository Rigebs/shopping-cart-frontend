import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PedidoResponse } from '../../interfaces/pedido-response';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe, NgClass } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarDialogComponent } from '../confirmar-dialog/confirmar-dialog.component';

@Component({
  selector: 'app-pedido-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, DatePipe, NgClass],
  templateUrl: './pedido-card.component.html',
  styleUrl: './pedido-card.component.css',
})
export class PedidoCardComponent {
  @Input() pedido: PedidoResponse = {} as PedidoResponse;
  @Input() pedidoSeleccionadoId: number | null = null;

  @Output() pedidoId = new EventEmitter<number>();
  @Output() pagar = new EventEmitter<number>();
  @Output() cancelar = new EventEmitter<number>();

  constructor(private dialog: MatDialog) {}

  seleccionar(pedidoId: number) {
    this.pedidoId.emit(pedidoId);
  }

  pagarPedido(pedidoId: number) {
    this.mostrarConfirmacion().subscribe((confirmado) => {
      if (confirmado) {
        console.log('pagar');

        this.pagar.emit(pedidoId);
      }
    });
  }

  cancelarPedido(pedidoId: number) {
    this.mostrarConfirmacion().subscribe((confirmado) => {
      if (confirmado) {
        console.log('cancelar');

        this.cancelar.emit(pedidoId);
      }
    });
  }

  mostrarConfirmacion() {
    const dialogRef = this.dialog.open(ConfirmarDialogComponent, {
      width: '150px',
    });

    return dialogRef.afterClosed();
  }
}
