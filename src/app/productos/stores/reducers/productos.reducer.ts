import { Productos } from '../../models/productos.model';
import {EntityState, createEntityAdapter} from '@ngrx/entity';
import * as productosActions from '../actions/productos.actions';
import {Update} from '@ngrx/entity/src/models';


// This adapter will allow is to manipulate contacts (mostly CRUD operations)
export const productsAdapter = createEntityAdapter<Productos>({
    selectId: (contact: Productos) => contact.cat_prec_id,
    sortComparer: false
  });
  
  export interface State extends EntityState<Productos> {
    currentProductId?: number
  }
  
  export const INIT_STATE: State = productsAdapter.getInitialState({
    currentProductId: undefined
  });
  
  
  
  export function reducer(state: State = INIT_STATE,{type, payload}: productosActions.All){
  
    switch (type) {
  
      case productosActions.SET_CURRENT_PRODUCT_ID : {
        return {...state, currentProductId: payload}
      }
  
  
      case productosActions.LOAD_ALL_SUCCESS : {
  
        return {...state, ...productsAdapter.addAll(payload as Productos[], state)}
      }
  
      case productosActions.LOAD_SUCCESS || productosActions.CREATE_SUCCESS : {
        return {...state, ...productsAdapter.addOne(payload as Productos, state)}
      }
  
      case productosActions.PATCH_SUCCESS : {
        return {
          ...state,
          ...productsAdapter.updateOne(payload as Update<Productos>, state)
        }
      }
  
      case productosActions.DELETE_SUCCESS : {
        return {...state, ...productsAdapter.removeOne(payload as number, state)}
      }
  
      default: {
        return state;
      }
  
    }
  }
  
  export const getProductId = (state: State) => state.currentProductId;
 