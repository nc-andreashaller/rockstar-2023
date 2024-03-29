import { Component, Input, SimpleChanges, ElementRef, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeaserListService } from '../teaser-list.service';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-teaser-list',
  templateUrl: './teaser-list.component.html',
  styleUrls: ['./teaser-list.component.scss']
})
export class TeaserListComponent implements OnInit, OnChanges {

  static type = 'rockstar-2023/components/teaser-list';

  @Input() reference: string | undefined;
  @Input() columnSpan: number = 0;
  list: Array<any> = [];

  constructor(private host:ElementRef, 
    private teaserListService: TeaserListService,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.load();
    this.setColumnSpan();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['reference']) {
      this.load();
    }
    if(changes['columnSpan']) {
      this.setColumnSpan();
    }
  }

  private async load() : Promise<void> {
    this.loadingService.start();
    if(this.reference) {
      this.list = await this.teaserListService.get(this.reference);
    }
    this.loadingService.finish();
  }

  private setColumnSpan(): void {
    this.host.nativeElement.style.setProperty('--rockstar-grid-columnspan', this.columnSpan);
  }

}
