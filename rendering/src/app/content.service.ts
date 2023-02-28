import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const { apis: { content: endpointPattern } } = environment;

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  async get(url: string): Promise<string> {
    const endpoint = endpointPattern.replace('{path}', new URL(url).pathname);
    console.log('requesting content', endpoint);
    return await lastValueFrom(this.http.get(endpoint, {responseType: 'text'}));
  }
}
