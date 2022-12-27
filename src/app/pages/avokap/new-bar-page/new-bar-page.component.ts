import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NbThemeService} from '@nebular/theme';

@Component({
  selector: 'ngx-new-bar-page',
  templateUrl: './new-bar-page.component.html',
  styleUrls: ['./new-bar-page.component.scss'],
})
export class NewBarPageComponent implements OnInit {

  @Input() pageIndex: number;
  @Input() numberOfPages: number;
  @Output() newChangePage = new EventEmitter();
  @Output() changePageByNumber = new  EventEmitter();
  @Output() loadNewBatch = new EventEmitter();
  theme: string;
  pageNumber: number = 0 ;

  constructor(private themeService: NbThemeService) {
  }

  ngOnInit(): void {
    this.themeService.getJsTheme().subscribe( theme => this.theme = theme.name );
  }

  plage(): number {
    return (3 * Math.trunc((this.pageIndex - 1) / 3))   ;
  }

  changePagesByNumber(pageIndex: number): void {
    this.changePageByNumber.emit(pageIndex);

  }

  changePages(type: string): void {
    this.newChangePage.emit(type);
  }

  loadNewData(): void {
    this.loadNewBatch.emit();
  }

}
