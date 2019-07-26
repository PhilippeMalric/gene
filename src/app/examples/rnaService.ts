import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';


const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';


@Injectable({
  providedIn: 'root'
})
export class RnaService {

  nextURL = ""

  constructor(private httpClient: HttpClient) { }
  retrieveRNA(): Observable<any> {
    if(this.nextURL == ""){
      return this.httpClient
        .get(PROXY_URL + `https://rnacentral.org/api/v1/rna/?min_length=50&max_length=100&format=json`).pipe(
          tap(query=>{
            this.nextURL = query.next
          }))
    }
    else{
      return this.httpClient
      .get(PROXY_URL + this.nextURL).pipe(
        tap(query=>{
          this.nextURL = query.next
      }))
    }
  }
}
