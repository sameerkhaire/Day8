import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CourseTopic } from '../models/coursetopic';

@Injectable({ providedIn: 'root' })
export class CourseTopicService {
  httpHeaders: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.httpHeaders = new HttpHeaders({ 'content-type': 'application/json' });
  }

  GetAllTopics(): Observable<HttpResponse<CourseTopic[]>> {
    return this.httpClient.get<CourseTopic[]>(environment.apiAddress + '/coursetopic/getall', { headers: this.httpHeaders, observe: 'response' });
  }

  GetTopicsByCourse(id: number): Observable<HttpResponse<CourseTopic[]>> {
    return this.httpClient.get<CourseTopic[]>(environment.apiAddress + '/coursetopic/gettopicsbycourse/' + id, { headers: this.httpHeaders, observe: 'response' });
  }
  
  GetTopic(id: number): Observable<HttpResponse<CourseTopic>> {
    return this.httpClient.get<CourseTopic>(environment.apiAddress + '/coursetopic/get/' + id, { headers: this.httpHeaders, observe: 'response' });
  }

  AddTopic(topic: CourseTopic): Observable<HttpResponse<HttpResponse<any>>> {
    return this.httpClient.post<HttpResponse<any>>(environment.apiAddress + '/coursetopic/add', JSON.stringify(topic), { headers: this.httpHeaders, observe: 'response' });
  }
  UpdateTopic(topic: CourseTopic): Observable<HttpResponse<HttpResponse<any>>> {
    return this.httpClient.put<HttpResponse<any>>(environment.apiAddress + '/coursetopic/update/' + topic.id, JSON.stringify(topic), { headers: this.httpHeaders, observe: 'response' });
  }
  
  DeleteTopic(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete<HttpResponse<any>>(environment.apiAddress + '/coursetopic/delete/' + id, { headers: this.httpHeaders, observe: 'response' });
  }
}
