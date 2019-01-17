import { ElementRef, OnDestroy, AfterViewInit, Directive, Input, Output, EventEmitter } from '@angular/core';

@Directive({
    selector:'[parentClick]'
})
export class ParentClickDirective implements OnDestroy, AfterViewInit {

    @Output()
    parentClick:EventEmitter<{}> = new EventEmitter();

    private clickFunc:any = ($envent):void => {
        this.parentClick.emit($envent);
    };
    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        if (this.el && this.el.nativeElement.parentElement) {
            this.el.nativeElement.parentElement.addEventListener('click',this.clickFunc);
        }
    }
    ngOnDestroy(): void {
        if (this.el && this.el.nativeElement.parentElement) {
            this.el.nativeElement.parentElement.removeEventListener('click',this.clickFunc);
        }
    }
}
