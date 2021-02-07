import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontSizeDirective } from './directives/font-size.directive';
import { HighlightDirective } from './directives/highlight.directive';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SharedComponent } from './shared.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SharedComponent, HighlightDirective, FontSizeDirective, OrderByPipe],
  exports: [HighlightDirective, FontSizeDirective, OrderByPipe, CommonModule, FormsModule]
})
export class SharedModule {}
