import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { Cluster } from '@app/models';
import { MatDialog } from '@angular/material/dialog';
import { AddClusterComponent } from '@app/components/add-cluster/add-cluster.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  styleUrls: ['./clusters.component.scss']
})
export class ClustersComponent implements OnInit {
  clusters: Cluster[] = [];
  displayedColumns: string[] = ['name'];

  constructor(public dialog: MatDialog, private dataService: DataService) {
  }

  ngOnInit(): void {
    // this.dataService.getClusters().subscribe(val => this.clusters = val);
    const asd = new Cluster();
    asd.name = 'asd';
    this.clusters.push(asd);
    this.clusters.push(asd);
    this.clusters.push(asd);

  }


  onAddClick(): void {
    const dialog = this.dialog.open<AddClusterComponent, null, Cluster>(AddClusterComponent);

    dialog.afterClosed().pipe(first()).subscribe(val => console.log(val));
  }
}
