import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  httpHeaders: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    this.httpHeaders = new HttpHeaders({ 'content-type': 'application/json' });
  }
  GetCourses(): Observable<HttpResponse<Course[]>> {
    return this.httpClient.get<Course[]>(environment.apiAddress + '/course/getall', { observe: 'response' });
  }
  GetCourse(id: number): Observable<HttpResponse<Course>> {
    return this.httpClient.get<Course>(environment.apiAddress + '/course/get/' + id, { headers: this.httpHeaders, observe: 'response' });
  }
  GetSubscribedCourses(id: number): Observable<HttpResponse<Course[]>> {
    return this.httpClient.get<Course[]>(environment.apiAddress + '/course/getsubscribedcourses/' + id, { headers: this.httpHeaders, observe: 'response' });
  }
  AddCourse(course: Course): Observable<HttpResponse<HttpResponse<any>>> {
    return this.httpClient.post<HttpResponse<any>>(environment.apiAddress + '/course/add', JSON.stringify(course), { headers: this.httpHeaders, observe: 'response' });
  }
  UpdateCourse(course: Course): Observable<HttpResponse<HttpResponse<any>>> {
    return this.httpClient.put<HttpResponse<any>>(environment.apiAddress + '/course/update/'+course.id, JSON.stringify(course), { headers: this.httpHeaders, observe: 'response' });
  }
  DeleteCourse(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete<HttpResponse<any>>(environment.apiAddress + '/course/delete/' + id, { headers: this.httpHeaders, observe: 'response' });
  }
}
