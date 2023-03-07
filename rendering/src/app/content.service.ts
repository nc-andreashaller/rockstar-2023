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

  async get(urlOrPath: string): Promise<string> {
    const path = urlOrPath.startsWith('http')
      ? new URL(urlOrPath).pathname
      : urlOrPath;
    const endpoint = endpointPattern.replace('{path}', path);
    console.log('requesting content', endpoint);
    return await lastValueFrom(this.http.get(endpoint, {responseType: 'text'}));
  }
}
