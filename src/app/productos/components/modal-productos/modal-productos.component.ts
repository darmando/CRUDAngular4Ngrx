import { Component, OnInit ,Input, Output,EventEmitter} from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from './../../stores/reducers/productos.reducer';
import { Productos } from '../../models/productos.model';
import * as ProductosActions from '../../stores/actions/productos.actions';


@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.component.html',
  styleUrls: ['./modal-productos.component.css']
})

export class ModalProductosComponent implements OnInit {
  @Input() modelProductos: Productos;
  @Input() esEdicion: boolean;
  routeSub : any;
  closeResult: string;
  rForm: FormGroup;
  nombre:string = "";
  precio:number = 0;
  cat_prec_id:number = 0;


  constructor(public activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private route : ActivatedRoute,
              private store: Store<State>
              ) {

                this.rForm = fb.group({
                  'cat_prec_id': [null, Validators.required],
                  'nombre': [null, Validators.required],
                  'precio': [null, Validators.required]
                });

              }
 
    ngOnInit() {
      if(!this.esEdicion){
        // agregar
      }else{
        // actualizar
        this.nombre = this.modelProductos.nombre;
        this.precio =  this.modelProductos.precio;
        this.cat_prec_id = this.modelProductos.cat_prec_id;
      }
    }

    guardarProducto($event,productos:Productos):void{
        if(!this.esEdicion){
          // agregar
          this.store.dispatch(new ProductosActions.Create(productos));
        }else{
          // actualizar
          this.store.dispatch(new ProductosActions.Patch(productos));
        }
    }
  

}