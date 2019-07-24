import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GeneService } from '../gene.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Gene } from './gene';
import { Observable } from 'rxjs';

@Component({
  selector: 'anms-gene',
  templateUrl: './gene.component.html',
  styleUrls: ['./gene.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneComponent implements OnInit {
  humanGeneIDs: any[];
  nSearch: number;
  geneDict:Object;
  gene: Gene;

  constructor(private geneService:GeneService, private changeDetectionRef:ChangeDetectorRef, private router: Router) { }

  ngOnInit() {

    this.retrieveGene()

  }
  retrieveGene(){
    this.humanGeneIDs = [] ;
    this.nSearch = 0 ;
    let interval1 = setInterval(()=>{

      this.geneService.retrieveGeneId(""+this.nSearch).pipe(
        tap((stock: any) => {
                 console.log(stock)
                 this.humanGeneIDs = this.humanGeneIDs.concat(stock.esearchresult.idlist)
                 this.changeDetectionRef.markForCheck()
        })
      ).subscribe();
      this.nSearch += 10

      if(this.nSearch >= 200){
        clearInterval(interval1);
      }
    },1000)
  }



retrieveGeneDetails(id){
    this.geneService.retrieveGeneDetails(id).pipe(

      tap((text:string)=>{
        if(!text.startsWith("<error>")){
          console.log("Genes!")
          var pattId = new RegExp("geneid (.*),")
          var pattType = new RegExp("type (.*),")
          var pattDesc = new RegExp("desc (.*),")

          //need to be parsed
          var summaryBeginRE = new RegExp('summary "([^]*)')
          let summaryNotTrim = summaryBeginRE.exec(text)[1]
          let quoteIndex = summaryNotTrim.indexOf('"')
          let summary = summaryNotTrim.substr(0,quoteIndex)
          let id = pattId.exec(text)[1]
          console.log(id)
          let type = pattType.exec(text)[1]
          let desc = pattDesc.exec(text)[1]


          let g = new Gene(id,type,desc,summary)
          g.printToConsole()
          this.gene = g
        }
        else{
          console.log("error")
        }
        this.changeDetectionRef.markForCheck()
      })
    ).subscribe()
}



}
