import { Component, OnInit } from '@angular/core';
import { Productos } from './../productos/models/productos.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
//import * as fromProductos from './reducers/productos.reducer';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromProductos from './stores/index';
import * as productsActions from './stores/actions/productos.actions';
import * as fromRoot from './stores/reducers/productos.reducer';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import * as ProductosActions  from './stores/actions/productos.actions';
import { ModalProductosComponent } from './components/modal-productos/modal-productos.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  // productos$: Observable<Array<Productos>>;
  // listFilters$: Observable<fromProductos.ProductosListaFiltros>;  
  // constructor(private store: Store<State>, public actions: ProductosActions) { }
  
  productos$: Observable<Productos[]>;
  constructor(public store: Store<fromRoot.State>, private router: Router, private actR: ActivatedRoute,private modalService: NgbModal){}
  ngOnInit() {
     /* this.productos$ = this.store.select(fromProductos.getFilteredProductos);
      this.productos$.subscribe(console.log);

      this.listFilters$ = this.store.select(fromProductos.getListFilters); // filtros
      this.actions.httpObtenerProductos();*/
     // this.productos$ = this.store.select(fromProductos.);
     // this.store.dispatch(new contactProducts.LoadAll());
    
     this.productos$ = this.store.select( fromProductos.getAllProducts );
     
     this.productos$.subscribe(console.log);
     
     this.store.dispatch(new productsActions.LoadAll());



  }

  editContact(productos: Productos) {
    //this.store.dispatch(new contactsActions.SetCurrentContactId(contact.id));
    //this.router.navigate(['/contacts', contact.id, 'edit'])
    const modalRef = this.modalService.open(ModalProductosComponent);
    modalRef.componentInstance.modelProductos = productos;
    modalRef.componentInstance.esEdicion = true;
    
  }

  showContact(productos: Productos) {
    

   // this.store.dispatch(new contactsActions.SetCurrentContactId(contact.id));
   // this.router.navigate(['/contacts', contact.id])
  }

  deleteContact(productos: Productos) {
    const r = confirm("¿Está seguro de eliminar el producto "+productos.nombre+" ?");
    if (r) {
      this.store.dispatch(new ProductosActions.Delete(productos.cat_prec_id));
    }
  }


  OnClickAgregarProductos($event) {
    const modalRef = this.modalService.open(ModalProductosComponent);
    modalRef.componentInstance.modelProductos = null;
    modalRef.componentInstance.edEdicion = false;
  }



}
