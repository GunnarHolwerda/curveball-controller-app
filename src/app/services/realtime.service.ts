import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
  private path = 'http://localhost:3001';
  constructor() { }
}
