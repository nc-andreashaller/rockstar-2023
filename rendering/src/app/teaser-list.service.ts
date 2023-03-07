import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const { apis: { teaserList: endpointPattern } } = environment;

@Injectable({
  providedIn: 'root'
})
export class TeaserListService {

  constructor(private http: HttpClient) { }

  async get(path: string): Promise<any> {
    const endpoint = endpointPattern.replace('{path}', path);
    console.log('requesting teaser list', endpoint);
    return await lastValueFrom(this.http.get(endpoint));
  }
}
