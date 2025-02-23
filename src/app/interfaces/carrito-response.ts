import { CarritoItemResponse } from './carrito-item-response';

export interface CarritoResponse {
  total: number;
  items: CarritoItemResponse[];
}
