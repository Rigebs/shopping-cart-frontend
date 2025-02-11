import { Component } from '@angular/core';
import { ProductoResponse } from '../../interfaces/producto-response';
import { ProductoService } from '../../services/producto.service';
import { ProductoCardComponent } from '../../components/producto-card/producto-card.component';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { CategoriaResponse } from '../../interfaces/categoria-response';
import { CategoriaService } from '../../services/categoria.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  imports: [
    ProductoCardComponent,
    MatButtonToggleGroup,
    CommonModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent {
  productos: ProductoResponse[] = [];
  categorias: CategoriaResponse[] = [];

  isFiltrado: boolean = false;

  categoriaSeleccionada: number | null = null;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.listarProductos();
    this.listarCategorias();
  }

  listarProductos() {
    this.productoService.getProductos().subscribe({
      next: (response) => {
        this.productos = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  listarProductosPorCategoria(categoriaId: number) {
    this.productoService.getProductosByCategoria(categoriaId).subscribe({
      next: (response) => {
        this.productos = response;
        this.isFiltrado = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  listarCategorias() {
    this.categoriaService.getCategorias().subscribe({
      next: (response) => {
        this.categorias = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  limpiarFiltros() {
    this.isFiltrado = false;
    this.categoriaSeleccionada = null;
    this.listarProductos();
  }
}
