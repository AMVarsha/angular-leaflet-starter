import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NominatimResponse} from '../shared/models/nominatim-response.model';
import {BASE_NOMINATIM_URL, DEFAULT_VIEW_BOX} from '../app.constants';

@Injectable()
export class NominatimService {

  constructor (private http: HttpClient) {
  }

  addressLookup (req?: any): Observable<NominatimResponse> {
    let url = `https://${BASE_NOMINATIM_URL}/search?format=json&q=${req}&${DEFAULT_VIEW_BOX}&bounded=1`;
    return this.http.get<NominatimResponse>(url);
  }

}
