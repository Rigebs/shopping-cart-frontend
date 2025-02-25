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
import { ProductosTableComponent } from '../../components/productos-table/productos-table.component';
import { CarritoService } from '../../services/carrito.service';
import { CarritoResponse } from '../../interfaces/carrito-response';
import { AgregarItemRequest } from '../../interfaces/agregar-item-request';
import { CrearCarritoRequest } from '../../interfaces/crear-carrito-request';
import { NotificacionService } from '../../services/notificacion.service';
import { PedidoRequest } from '../../interfaces/pedido-request';
import { PedidoService } from '../../services/pedido.service';

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
    ProductosTableComponent,
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent {
  productos: ProductoResponse[] = [];
  categorias: CategoriaResponse[] = [];

  carrito: CarritoResponse = {} as CarritoResponse;

  isFiltrado: boolean = false;

  categoriaSeleccionada: number | null = null;

  productoSeleccionado: number = 0;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private carritoService: CarritoService,
    private notificacionService: NotificacionService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.listarProductos();
    this.listarCategorias();
    this.obtenerCarrito();
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

  obtenerCarrito() {
    const carritoId = localStorage.getItem('carritoId');

    if (!carritoId) {
      return;
    }

    this.carritoService.getCarrito(Number(carritoId)).subscribe({
      next: (response) => {
        this.carrito = response;
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

  limpiarFiltros() {
    this.isFiltrado = false;
    this.categoriaSeleccionada = null;
    this.listarProductos();
  }

  crearCarrito(crearCarrito: CrearCarritoRequest) {
    this.carritoService.createCarrito(crearCarrito).subscribe({
      next: (response) => {
        localStorage.setItem('carritoId', response.extra);
        this.obtenerCarrito();
      },
    });
  }

  agregarAlCarrito(agregarIten: AgregarItemRequest) {
    this.carritoService.addItem(agregarIten).subscribe({
      next: (response) => {
        console.log(response);
        this.obtenerCarrito();
      },
    });
  }

  editarCantidad(editar: { itemId: number; cantidad: number }) {
    this.carritoService
      .updateCantidad(editar.itemId, editar.cantidad)
      .subscribe({
        next: (response) => {
          this.notificacionService.mostrarMensaje(response.mensaje);
          this.obtenerCarrito();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  quitarItem(itemId: number) {
    this.carritoService.deleteItem(itemId).subscribe({
      next: (response) => {
        this.notificacionService.mostrarMensaje(response.mensaje);
        this.obtenerCarrito();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  generarPedido(pedidoRequest: PedidoRequest) {
    this.pedidoService.generatePedido(pedidoRequest).subscribe({
      next: (response) => {
        this.notificacionService.mostrarMensaje(response.mensaje);
        localStorage.clear();
        this.carrito = { total: 0, items: [] };
        this.listarProductos();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
