import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DataService } from '../gears/data.service';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'anms-cnp-scian',
  templateUrl: './cnp-scian.component.html',
  styleUrls: ['./cnp-scian.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CnpScianComponent {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  cnp=[]
  cnpD = {}
  scianCodeToDesc = {}
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = null;
  displayedColumns = ['card'];



  constructor(private dataS:DataService) {

    //console.log(this.dataS.cnp)

    this.cnp = this.dataS.cnp.map(e=>{
      this.cnpD[e[0]] = {}
      this.cnpD[e[0]].id = ""+e[0]
      this.cnpD[e[0]].selected = false;
      this.cnpD[e[0]].desc = e[1]
      return this.cnpD[e[0]]
    })

    //console.log(this.dataS.scian)

    for (let e of this.dataS.scian){
      this.scianCodeToDesc[""+e[0]] = e[1]
    }

    console.log("scianCodeToDesc")
    //console.log(this.scianCodeToDesc)

    //console.log(this.dataS.cnpToScian)



  }

  ngOnInit() {



    Object.keys(this.dataS.cnpToScian).map((e)=>{
      this.dataS.cnpToScian[e].scianTab = this.extractScian(this.dataS.cnpToScian[e])
    })



    //console.log(this.dataS.cnpToScian)

    console.log("cnpToScian")
    //console.log(this.dataS.cnp.filter((e)=>(""+e[1]).length > 3))

    let tabIndexNotInside = [];
// tslint:disable-next-line: forin
    for (let i in this.cnp)
      {
      let e = this.cnp[i]
      if((e.id) in this.dataS.cnpToScian){

        //.map((s:string)=>this.startsWithScian(s))
        e.scianDescTab = this.dataS.cnpToScian[e.id].scianTab.map((scian)=>{

          let desc = this.scianCodeToDesc[scian] + ' ('+scian+')'

          if(!desc){
            desc = ""+scian
          }
          return {desc:desc,scian:scian}
        })
      }
      else{
        console.log("Not in cnpToScin : "+e.id)
        tabIndexNotInside.push(i);
      }
    }

    for (let i of tabIndexNotInside){
      this.cnp.splice(i, 1);
    }

    console.log("cnp")
    console.log(this.cnp)

    this.dataSource = new MatTableDataSource(this.cnp);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data, filter) =>{
      console.log(data)
      console.log(filter)
      return data.desc.indexOf(filter) !== -1
    }


}



startsWithScian(scian){
  return Object.keys(this.scianCodeToDesc).filter((code)=>code.startsWith(scian))
}

select(e: any) {
  //console.log("click")
  //console.log(e)
  e.selected = !e.selected
}


 extractScian(scianTab:any){
  let tabTemp = []
  for(let e of scianTab){

    tabTemp = tabTemp.concat(this.parseScian(e))

  }


  return tabTemp;
 }

 parseScian(scianString:string){
  let scianTab = []

  if(scianString.indexOf("excluant") != -1){
    console.log("excluant")
  }
  else{

    let scianNumbers = scianString.substr("(SCIAN".length,scianString.length - "(SCIAN".length-1)
    return scianNumbers.split(",").map((s:string)=>{

      return s.trim()

    })
  }
 }

top(){
  let top = document.getElementById('top2');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue;
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


}
