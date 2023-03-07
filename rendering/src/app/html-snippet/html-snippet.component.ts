import { Directionality } from '@angular/cdk/bidi';
import { Component, Input, OnChanges, SimpleChanges, OnInit, ElementRef } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-html-snippet',
  templateUrl: './html-snippet.component.html',
  styleUrls: ['./html-snippet.component.scss']
})
export class HtmlSnippetComponent implements OnInit, OnChanges {

  static type = 'rockstar-2023/components/content';

  @Input() reference: string | undefined;
  @Input() columnSpan: number = 0;
  markup: string = '';

  constructor(private host:ElementRef, private contentService: ContentService) { }

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
    if(this.reference) {
      this.markup = await this.contentService.get(this.reference);
    }
  }

  private setColumnSpan(): void {
    this.host.nativeElement.style.setProperty('--rockstar-grid-columnspan', this.columnSpan);
  }
}
