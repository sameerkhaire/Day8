import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  httpHeaders: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    this.httpHeaders = new HttpHeaders({ 'content-type': 'application/json' });
  }
  GetCourses(): Observable<HttpResponse<Course[]>> {
    return this.httpClient.get<Course[]>(environment.apiAddress + '/catalog/getall', { observe: 'response' });
  }
  GetCourse(name: string): Observable<HttpResponse<Course>> {
    return this.httpClient.get<Course>(environment.apiAddress + '/catalog/GetCourseWithLessons/' + name, { observe: 'response' });
  }
}
