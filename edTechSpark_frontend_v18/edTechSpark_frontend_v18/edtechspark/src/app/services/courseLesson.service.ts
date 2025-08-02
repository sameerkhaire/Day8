import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CourseLesson } from '../models/courselesson';

@Injectable({ providedIn: 'root' })
export class CourseLessonService {
  httpHeaders: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    this.httpHeaders = new HttpHeaders({ 'content-type': 'application/json' });
  }

  GetLessonsByTopic(topicId: number): Observable<HttpResponse<CourseLesson[]>> {
    return this.httpClient.get<CourseLesson[]>(environment.apiAddress + '/courselesson/getlessonsbytopic/' + topicId, { headers: this.httpHeaders, observe: 'response' });
  }
  GetLesson(id: number): Observable<HttpResponse<CourseLesson>> {
    return this.httpClient.get<CourseLesson>(environment.apiAddress + '/courselesson/get/' + id, { headers: this.httpHeaders, observe: 'response' });
  }
  AddLesson(lesson: CourseLesson): Observable<HttpResponse<HttpResponse<any>>> {
    return this.httpClient.post<HttpResponse<any>>(environment.apiAddress + '/courselesson/add', JSON.stringify(lesson), { headers: this.httpHeaders, observe: 'response' });
  }
  UpdateLesson(lesson: CourseLesson): Observable<HttpResponse<HttpResponse<any>>> {
    return this.httpClient.put<HttpResponse<any>>(environment.apiAddress + '/courselesson/update/' + lesson.id, JSON.stringify(lesson), { headers: this.httpHeaders, observe: 'response' });
  }
  DeleteLesson(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete<HttpResponse<any>>(environment.apiAddress + '/courselesson/delete/' + id, { headers: this.httpHeaders, observe: 'response' });
  }
}
