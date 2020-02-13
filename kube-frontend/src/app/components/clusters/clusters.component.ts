import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { Cluster } from '@app/models';

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  styleUrls: ['./clusters.component.scss']
})
export class ClustersComponent implements OnInit {
  clusters: Cluster[];
  displayedColumns: string[] = ['name'];

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    // this.dataService.getClusters().subscribe(val => this.clusters = val);
    const asd = new Cluster();
    asd.name = 'asd';
    this.clusters.push(asd);
  }

}
