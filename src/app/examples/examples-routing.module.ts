import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/core';

import { ExamplesComponent } from './examples/examples.component';
import { ParentComponent } from './theming/parent/parent.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { TodosContainerComponent } from './todos/components/todos-container.component';
import { StockMarketContainerComponent } from './stock-market/components/stock-market-container.component';
import { CrudComponent } from './crud/components/crud.component';
import { CrudComponent2 } from './crud2/components/crud.component2';
import { FormComponent } from './form/components/form.component';
import { NotificationsComponent } from './notifications/components/notifications.component';
import { BilleFilComponent } from './bille-fil/bille-fil.component';
import { CnpScianComponent } from './cnp-scian/cnp-scian.component';
import { ScianJobsComponent } from './scian-jobs/scian-jobs.component';
import { VotesComponent } from './votes/votes.component';
import { GeneComponent } from './gene/gene.component';
import { GeneDetailsComponent } from './gene-details/gene-details.component';
import { RnaComponent } from './rna/rna.component';
import { ArrayExpressExpComponent } from './array-express-exp/array-express-exp.component';


const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: '',
        redirectTo: 'gene',
        pathMatch: 'full'
      },
      {
        path: 'gene',
        component: GeneComponent,
        data: { title: 'gene' }
      },
      {
        path: 'rna',
        component: RnaComponent,
        data: { title: 'rna' }
      },
      {
        path: 'arrayEpress',
        component: ArrayExpressExpComponent,
        data: { title: 'rnarrayEpressa' }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class ExamplesRoutingModule {}
