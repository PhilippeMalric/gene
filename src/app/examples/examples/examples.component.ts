import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { routeAnimations, selectAuth } from '@app/core';
import { State as BaseSettingsState } from '@app/settings';

import { Node, Link } from '../../d3';
import { myData } from '../../data/data';

import { cnpToScian } from '../../data/cnpScian/cnpToScian'
import { cnp } from '../../data/cnpScian/cnp'
import { scian } from '../../data/cnpScian/scianCode'


import { State as BaseExamplesState } from '../examples.state';
import { Router } from '@angular/router';
import { DataService } from '../gears/data.service';

interface State extends BaseSettingsState, BaseExamplesState {}

@Component({
  selector: 'anms-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;


  cnpToScian = cnpToScian
  cnp = cnp
  scian = scian

  nodes: Node[] = myData.nodes
  links: Link[] = myData.links
  examples = [
    { link: 'gene', label: 'gene' },
    { link: 'rna', label: 'rna' },

  ];
/*
  examples = [{ link: 'crud2', label: 'anms.examples.menu.crud2' }];
*/
  constructor(private store: Store<State>, private router: Router,private dataS:DataService) {


    this.dataS.nodes = this.nodes;
    this.dataS.links = this.links;

    this.dataS.cnp = this.cnp.slice(25);
    this.dataS.scian = this.scian;
    this.dataS.cnpToScian = this.cnpToScian;

  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(
      select(selectAuth),
      map(auth => auth.isAuthenticated)
    );
    //this.router.navigate(['examples/crud2']);
  }
}
