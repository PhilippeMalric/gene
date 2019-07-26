import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RnaService } from '../rnaService';
import { tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'anms-rna',
  templateUrl: './rna.component.html',
  styleUrls: ['./rna.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RnaComponent implements OnInit {

  rnaIDs:any = []
  url:any
  constructor(private rnaService:RnaService,private changeDetectionRef:ChangeDetectorRef,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
  //sudo ng serve

  this.url = this.sanitizer.bypassSecurityTrustResourceUrl("http://nibiru.tbi.univie.ac.at/forna/forna.html?id=url/name&sequence=AACGUUAGUU&structure=(((....)))");

  }
log(rna){

  console.log(rna)
  this.url = this.sanitizer.bypassSecurityTrustResourceUrl("http://nibiru.tbi.univie.ac.at/forna/forna.html?id=url/name&sequence="+rna);

}


getRNA(){
  this.rnaService.retrieveRNA().pipe(
    tap((query: any) => {
             console.log(query)
             console.log(query.results)
             this.rnaIDs = this.rnaIDs.concat(query.results)
             this.changeDetectionRef.markForCheck()
    })
  ).subscribe();
}
//{{rnaID.description}}
}
