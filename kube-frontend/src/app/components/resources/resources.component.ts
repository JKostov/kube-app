import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cluster, Resource } from '@app/models';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '@app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AddResourceComponent } from '@app/components/add-resource/add-resource.component';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit, OnDestroy {
  cluster: Cluster;
  resources: Resource[] = [];
  displayedColumns: string[] = ['name', 'ipAddress', 'cpus', 'memory', 'storageMemory', 'actions'];
  destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private dataService: DataService) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.dataService.getClusterById(params.clusterId).pipe(first()).subscribe(val => this.cluster = val);
      this.dataService.getResources(params.clusterId).pipe(first()).subscribe(val => this.resources = val);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  onAddClick(): void {
    const dialog = this.dialog.open<AddResourceComponent, null, Resource>(AddResourceComponent, {
      minWidth: '400px',
    });

    dialog.afterClosed().pipe(first()).subscribe(val => {
      val.clusterId = this.cluster._id;
      this.dataService.createResource(val).pipe(first()).subscribe(newResource => this.resources = [...this.resources, newResource]);
    });
  }

  onDeleteClick(resource: Resource): void {
    this.dataService.deleteResource(resource._id).pipe(first()).subscribe(
      deletedResource => this.resources = this.resources.filter(r => r._id !== deletedResource._id)
    );
  }

  getSum(property: keyof Resource): number {
    return this.resources.reduce((acc, res) => acc += res[property] as number, 0);
  }
}
