import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CarritoItemResponse } from '../../interfaces/carrito-item-response';
import { CarritoResponse } from '../../interfaces/carrito-response';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-productos-table',
  imports: [MatTableModule, MatButtonModule, MatDividerModule, MatCardModule],
  templateUrl: './productos-table.component.html',
  styleUrl: './productos-table.component.css',
})
export class ProductosTableComponent {
  @Input() carrito: CarritoResponse = {} as CarritoResponse;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  dataSource: CarritoItemResponse[] = [];

  ngOnChanges() {
    this.dataSource = this.carrito.items;
  }
}
