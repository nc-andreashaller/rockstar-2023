import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { StructureService } from './structure.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  ssr: boolean;
  structure: any;
  reference: string | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject('SSR_PATH') private ssrUrl: string,
    private router: Router,
    private structureService:  StructureService) {
      this.ssr = isPlatformServer(this.platformId);
    }

  ngOnInit(): void {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => this.loadStructure());
  }
  


  private async loadStructure() {
    const path = this.ssr 
      ? this.ssrUrl // execution in azure function
      : location.pathname.startsWith('/api/ssr') && new URLSearchParams(location.search).has('path')
      ? new URLSearchParams(location.search).get('path') || '' // rehydration execution
      : location.pathname; // normal csr execution
    if(path.startsWith('/content/')) {
      console.log('loading content document', path);
      this.structure = undefined;
      this.reference = path.substring(8);
    } else {
      console.log('loading structure', path);
      this.reference = undefined;
      this.structure = await this.structureService.get(path);
      console.log('loaded structure', this.structure);
    }
  }
}
