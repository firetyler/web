import { Platform } from '@angular/cdk/platform';
import { NativeDateAdapter } from '@angular/material/core';

export class MonthpickerDateAdapter extends NativeDateAdapter {
  constructor(matDateLocale: string, platform: Platform) {
    super(matDateLocale, platform);
  }

  override parse(value: string): Date | null {
    const monthAndYearRegex = /(10|11|12|0\d|\d)\/[\d]{4}/;
    if (value?.match(monthAndYearRegex)) {
      const parts = value.split('/');
      const month = Number(parts[0]);
      const year = Number(parts[1]);
      if (month > 0 && month <= 12) {
        return new Date(year, month - 1);
      }
    }
    return null;
  }

  override format(date: Date, displayFormat: any): string {
    const month = date.getMonth() + 1;
    const monthAsString = ('0' + month).slice(-2);
    const year = date.getFullYear();
    return monthAsString + '/' + year;
  }
}
