import { Routes } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';

export const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'pedidos', component: PedidosComponent },
];
