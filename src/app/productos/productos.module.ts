import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { ModalProductosComponent } from './components/modal-productos/modal-productos.component';
import { RouterModule } from '@angular/router';
import { ProductosComponent } from './productos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import * as fromProducts from './stores';
import { ProductosEffects } from './stores/effects/productos.effects';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: ':productos/',
        component: ProductosComponent,
      },
      { path: '', component: ProductosComponent },
    ]),
    StoreModule.forFeature('products', fromProducts.reducers),
    EffectsModule.forFeature([ProductosEffects])
  ],
  entryComponents: [ModalProductosComponent],
  declarations: [ProductosComponent,ListaProductosComponent, ModalProductosComponent]
})
export class ProductosModule { }
