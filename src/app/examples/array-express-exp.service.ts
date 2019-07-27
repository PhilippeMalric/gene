import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import {saveAs as importedSaveAs} from "file-saver";

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';


@Injectable({
  providedIn: 'root'
})
export class ArrayExpressExpService {

  fileName="data.json"

  constructor(private httpClient: HttpClient) { }

  getExperiment(): Observable<any> {

    console.log("clickService")

    return this.httpClient
      .get(PROXY_URL + `https://www.ebi.ac.uk/arrayexpress/json/v3/experiments?exptype="RNA-seq of coding RNA"`).pipe(
        tap((data)=>{
          console.log("serviceWork")
          console.log(data)
          importedSaveAs(JSON.stringify(data) , this.fileName);
        })
      )

  }

  getExperiment2(): Observable<any> {
    return this.httpClient
      .get(`assets/files/nCondantSingleCell.json`).pipe(
        map((data:any) => {

          return data.experiments.experiment 
        }
      )
    )

  }

  getData(arg:string): Observable<any> {
    console.log(`https://www.ebi.ac.uk/arrayexpress/files/${arg}`)
    return this.httpClient
      .get(PROXY_URL + `https://www.ebi.ac.uk/arrayexpress/files/${arg}`,{responseType: 'text'}).pipe()

  }

  getDataSdrf(arg:string): Observable<any> {
    console.log(`https://www.ebi.ac.uk/arrayexpress/files/${arg}/${arg}.sdrf.txt`)
    return this.httpClient
      .get(PROXY_URL + `https://www.ebi.ac.uk/arrayexpress/files/${arg}/${arg}.sdrf.txt`,{responseType: 'text'}).pipe()

  }
  getData2(): Observable<any> {
    return this.httpClient
      .get(PROXY_URL + `https://www.ebi.ac.uk/arrayexpress/files/E-MTAB-6902/matrix_PBS.mtx`,{responseType: 'text'}).pipe()

  }

  getDataIdf(arg:string): Observable<any> {
    console.log(`https://www.ebi.ac.uk/arrayexpress/files/${arg}/${arg}.idf.txt`)
    return this.httpClient
      .get(PROXY_URL + `https://www.ebi.ac.uk/arrayexpress/files/${arg}/${arg}.idf.txt`,{responseType: 'text'}).pipe()

  }

}
