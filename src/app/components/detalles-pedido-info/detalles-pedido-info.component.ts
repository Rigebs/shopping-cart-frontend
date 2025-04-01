import { Component, Input } from '@angular/core';
import { DetallePedidoResponse } from '../../interfaces/detalle-pedido-response';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-detalles-pedido-info',
  imports: [MatTableModule],
  templateUrl: './detalles-pedido-info.component.html',
  styleUrl: './detalles-pedido-info.component.css',
})
export class DetallesPedidoInfoComponent {
  @Input() detalles: DetallePedidoResponse[] = [];

  displayedColumns: string[] = ['producto', 'cantidad', 'precio', 'subtotal'];
}
