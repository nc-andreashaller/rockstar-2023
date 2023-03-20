import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private stack: number = 0

  start(): void {
    if(this.stack === 0) {
      document.body.classList.add('rockstar-loading');
    }
    this.stack++;
  }
  
  finish() {
    this.stack--;
    if(this.stack === 0) {
      document.body.classList.remove('rockstar-loading');
    }
  }
}






