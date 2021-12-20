import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fitImageTag' })
export class FitImageTagPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return value.replaceAll('<img', '<img width="100%"');
  }
}
