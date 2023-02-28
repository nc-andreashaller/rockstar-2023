import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

const { apis: { structure: endpointPattern } } = environment;

@Injectable({
  providedIn: 'root'
})
export class StructureService {

  constructor(private http: HttpClient) { }

  async get(path: string): Promise<any> {
    const endpoint = endpointPattern.replace('{path}', path);
    console.log('requesting structure', endpoint);
    return await lastValueFrom(this.http.get<any>(endpoint));
  }
}
