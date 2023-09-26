import { HttpClient } from '@angular/common/http';

import { Endpoints } from '@core/models/api';
import { endpoints } from '@core/constants/api';

export abstract class BaseApiService {
  private readonly URL_PATH = 'http://localhost:3000';

  constructor(protected http: HttpClient) {}

  protected buildUrl(endpointSelector: (e: Endpoints) => string): string {
    return `${this.URL_PATH}/${endpointSelector(endpoints)}`;
  }
}
