import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { ArrayExpressExpService } from '../array-express-exp.service';
import { tap } from 'rxjs/operators';
import { DataService } from '../gears/data.service';


@Component({
  selector: 'anms-array-express-exp',
  templateUrl: './array-express-exp.component.html',
  styleUrls: ['./array-express-exp.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrayExpressExpComponent implements OnInit {

  experiments :any[] = []

  constructor(private arrayExpressExpService:ArrayExpressExpService, private dataS:DataService,
    private changeDetectionRef:ChangeDetectorRef) { }

  ngOnInit() {

  }

  click(){

    console.log("click")

    
    this.arrayExpressExpService.getExperiment2().pipe(
      tap((data)=>{
        console.log("data")
        console.log(data)
       this.experiments = data
        this.changeDetectionRef.markForCheck()
      })
    )
    .subscribe()

  }

  click2(acc){
    this.arrayExpressExpService.getData(acc).subscribe(
      (data2 =>{
        console.log("\n--data --\n"+data2)
        var parser = new DOMParser();
        var htmlDoc = parser.parseFromString(data2, 'text/html');
        var table = htmlDoc.getElementsByTagName('table');
        console.log("\n--table --\n"+table[0].innerText)
        let firtRow = table[0].getElementsByTagName('tr')[0]
        console.log("\n--tr --\n"+firtRow.innerText)
        let firstCell = firtRow.getElementsByTagName('td')[0]
        console.log("\n--td --\n"+firstCell.innerText)
        let secondCell = firtRow.getElementsByTagName('td')[1]
        console.log("\n--td --\n"+secondCell.innerText)
      /*
        let rows = table[0].textContent.split("\n")
        console.log("\n--row1 --\n"+rows[0])
        let size = rows[0][]
        */
      })
    )
    this.arrayExpressExpService.getDataSdrf(acc).subscribe(
      (data2 =>{
        console.log("\n----\n"+data2)
      })
    )
    this.arrayExpressExpService.getDataIdf(acc).pipe().subscribe(
      data=>
      {
        console.log("\n----\n"+data)
      }

    )

  }

  click3(){

    console.log("click")

    
    this.arrayExpressExpService.getData2().pipe().subscribe(
      data=>
      {
        console.log(data)
      }

    )
    
    
    }
}
