import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Stock } from './stock-market.model';

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

@Injectable()
export class FetchService {


  constructor(private httpClient: HttpClient) {}

  retrieveURL(url: string): Observable<any> {
    return this.httpClient
      .get(PROXY_URL + url)
      .pipe(
        tap(data=>{
        console.log("data");
        console.log(data)
      }
      ))
  }

  retrieveNews(symbol: string): Observable<any> {
    let url = encodeURIComponent(symbol)
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    return this.httpClient
      .get(PROXY_URL + `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${url}`,{headers})
      .pipe(
        tap((data:any)=>{
          console.log("data")
          console.log(data)
          console.log("data.query.pages")
          console.log(data.query.pages)

          console.log(" ob.query.pages[Object.keys(ob.query.pages)[0]]")
          console.log( data.query.pages[Object.keys(data.query.pages)[0]])

          console.log(" ob.query.pages[Object.keys(ob.query.pages)[0]].extract")
          console.log( data.query.pages[Object.keys(data.query.pages)[0]].extract)
//https://en.wikipedia.org/api/rest_v1/page/summary/Stack_Overflow

        }),
        map((ob:any)=>{


          return ob.query.pages[Object.keys(ob.query.pages)[0]].extract

        })
      );
  }


  retrieveWiki(symbol: string): Observable<any> {
    let url = encodeURIComponent(symbol)
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    return this.httpClient
      .get(PROXY_URL + `https://en.wikipedia.org/api/rest_v1/page/summary/${url}`,{headers})
      .pipe(
        tap((data:any)=>{
          console.log("data")
          console.log(data)
        })
      );
  }

  retrievePubmed(): Observable<any> {
    return this.httpClient
      .get(PROXY_URL + `http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=gene&retmode=json&retmax=2&term=9606&field=Taxonomy%20ID`).pipe()

  }


  retrievePubmed2(pubmedId:string): Observable<any> {
    return this.httpClient
      .get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=gene&id=${pubmedId}`,{responseType: 'text'})

  }



}
