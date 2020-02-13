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

  getResources(clustedId: string): Observable<Resource[]> {
    const url = `${environment.resourcesApi}/cluster/${clustedId}`;

    return this.http.get<Resource[]>(url);
  }
}
