import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CarritoItemResponse } from '../../interfaces/carrito-item-response';
import { CarritoResponse } from '../../interfaces/carrito-response';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EscribirCantidadDialogComponent } from '../escribir-cantidad-dialog/escribir-cantidad-dialog.component';
import { NotificacionService } from '../../services/notificacion.service';
import { DetallePedidoRequest } from '../../interfaces/detalle-pedido-request';
import { PedidoRequest } from '../../interfaces/pedido-request';

@Component({
  selector: 'app-productos-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './productos-table.component.html',
  styleUrl: './productos-table.component.css',
})
export class ProductosTableComponent implements OnChanges {
  @Input() carrito: CarritoResponse = { total: 0, items: [] };

  @Output() edit = new EventEmitter<{ itemId: number; cantidad: number }>();
  @Output() delete = new EventEmitter<number>();

  @Output() pedido = new EventEmitter<PedidoRequest>();

  displayedColumns: string[] = [
    'producto',
    'precio',
    'cantidad',
    'subtotal',
    'acciones',
  ];

  dataSource: CarritoItemResponse[] = [];

  isActivado: boolean = true;

  constructor(
    private dialog: MatDialog,
    private notificacionService: NotificacionService
  ) {}

  ngOnChanges() {
    console.log('dfkj');

    if (this.carrito.items) {
      this.dataSource = this.carrito.items;
    } else {
      this.dataSource = [];
    }

    this.isActivado = this.dataSource.length === 0;
  }

  onEdit(itemId: number) {
    const dialogRef = this.dialog.open(EscribirCantidadDialogComponent, {
      width: '150px',
    });

    dialogRef.afterClosed().subscribe((cantidad) => {
      if (cantidad) {
        if (cantidad < 0) {
          this.notificacionService.mostrarMensaje(
            'La cantidad seleccionada no es válida'
          );
          return;
        }
        this.edit.emit({ itemId: itemId, cantidad: cantidad });
      }
    });
  }

  onDelete(itemId: number) {
    this.delete.emit(itemId);
  }

  onPedir() {
    let total = 0;

    const detallesPedido: DetallePedidoRequest[] = this.dataSource.map(
      (item) => {
        total += item.subtotal;

        return {
          cantidad: item.cantidad,
          subtotal: item.subtotal,
          productoId: item.productoId,
        };
      }
    );

    const pedidoGenerado: PedidoRequest = {
      total: Number(total.toFixed(2)),
      detalles: detallesPedido,
    };

    this.pedido.emit(pedidoGenerado);
  }
}
