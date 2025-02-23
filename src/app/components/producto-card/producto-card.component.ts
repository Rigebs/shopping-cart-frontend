import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { ProductoResponse } from '../../interfaces/producto-response';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EscribirCantidadDialogComponent } from '../escribir-cantidad-dialog/escribir-cantidad-dialog.component';
import { AgregarItemRequest } from '../../interfaces/agregar-item-request';
import { CrearCarritoRequest } from '../../interfaces/crear-carrito-request';
import { NotificacionService } from '../../services/notificacion.service';

@Component({
  selector: 'app-producto-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './producto-card.component.html',
  styleUrl: './producto-card.component.css',
})
export class ProductoCardComponent {
  @Input() producto: ProductoResponse = {} as ProductoResponse;

  @Output() crearCarrito = new EventEmitter<CrearCarritoRequest>();
  @Output() agregarItem = new EventEmitter<AgregarItemRequest>();

  constructor(
    private dialog: MatDialog,
    private notificacionService: NotificacionService
  ) {}

  seleccionarCantidad(producto: ProductoResponse) {
    const dialogRef = this.dialog.open(EscribirCantidadDialogComponent, {
      width: '150px',
    });

    dialogRef.afterClosed().subscribe((cantidad) => {
      if (cantidad) {
        if (cantidad > producto.cantidad || cantidad < 0) {
          this.notificacionService.mostrarMensaje(
            'La cantidad seleccionada no es válida'
          );
          return;
        }
        const carritoId = localStorage.getItem('carritoId');

        if (carritoId) {
          const request: AgregarItemRequest = {
            cantidad: cantidad,
            productoId: producto.id,
            carritoId: Number(carritoId),
          };
          this.agregarItem.emit(request);
        } else {
          const request: CrearCarritoRequest = {
            cantidad: cantidad,
            productoId: producto.id,
            total: producto.precio * cantidad,
          };
          this.crearCarrito.emit(request);
        }
      }
    });
  }
}
