import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NominatimService } from '../services/nominatim-service';
import { NominatimResponse } from '../shared/models/nominatim-response.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {
  searchResults: NominatimResponse[];
  results: NominatimResponse[];
  reverseGeocodeForm: FormGroup;

  constructor(private nominatimService: NominatimService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.reverseGeocodeForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        longitude: ['', Validators.required],
        latitude: ['', Validators.required],
      }
    );
  }

  addressLookup() {
    const address = `${this.reverseGeocodeForm.value.longitude},${this.reverseGeocodeForm.value.latitude}`;
    if (address.length > 3) {
      this.nominatimService.addressLookup(address).subscribe((results: NominatimResponse) => {
        this.searchResults = [{
          lat: results[0].lat,
          lon: results[0].lon,
          display_name: results[0].display_name
        }];
      });
    } else {
      this.searchResults = [];
    }
  }

}
