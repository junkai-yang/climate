import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private httpOption = {} // for token

  API = `https://supergit.cn:4000/`

  // host = '/api/'

  constructor(private http: HttpClient) {
  }

  /***
   * get WordCloud
   * ***/
  getWordCloud(info): Observable<any> {
    const url = this.API + `climateAU_MP/climateAU_MP_Count`;
    return this.http.post<any>(url, info);
  }
}
