import { Component, OnInit, Output } from '@angular/core';
import { icon, latLng, LeafletMouseEvent, Map, MapOptions, marker, tileLayer } from 'leaflet';
import { EventEmitter } from 'protractor';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../app.constants';
import { NominatimService } from '../services/nominatim-service';
import { MapPoint } from '../shared/models/map-point.model';
import { NominatimResponse } from '../shared/models/nominatim-response.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: Map;
  mapPoint: MapPoint;
  options: MapOptions;
  lastLayer: any;
  searchResults: NominatimResponse[];
  validationErrors: any;

  results: NominatimResponse[];

  constructor(private nominatimService: NominatimService) {
  }



  ngOnInit() {
    this.initializeDefaultMapPoint();
    this.initializeMapOptions();
  }

  initializeMap(map: Map) {
    this.map = map;
    this.createMarker();
  }

  getAddress(result: NominatimResponse) {
    this.updateMapPoint(result.lat, result.lon, result.display_name);
    this.createMarker();
  }

  refreshSearchList(results: NominatimResponse[]) {
    this.results = results;
  }

  onMapClick(e: LeafletMouseEvent) {
    this.clearMap();
    this.updateMapPoint(e.latlng.lat, e.latlng.lng);
    this.createMarker();
  }

  private initializeMapOptions() {
    this.options = {
      zoom: 12,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'OSM' })
      ]
    }
  }

  private initializeDefaultMapPoint() {
    this.mapPoint = {
      name: 'Hello',
      latitude: DEFAULT_LATITUDE,
      longitude: DEFAULT_LONGITUDE
    };
  }

  private updateMapPoint(latitude: number, longitude: number, name?: string) {
    this.mapPoint = {
      latitude: latitude,
      longitude: longitude,
      name: name ? name : this.mapPoint.name
    };
  }

  private createMarker() {
    this.clearMap();
    const mapIcon = this.getDefaultIcon();
    const coordinates = latLng([this.mapPoint.latitude, this.mapPoint.longitude]);
    this.lastLayer = marker(coordinates).setIcon(mapIcon).addTo(this.map);
    this.map.setView(coordinates, this.map.getZoom());
  }

  private getDefaultIcon() {
    return icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png'
    });
  }

  private clearMap() {
    if (this.map.hasLayer(this.lastLayer)) this.map.removeLayer(this.lastLayer);
  }

  addressLookup(address: string) {
    if (address.length > 3) {
      this.nominatimService.addressLookup(address).subscribe((results: NominatimResponse) => {
        this.searchResults = [{
          lat: results[0].lat,
          lon: results[0].lon,
          display_name: results[0].display_name
        }]
        console.log(this.searchResults[0]);
        
      });
    } else {
      this.searchResults = [];
    }


    // this.validationErrors = this.searchResults[0];
  }

}
