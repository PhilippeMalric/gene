import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobByScianService } from '@app/examples/job-by-scian.service';
import { DataService } from '@app/examples/gears/data.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'anms-scian-jobs',
  templateUrl: './scian-jobs.component.html',
  styleUrls: ['./scian-jobs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScianJobsComponent implements OnInit {
  sub: any;
  id: any;
  cnp: any = []

  cnpD = {}
  scianCodeToDesc: any = {}
  scianTab: string[] = [];

  compagnies:any = []

  dataSource = null;
  displayedColumns = ['card'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  scianCourant: string;

  waiting = true
  descCourant: any;

  scianList = [];
  disableRetour: boolean;
  indexScianCourant: number = 0;

  constructor(private route:ActivatedRoute,private jobByScianService:JobByScianService,private dataS:DataService,private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.cnp = this.dataS.cnp.filter((e)=>(""+e[0]).length > 3).map(e=>{
      this.cnpD[e[0]] = {}
      this.cnpD[e[0]].id = ""+e[0]
      this.cnpD[e[0]].selected = false;
      this.cnpD[e[0]].desc = e[1]
      return this.cnpD[e[0]]
    })

    for (let e of this.dataS.scian){
      this.scianCodeToDesc[""+e[0]] = e[1]
    }

    this.sub = this.route.params.subscribe(params => {
    this.id = params['id'];
    this.jobByScianService.onclick(this.id).subscribe(

      (data:any)=>{

        if(data){
          this.ref.detectChanges();
          this.scianCourant = this.scianTab[0];
          this.scianList.push(this.scianTab[0])
          this.descCourant = this.scianCodeToDesc[this.scianTab[0]];
          this.waiting = false
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.compagnies = data
          console.log(data)

          this.indexScianCourant = 0
        }
        else{
          this.scianTab = this.startsWithScian(this.id).slice(1);
          this.helper()
        }
      }
    )
  })
}

next(){
  this.scianTab = this.scianTab.slice(1)
  this.helper()
}

retour(){
    this.indexScianCourant -= 1
    this.scianCourant = this.scianList[this.indexScianCourant]
    this.jobByScianService.onclick(this.scianCourant).subscribe(
      (data:any)=>{
        if(data){
          this.descCourant = this.scianCodeToDesc[this.scianCourant]
          this.waiting = false
          this.ref.detectChanges();
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.compagnies = data
          console.log(this.compagnies)
  }})

}

top(){
  let top = document.getElementById('top2');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
}

helper(){
this.indexScianCourant = this.scianList.indexOf(this.scianCourant)

// si l'indice courant n'est pas le dernier (il y a eu un reotur)
if(this.scianList.length > 0 && this.indexScianCourant != (this.scianList.length -1)){
  this.indexScianCourant += 1
  this.scianCourant = this.scianList[this.indexScianCourant]
  this.jobByScianService.onclick(this.scianCourant).subscribe(
    (data:any)=>{
      if(data){
        this.descCourant = this.scianCodeToDesc[this.scianCourant]
        this.waiting = false
        this.ref.detectChanges();
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.compagnies = data
        console.log(this.compagnies)
        this.disableRetour = false;
  }})
}
else{
  if(this.scianTab.length > 0){
    this.jobByScianService.onclick(this.scianTab[0]).subscribe(
      (data:any)=>{
        if(data){
          this.scianCourant = this.scianTab[0]
          this.scianList.push(this.scianTab[0])
          this.indexScianCourant = this.scianList.length -1
          this.descCourant = this.scianCodeToDesc[this.scianTab[0]]
          this.waiting = false
          this.ref.detectChanges();
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.compagnies = data
          console.log(this.compagnies)
          this.disableRetour = false;
        }
        else{
          this.scianTab = this.scianTab.slice(1)
          this.helper()
        }
      }
    )
  }
  else{
    console.log("noJobs")
  }
}

}


startsWithScian(scian){
  return Object.keys(this.scianCodeToDesc).filter((code)=>code.startsWith(scian))
}

}
