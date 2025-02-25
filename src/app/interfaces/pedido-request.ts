import { DetallePedidoRequest } from './detalle-pedido-request';

export interface PedidoRequest {
  total: number;
  detalles: DetallePedidoRequest[];
}
