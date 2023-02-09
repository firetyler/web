import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterSwitchService {
  selectedComponent : string = "";
  constructor() { }
}
