import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '@app/shared';
import { environment } from '@env/environment';

import { FEATURE_NAME, reducers } from './examples.state';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples/examples.component';
import { TodosContainerComponent } from './todos/components/todos-container.component';
import { TodosEffects } from './todos/todos.effects';
import { StockMarketContainerComponent } from './stock-market/components/stock-market-container.component';
import { StockMarketEffects } from './stock-market/stock-market.effects';
import { StockMarketService } from './stock-market/stock-market.service';
import { ParentComponent } from './theming/parent/parent.component';
import { ChildComponent } from './theming/child/child.component';
import { CrudComponent } from './crud/components/crud.component';
import { CrudComponent2 } from './crud2/components/crud.component2';
import { BooksEffects } from './crud/books.effects';
import { FormComponent } from './form/components/form.component';
import { FormEffects } from './form/form.effects';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { NotificationsComponent } from './notifications/components/notifications.component';
import { ExamplesEffects } from './examples.effects';
import { ParticipantsEffects } from './crud2/participants.effects';
import { PostEffects } from './crud2/post.effects';
import * as fromPost from './crud2/post.reducer';
import { FetchService } from './stock-market/fetch.service';
import { GraphComponent } from '@app/visuals/graph/graph.component';
import { SHARED_VISUALS } from '@app/visuals/shared';
import { D3_DIRECTIVES, D3Service } from '@app/d3';
import { BilleFilComponent } from './bille-fil/bille-fil.component';
import { GearsComponent } from './gears/gears.component';
import { CnpScianComponent } from './cnp-scian/cnp-scian.component';
import { ScianJobsComponent } from './scian-jobs/scian-jobs.component';
import { VotesComponent } from './votes/votes.component';
import { VoteReviewComponent } from './vote-review/vote-review.component';
import { GeneComponent } from './gene/gene.component';
import { GeneDetailsComponent } from './gene-details/gene-details.component';
import { GeneService } from './gene.service';

@NgModule({
  imports: [
    SharedModule,
    ExamplesRoutingModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    EffectsModule.forFeature([
      ExamplesEffects,
      TodosEffects,
      StockMarketEffects,
      BooksEffects,
      FormEffects,
      ParticipantsEffects,
      PostEffects
    ])
  ],
  declarations: [

    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    GeneDetailsComponent,
    GeneComponent,
    ExamplesComponent,
    TodosContainerComponent,
    StockMarketContainerComponent,
    ParentComponent,
    ChildComponent,
    AuthenticatedComponent,
    CrudComponent,
    CrudComponent2,
    FormComponent,
    NotificationsComponent,
    GraphComponent,
    BilleFilComponent,
    GearsComponent,
    CnpScianComponent,
    ScianJobsComponent,
    VotesComponent,
    VoteReviewComponent
  ],
  providers: [StockMarketService,FetchService,D3Service,GeneService]
})
export class ExamplesModule {
  constructor() {}
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/examples/`,
    '.json'
  );
}
