import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-array-express-exp',
  templateUrl: './array-express-exp.component.html',
  styleUrls: ['./array-express-exp.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrayExpressExpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  click(){

    console.log("click")

  }


}
