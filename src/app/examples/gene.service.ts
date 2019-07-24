import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';


@Injectable({
  providedIn: 'root'
})
export class GeneService {




  constructor(private httpClient: HttpClient) { }


  retrieveGeneId(retStart:string): Observable<any> {
    return this.httpClient
      .get(PROXY_URL + `http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=gene&retmode=json&retstart=${retStart}&retmax=10&term=9606&field=Taxonomy%20ID`).pipe()

  }


  retrieveGeneDetails(pubmedId:string): Observable<any> {
    return this.httpClient
      .get(PROXY_URL +`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=gene&id=${pubmedId}`,{responseType: 'text'})

  }


}
