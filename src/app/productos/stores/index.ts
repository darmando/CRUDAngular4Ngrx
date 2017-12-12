import * as fromProducts from './reducers/productos.reducer'
import * as fromRoot from '../stores/reducers/productos.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface ProductosState {
  products: fromProducts.State
}

// This is a lazy loaded state, so we need to extend from the App Root State
export interface State extends fromRoot.State {
  products: ProductosState
}

export const reducers = {
  products: fromProducts.reducer
};

export const getProductsRootState = createFeatureSelector<ProductosState>('products');

export const getProductosState = createSelector(
    getProductsRootState,
    state => state.products
);

export const getSelectedProductsId = createSelector(
  getProductosState,
  fromProducts.getProductId
);

export const {
  selectAll: getAllProducts,
  selectEntities: getProductsEntities
} = fromProducts.productsAdapter.getSelectors(getProductosState);

export const getCurrentContact = createSelector(
  getProductsEntities,
  getSelectedProductsId,
  (entities, id) => id && entities[id]
);
