import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'anms-gears',
  templateUrl: './gears.component.html',
  styleUrls: ['./gears.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GearsComponent implements OnInit {

  constructor(private dataS:DataService) { }

  ngOnInit() {
  }

}
