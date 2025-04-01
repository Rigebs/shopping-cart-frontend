import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { PedidoResponse } from '../../interfaces/pedido-response';
import { PedidoCardComponent } from '../../components/pedido-card/pedido-card.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DetallePedidoResponse } from '../../interfaces/detalle-pedido-response';
import { DetallesPedidoInfoComponent } from '../../components/detalles-pedido-info/detalles-pedido-info.component';
import { NotificacionService } from '../../services/notificacion.service';

@Component({
  selector: 'app-pedidos',
  imports: [
    PedidoCardComponent,
    MatDividerModule,
    MatButtonModule,
    DetallesPedidoInfoComponent,
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent implements OnInit {
  pedidos: PedidoResponse[] = [];
  pedidoSeleccionadoId: number | null = null;
  detalles: DetallePedidoResponse[] = [];
  hayDetalles: boolean = false;

  constructor(
    private pedidoService: PedidoService,
    private notificacionService: NotificacionService
  ) {}

  ngOnInit(): void {
    this.listarPedidos();
  }

  listarPedidos() {
    this.pedidoService.getPedidos().subscribe({
      next: (response) => {
        this.pedidos = response;
      },
      error: (err) => console.log(err),
    });
  }

  listarDetalles(pedidoId: number) {
    this.pedidoSeleccionadoId = pedidoId;

    this.pedidoService.getDetalles(pedidoId).subscribe({
      next: (response) => {
        this.detalles = response;
        this.hayDetalles = true;
      },
      error: (err) => console.log(err),
    });
  }

  pagarPedido(pedidoId: number) {
    this.pedidoService.pagarPedido(pedidoId).subscribe({
      next: (response) => {
        this.notificacionService.mostrarMensaje(response.mensaje);
        this.listarPedidos();
      },
    });
  }

  cancelarPedido(pedidoId: number) {
    this.pedidoService.cancelarPedido(pedidoId).subscribe({
      next: (response) => {
        this.notificacionService.mostrarMensaje(response.mensaje);
        this.listarPedidos();
      },
    });
  }
}
