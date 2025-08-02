import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  httpHeaders: HttpHeaders;
  constructor(private httpClient: HttpClient) {
      this.httpHeaders = new HttpHeaders({ 'content-type': 'application/json' });
  }

  GetCategories(): Observable<HttpResponse<Category[]>> {
    return this.httpClient.get<Category[]>(environment.apiAddress + '/category/getall', { headers: this.httpHeaders, observe: 'response' });
  }
  AddCategory(category: Category): Observable<HttpResponse<HttpResponse<any>>> {
    return this.httpClient.post<HttpResponse<any>>(environment.apiAddress + '/category/add', JSON.stringify(category), { headers: this.httpHeaders, observe: 'response' });
  }
}
