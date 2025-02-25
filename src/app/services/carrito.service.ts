import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarritoResponse } from '../interfaces/carrito-response';
import { AgregarItemRequest } from '../interfaces/agregar-item-request';
import { ApiResponse } from '../interfaces/api-response';
import { CrearCarritoRequest } from '../interfaces/crear-carrito-request';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private readonly apiUrl = 'http://localhost:8080/carritos';

  constructor(private httpClient: HttpClient) {}

  createCarrito(
    crearCarritoRequest: CrearCarritoRequest
  ): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${this.apiUrl}`,
      crearCarritoRequest
    );
  }

  getCarrito(carritoId: number): Observable<CarritoResponse> {
    return this.httpClient.get<CarritoResponse>(`${this.apiUrl}/${carritoId}`);
  }

  addItem(agregarCarritoRequest: AgregarItemRequest): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${this.apiUrl}/items`,
      agregarCarritoRequest
    );
  }

  updateCantidad(itemId: number, cantidad: number): Observable<ApiResponse> {
    return this.httpClient.put<ApiResponse>(
      `${this.apiUrl}/items/${itemId}`,
      null,
      {
        params: { cantidad: cantidad },
      }
    );
  }

  deleteItem(itemId: number): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(
      `${this.apiUrl}/items/${itemId}`
    );
  }
}
