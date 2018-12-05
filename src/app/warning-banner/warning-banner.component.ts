import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cb-warning-banner',
  templateUrl: './warning-banner.component.html',
  styleUrls: ['./warning-banner.component.css']
})
export class WarningBannerComponent implements OnInit {
  @Input('message') message: string;

  constructor() { }

  ngOnInit() {
  }

}
