import { DatePipe } from '@angular/common';
import { FlServiceInjector } from '../core/fl-service-injector';
import { IReturnDto } from '../http/fl-http-request.service';

export function endsWithCharAppend(src: string, char: string) {
  if (src === undefined || src == null) { return ''; }
  if (src.endsWith(char)) {
    return src;
  }
  return src + char;
}

export function isEmpty(value: any): boolean {
  return (value == null || value === undefined || value === '');
}

export function isSuccess(value: IReturnDto): boolean {
  return (value && value.result && value.result.success);
}

export function clearCanvas(element: HTMLCanvasElement): void {
  if (element) {
    element.getContext('2d').clearRect(0, 0, element.width, element.height);
  }
}

export function dateToString(date: Date, format: string): string {
  const datePipe: DatePipe = FlServiceInjector.injector.get(DatePipe);
  return datePipe.transform(date, format);
}

export function getPropertyNames(instance): Array<string> {
  return Object.getOwnPropertyNames(instance);
}
