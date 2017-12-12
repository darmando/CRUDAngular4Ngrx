import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import * as productosActions from './../actions/productos.actions';
import {Actions, Effect} from '@ngrx/effects';
import { ProductosService } from '../../services/productos.service';
import { Productos } from './../../models/productos.model';
import 'rxjs/Rx';


@Injectable()
export class ProductosEffects {
    constructor(private actions$: Actions,private productosServices: ProductosService) {}
    
    @Effect()
    loadAll$: Observable<Action> = this.actions$
        .ofType(productosActions.LOAD_ALL) /* When [Contacts] LOAD ALL action is dispatched */
        .startWith(new productosActions.LoadAll())
        .switchMap(() =>
            this.productosServices.index() /* Hit the Contacts Index endpoint of our REST API */
                /* Dispatch LoadAllSuccess action to the central store with id list returned by the backend as id*/
                /* 'Contacts Reducers' will take care of the rest */
                .map((productos: Productos[]) => new productosActions.LoadAllSuccess(productos))
        );
        
    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(productosActions.LOAD)
        .map( (action: productosActions.Load ) => action.payload)
        .switchMap((id) =>
            this.productosServices.show(id)
                .mergeMap( (producto: Productos) => {
                    return [
                        new productosActions.LoadSuccess(producto),
                        new productosActions.SetCurrentProductId(producto.cat_prec_id)
                    ]
                })
        );

        @Effect()
        update$: Observable<Action> = this.actions$
            .ofType(productosActions.PATCH)
            .map((action: productosActions.Patch) => action.payload)
            .switchMap((contact: Productos) =>
                this.productosServices.update(contact)
                    .map( (updatedContact: Productos) => new productosActions.PatchSuccess({id: updatedContact.cat_prec_id, changes: updatedContact}))
                    .catch(err => {
                     // alert(err['error']['error']['message']);
                      return Observable.of(new productosActions.Failure({concern: 'PATCH', error: err}));
                    })
            );
             
        @Effect()
        create$: Observable<Action> = this.actions$
            .ofType(productosActions.CREATE)
            .map((action: productosActions.Create) => action.payload)
            .switchMap((contact) =>
                this.productosServices.create(contact)
                    .map( (createdContact: Productos) => new productosActions.CreateSuccess(createdContact))
                    .catch(err => {
                      //  alert(err['error']['error']['message']);
                        return Observable.of(new productosActions.Failure({concern: 'CREATE', error: err}));
                    })
            );


        @Effect()
        destroy$: Observable<Action> = this.actions$
            .ofType(productosActions.DELETE)
            .map((action: productosActions.Delete) => action.payload)
            .switchMap((id: number) =>
                this.productosServices.destroy(id)
                    .map( () => new productosActions.DeleteSuccess(id))
                    .catch(err => {
                        //  alert(err['error']['error']['message']);
                          return Observable.of(new productosActions.Failure({concern: 'CREATE', error: err}));
                      })
            );          

}
