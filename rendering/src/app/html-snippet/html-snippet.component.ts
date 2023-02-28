import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-html-snippet',
  templateUrl: './html-snippet.component.html',
  styleUrls: ['./html-snippet.component.scss']
})
export class HtmlSnippetComponent implements OnInit, OnChanges {

  @Input() reference: string | undefined;
  markup: string = '';

  constructor(private contentService: ContentService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['reference'] && this.reference) {
      this.load();
    }
  }

  ngOnInit(): void {
    this.load();
  }

  private async load(): Promise<void> {
    if(this.reference != null) {
      this.markup = await this.contentService.get(this.reference);
    }
  }


}
