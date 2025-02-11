import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { ProductoResponse } from '../../interfaces/producto-response';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-producto-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './producto-card.component.html',
  styleUrl: './producto-card.component.css',
})
export class ProductoCardComponent {
  @Input() producto: ProductoResponse | undefined;
}
