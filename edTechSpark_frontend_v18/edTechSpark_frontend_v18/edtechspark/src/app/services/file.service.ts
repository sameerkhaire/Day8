import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class FileService {
    httpHeaders: HttpHeaders | undefined;
    constructor(private httpClient: HttpClient) {
    }

    UploadFile(file: any): Observable<HttpResponse<any>> {
        return this.httpClient.post<any>(environment.apiAddress + '/api/file/upload', file, { headers: this.httpHeaders, observe: 'response' });
    }
} 
