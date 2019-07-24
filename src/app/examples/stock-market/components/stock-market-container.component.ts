import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take, tap, concatMap, mergeAll } from 'rxjs/operators';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import { selectStockMarket } from '../stock-market.selectors';
import { ActionStockMarketRetrieve } from '../stock-market.actions';
import { StockMarketState } from '../stock-market.model';
import { State } from '../../examples.state';
import { FetchService } from '../fetch.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'anms-stock-market',
  templateUrl: './stock-market-container.component.html',
  styleUrls: ['./stock-market-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockMarketContainerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  stocks$: Observable<StockMarketState>;
  form = this.fb.group({
    username: ['', [Validators.required]]
  });

  pubmedId:string

  humanGeneIDs:string[]
  constructor(public store: Store<State>,private fetchService:FetchService, private fb: FormBuilder,) {}

  ngOnInit() {
    this.stocks$ = this.store.pipe(select(selectStockMarket));
    this.stocks$
      .pipe(take(1))
      .subscribe(stocks => this.onSymbolChange(stocks.symbol));
  }

  onSymbolChange(symbol: string) {
    this.store.dispatch(new ActionStockMarketRetrieve({ symbol }));
  }

  save(){
    console.log(this.form.value.username)
    this.fetchService.retrieveURL(this.form.value.username).subscribe()
  }


  retrieveNews(){
    this.fetchService.retrieveNews(this.form.value.username).subscribe()
  }

  retrieveWiki(){
    this.fetchService.retrieveWiki(this.form.value.username).subscribe()
  }


  retrievePubmed(){
    this.fetchService.retrievePubmed().pipe(
      tap((stock: any) => {
               console.log(stock)
               this.pubmedId = stock.esearchresult.idlist[0]
               this.humanGeneIDs = stock.esearchresult.idlist
               console.log(this.pubmedId)
      })
    ).subscribe();
  }
  retrievePubmed2(){

    of(this.humanGeneIDs).pipe(

    concatMap((ids)=>ids.map((id)=>this.fetchService.retrievePubmed2(id))),
    mergeAll(),
    tap(console.log)

    ).subscribe()
    /*
        this.fetchService.retrievePubmed2(this.pubmedId)
        .pipe(
          tap((stock: any) => {
                  console.log(stock)

          })
        ).subscribe(console.log);
        */
      }

}
