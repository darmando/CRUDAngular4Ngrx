import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Productos } from '../../models/productos.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {Update} from '@ngrx/entity/src/models';

/*
  ACTION CONSTANTS
*/


export const LOAD_ALL = '[Productos] LOAD ALL';
export const LOAD_ALL_SUCCESS = '[Productos] LOAD ALL SUCCESS';

export const LOAD = '[Productos] LOAD';
export const LOAD_SUCCESS = '[Productos] LOAD SUCCESS';

export const CREATE = '[Productos] CREATE';
export const CREATE_SUCCESS = '[Productos] CREATE SUCCESS';
export const SET_CURRENT_PRODUCT_ID = '[Productos] SET CURRENT PRODUCT ID';

export const PATCH = '[Contacts] PATCH';
export const PATCH_SUCCESS = '[Contacts] PATCH SUCCESS';

export const DELETE = '[Contacts] DELETE';
export const DELETE_SUCCESS = '[Contacts] DELETE SUCCESS';

export const FAILURE = '[Contacts] FAILURE';

/*
  ACTION CLASSES
*/

export class LoadAll implements Action {
  readonly type = LOAD_ALL;
  
  constructor(public payload = null) {}
}
export class LoadAllSuccess implements Action {
  readonly type = LOAD_ALL_SUCCESS;
  
  constructor(public payload: Productos[]) {}
}

export class Load implements Action {
  readonly type = LOAD;
  constructor(public payload: number) {}
}
export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: Productos) {}
}

export class Patch implements Action {
  readonly type = PATCH;
  constructor(public payload: Productos) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: number) {}
}

export class Create implements Action {
  readonly type = CREATE;
  constructor(public payload: Productos) {}
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: Productos) {}
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public payload: number) {}
}


export class SetCurrentProductId implements Action {
  readonly type = SET_CURRENT_PRODUCT_ID;
  constructor(public payload: number) {}
}


export class PatchSuccess implements Action {
  readonly type = PATCH_SUCCESS;
  constructor(public payload: Update<Productos>) {}
}

export class Failure implements Action {
  readonly type = FAILURE;
  constructor (public payload: {concern: 'CREATE' | 'PATCH', error: any}) {}
}

export type All =
| SetCurrentProductId
| LoadAll
| Load
| Create
| Patch
| Delete
| LoadAllSuccess
| LoadSuccess
| PatchSuccess
| CreateSuccess
| DeleteSuccess
| Failure
