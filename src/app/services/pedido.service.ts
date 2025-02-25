import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoRequest } from '../interfaces/pedido-request';
import { ApiResponse } from '../interfaces/api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private readonly apiUrl = 'http://localhost:8080/pedidos';

  constructor(private httpClient: HttpClient) {}

  generatePedido(pedidoRequest: PedidoRequest): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${this.apiUrl}`, pedidoRequest);
  }
}
