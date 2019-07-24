import { Component, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy, OnInit, AfterViewInit } from '@angular/core';
import { D3Service, ForceDirectedGraph, Node, Link } from '../../d3';
import { DataService } from '@app/examples/gears/data.service';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { link } from 'fs';

@Component({
  selector: 'app-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'graph.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {
  nodes;
  links:Link[];
  graph: ForceDirectedGraph;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  public _options: { width, height } = { width: 400, height: 400 };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }


  constructor(private d3Service: D3Service, private ref: ChangeDetectorRef, private dataS:DataService) {}

  ngOnInit() {
    this.nodes = this.dataS.nodes;
    this.links = this.dataS.links;
    /** Receiving an initialized simulated graph from our custom d3 service */
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);

    /** Binding change detection check on each tick
     * This along with an onPush change detection strategy should enforce checking only when relevant!
     * This improves scripting computation duration in a couple of tests I've made, consistently.
     * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
     */
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
    //this.d3Service.createNodeLabels(this.nodes)

  }

  clickButton() {

    console.log(this.nodes)
    console.log(this.links)

    this.nodes = this.nodes.slice(0,this.nodes.length -1)
    this.links = this.links.slice(0,this.links.length -1)
    this.links[this.links.length-1].target = 0
    this.graph = this.d3Service.changeForceDirectedGraph(this.nodes, this.links);


    this.d3Service.click(this.nodes,this.links, this.options)
  }

  clickButton2() {

    console.log(this.nodes)
    console.log(this.links)

    let node : Node = new Node(this.nodes.length-1,"","")


    this.nodes.push(node)
    this.links.push(new Link(this.links.length -1,0,0))
    this.links[this.links.length-2].target = this.nodes[this.links.length-1]
    this.graph = this.d3Service.changeForceDirectedGraph(this.nodes, this.links);

    node.x = this.options.width / 2
    node.y = this.options.height / 2

    //this.d3Service.click(this.nodes,this.links, this.options)
  }

  get options() {
    return this._options = {
      width: window.innerWidth-50,
      height: window.innerHeight-200
    };
  }
}
