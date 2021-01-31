import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontSizeDirective } from './directives/font-size.directive';
import { HighlightDirective } from './directives/highlight.directive';
import {
  GeneratedString,
  GeneratorFactory,
  GeneratorService,
  LocalStorageService,
  STORAGE
} from './services';
import { SharedComponent } from './shared.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SharedComponent, HighlightDirective, FontSizeDirective],
  exports: [HighlightDirective, FontSizeDirective],
  providers: [
    {
      provide: GeneratedString,
      useFactory: GeneratorFactory(10),
      deps: [GeneratorService],
    },
    { provide: STORAGE, useClass: LocalStorageService },
  ],
})
export class SharedModule {}
