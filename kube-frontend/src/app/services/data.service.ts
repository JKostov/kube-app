import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Cluster, Resource } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private readonly http: HttpClient) {
  }

  getClusters(): Observable<Cluster[]> {
    const url = `${environment.clustersApi}`;

    return this.http.get<Cluster[]>(url);
  }

  getClusterById(clusterId: string): Observable<Cluster> {
    const url = `${environment.clustersApi}/${clusterId}`;

    return this.http.get<Cluster>(url);
  }

  createCluster(cluster: Cluster): Observable<Cluster> {
    const url = `${environment.clustersApi}`;

    return this.http.post<Cluster>(url, cluster);
  }

  deleteCluster(clusterId: string): Observable<Cluster> {
    const url = `${environment.clustersApi}/${clusterId}`;

    return this.http.delete<Cluster>(url);
  }

  getResources(clustedId: string): Observable<Resource[]> {
    const url = `${environment.resourcesApi}/cluster/${clustedId}`;

    return this.http.get<Resource[]>(url);
  }

  createResource(resource: Resource): Observable<Resource> {
    const url = `${environment.resourcesApi}/cluster/${resource.clusterId}`;

    return this.http.post<Resource>(url, resource);
  }

  deleteResource(resourceId: string): Observable<Resource> {
    const url = `${environment.resourcesApi}/${resourceId}`;

    return this.http.delete<Resource>(url);
  }
}
