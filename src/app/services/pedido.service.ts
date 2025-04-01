import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoRequest } from '../interfaces/pedido-request';
import { ApiResponse } from '../interfaces/api-response';
import { Observable } from 'rxjs';
import { PedidoResponse } from '../interfaces/pedido-response';
import { DetallePedidoResponse } from '../interfaces/detalle-pedido-response';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private readonly apiUrl = 'http://localhost:8080/pedidos';

  constructor(private httpClient: HttpClient) {}

  generatePedido(pedidoRequest: PedidoRequest): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${this.apiUrl}`, pedidoRequest);
  }

  getPedidos(): Observable<PedidoResponse[]> {
    return this.httpClient.get<PedidoResponse[]>(`${this.apiUrl}`);
  }

  getDetalles(pedidoId: number): Observable<DetallePedidoResponse[]> {
    return this.httpClient.get<DetallePedidoResponse[]>(
      `${this.apiUrl}/${pedidoId}`
    );
  }

  pagarPedido(pedidoId: number): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${this.apiUrl}/${pedidoId}/pagar`,
      {}
    );
  }

  cancelarPedido(pedidoId: number): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${this.apiUrl}/${pedidoId}/cancelar`,
      {}
    );
  }
}
