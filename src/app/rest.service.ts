import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  readonly API_URL = 'https://api.artic.edu/api/v1/artworks';
  constructor(private http: HttpClient) { }
  getArtworks(page: number, limit: number): Observable<any> {
    const params = { page: page.toString(), 
      limit: limit.toString() 
    };
    return this.http.get<any>(this.API_URL, { params });
  }

  getArtworkById(id: number): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    console.log(`${this.API_URL}/${id}`);
    return this.http.get<any>(url);
  }
}
