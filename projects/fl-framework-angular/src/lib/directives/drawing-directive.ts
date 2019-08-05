import { Directive, OnDestroy, AfterViewInit, ElementRef, Input } from '@angular/core';
import { isEmpty } from '../utils/fi-utils';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[drawing]'
})
export class DrawingDirective implements OnDestroy, AfterViewInit {
  private lastPt: { x: number, y: number } = null;
  private ctx: CanvasRenderingContext2D = null;

  @Input() lineWidth: number;

  constructor(private el: ElementRef) {
    if (this.canvas) {
      this.canvas.style.touchAction = 'none';
    } else {
      console.log('[warning] drawing is not a canvas tag');
    }
  }

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.initCanvas(this.canvas);
    }
  }

  ngOnDestroy(): void {
    this.endPointer({});
  }

  private draw = (e: any) => {
    const x = e.offsetX;
    const y = e.offsetY;

    if (this.ctx && this.lastPt != null) {
      this.ctx.beginPath();
      this.ctx.lineWidth = this.lineWidth ? this.lineWidth : 1;
      this.ctx.moveTo(this.lastPt.x, this.lastPt.y);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
    this.lastPt = { x, y };
  }

  private endPointer = (e: any) => {
    if (this.canvas) {
      this.canvas.removeEventListener('pointermove', this.draw, false);
      this.canvas.removeEventListener('mousemove', this.draw, false);
      this.lastPt = null;
    }
  }

  private initCanvas(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
    if (!isEmpty(canvas.style.width) && parseInt(canvas.style.width, 10) !== canvas.width) {
      canvas.width = parseInt(canvas.style.width, 10);
    }
    if (!isEmpty(canvas.style.height) && parseInt(canvas.style.height, 10) !== canvas.height) {
      canvas.height = parseInt(canvas.style.height, 10);
    }
    if ((window as any).PointerEvent) {
      canvas.addEventListener('pointerdown', () => {
        canvas.addEventListener('pointermove', this.draw, false);
      }, false);
      canvas.addEventListener('pointerup', this.endPointer, false);
      canvas.addEventListener('pointerleave', this.endPointer, false);
    } else {
      canvas.addEventListener('mousedown', () => {
        canvas.addEventListener('mousemove', this.draw, false);
      }, false);
      canvas.addEventListener('mouseup', this.endPointer, false);
      canvas.addEventListener('mouseleave', this.endPointer, false);
    }
  }

  private get canvas(): HTMLCanvasElement {
    if (this.el.nativeElement instanceof HTMLCanvasElement) {
      return (this.el.nativeElement as HTMLCanvasElement);
    }
    return null;
  }

  // private getOffset(element:HTMLElement):{x:number,y:number} {
  //     let y = element.offsetTop;
  //     let x = element.offsetLeft;
  //     return {x:x,y:y};
  // }
}
