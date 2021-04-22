import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private httpOption = {} // for token

  APIURL = `http://supergit.asuscomm.com:4000`

  host = '/api/'

  constructor(private http: HttpClient) {
  }

  /***
   * get WordCloud
   * ***/
  getWordCloud(info): Observable<any> {
    const url = this.host + `/climateAU_MP/climateAU_MP_Count`;
    return this.http.post<any>(url, info);
  }
}
