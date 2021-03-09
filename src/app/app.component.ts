import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

import { AppSettingsService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('appTitle', { static: false }) appTitle: ElementRef;

  title = 'Amazing store';
  constructor(
    private renderer: Renderer2,
    private appSettingsService: AppSettingsService
  ) {}

  ngOnInit(): void {
    if (this.appSettingsService.appConfig.darkTheme) {
      this.renderer.addClass(document.body, 'dark-theme');
    }
  }

  ngAfterViewInit(): void {
    this.appTitle.nativeElement.textContent = this.title;
  }
}
