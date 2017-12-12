import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { AppComponent } from './app.component';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import * as fromRoot from './store/reducers/index.reducers';
import { ProductosService } from './productos/services/productos.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  //  NgbModule.forRoot(),
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    StoreModule.forRoot(fromRoot.rootReducer),    
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
    EffectsModule.forRoot([]) /* Start monitoring app's side effects */    
  ],
  providers: [ProductosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
