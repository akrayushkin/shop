import {
  Directive,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor() {}

  @HostBinding('style.backgroundColor') backgroundColor = 'inherit';

  @HostListener('mouseenter') onMouseEnter(): void {
    this.backgroundColor = '#f5f5f6';
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.backgroundColor = 'inherit';
  }
}
