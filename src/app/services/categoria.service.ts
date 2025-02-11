import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaResponse } from '../interfaces/categoria-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly apiUrl = 'http://localhost:8080/categorias';

  constructor(private httpClient: HttpClient) {}

  getCategorias(): Observable<CategoriaResponse[]> {
    return this.httpClient.get<CategoriaResponse[]>(this.apiUrl);
  }
}
