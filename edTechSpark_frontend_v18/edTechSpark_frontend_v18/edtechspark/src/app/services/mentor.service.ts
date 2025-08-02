import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Mentor } from '../models/mentor';

@Injectable({ providedIn: 'root' })
export class MentorService {
  httpHeaders: HttpHeaders;
  constructor(private httpClient: HttpClient) {
      this.httpHeaders = new HttpHeaders({ 'content-type': 'application/json' });
  }

  GetMentors(): Observable<HttpResponse<Mentor[]>> {
    return this.httpClient.get<Mentor[]>(environment.apiAddress + '/mentor/getall', { headers: this.httpHeaders, observe: 'response' });
  }
  GetMentor(id: number): Observable<HttpResponse<Mentor>> {
    return this.httpClient.get<Mentor>(environment.apiAddress + '/mentor/get/' + id, { headers: this.httpHeaders, observe: 'response' });
  }
  AddMentor(mentor: Mentor): Observable<HttpResponse<HttpResponse<any>>> {
    return this.httpClient.post<HttpResponse<any>>(environment.apiAddress + '/mentor/add', JSON.stringify(mentor), { headers: this.httpHeaders, observe: 'response' });
  }
  UpdateMentor(mentor: Mentor): Observable<HttpResponse<HttpResponse<any>>> {
    return this.httpClient.put<HttpResponse<any>>(environment.apiAddress + '/mentor/update/' + mentor.id, JSON.stringify(mentor), { headers: this.httpHeaders, observe: 'response' });
  }
  DeleteMentor(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete<HttpResponse<any>>(environment.apiAddress + '/mentor/delete/' + id, { headers: this.httpHeaders, observe: 'response' });
  }
}
