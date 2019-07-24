import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges } from '@angular/core';
import { GeneService } from '../gene.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Gene } from '../gene/gene';

@Component({
  selector: 'anms-gene-details',
  templateUrl: './gene-details.component.html',
  styleUrls: ['./gene-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneDetailsComponent implements OnInit {

  @Input() gene: Gene;
  wordArray: any[];

  constructor(private geneService:GeneService,private route:ActivatedRoute) {



  }

  ngOnInit() {
    this.wordArray = this.gene.wordArray;

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.wordArray = this.gene.wordArray;
  }

}
