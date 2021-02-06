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

  // Это не правильный подход регистрировать сервисы в модуле,
  // который экспортирует директивы или компоненты или пайпы.
  // Дело в том, что этот модуль должен подключаться к модулям,
  // в компонентах которых используются директивы текущего модуля
  // Но в то же время будут подключаться модули. Для обычных модулей это нормально,
  // но если у вас будут лейзи модули, то может быть ситуация, когда каждый лейзи модуль
  // получит свой экземпляр сервиса.
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
