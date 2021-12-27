import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {NominatimService} from './services/nominatim-service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MapComponent} from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LeafletModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    NominatimService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
