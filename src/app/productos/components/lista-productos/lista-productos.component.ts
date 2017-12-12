import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Productos } from '../../models/productos.model';


@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  
  @Input() productos: Productos[];

  @Output() onEdit = new EventEmitter<Productos>();
  @Output() onShow = new EventEmitter<Productos>();
  @Output() onDelete = new EventEmitter<Productos>();

  contactsTrackByFn = (index: number, productos: Productos) => productos.cat_prec_id;
  constructor() {

  }

  ngOnInit() {
     /* this.productos$ = this.store.select(fromProductos.getFilteredProductos);
      this.listFilters$ = this.store.select(fromProductos.getListFilters); // filtros
      this.actions.httpObtenerProductos();*/
  }

  
  showDetails(productos: Productos) {
    this.onShow.emit(productos);
  }

  editContact(productos: Productos) {
    this.onEdit.emit(productos)
  }

  deleteContact(productos: Productos) {
    this.onDelete.emit(productos)
  }

  detalleProducto(event,model:Productos) : void{
    console.log(model);
  }
    

}
