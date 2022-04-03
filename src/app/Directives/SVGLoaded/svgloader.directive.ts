import { Directive, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[appSvgloader]'
})
export class SvgloaderDirective {

  @Input() isLast!: boolean;

  @Output('ngInit') initEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    if (this.isLast) {
      setTimeout(() => this.initEvent.emit(), 10);
    }
  }
}
