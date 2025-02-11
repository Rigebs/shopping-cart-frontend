import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoResponse } from '../interfaces/producto-response';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private readonly apiUrl = 'http://localhost:8080/productos';

  constructor(private httpClient: HttpClient) {}

  getProductos(): Observable<ProductoResponse[]> {
    return this.httpClient.get<ProductoResponse[]>(this.apiUrl);
  }

  getProductosByCategoria(categoriaId: number): Observable<ProductoResponse[]> {
    return this.httpClient.get<ProductoResponse[]>(
      `${this.apiUrl}/categoria/${categoriaId}`
    );
  }
}
