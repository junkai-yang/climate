import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  lineData = new Subject<any>();

  private httpOption = {} // for token
  // API = `https://supergit.cn:4000/` // test
  API = `localhost:4000/` // uni

  // host = '/api/'

  constructor(private http: HttpClient) {
  }

  /***
   * get WordCloud Data
   * ***/
  getWordCloud(info): Observable<any> {
    const url = this.API + `climateAU_MP/climateAU_MP_Count`;
    return this.http.post<any>(url, info);
  }

  /***
   * get Line Data   https://supergit.cn:4000/climateAU/climateAU_MP_Count
   * ***/
  getLineGraph(date): Observable<any> {
    const url = this.API + `climateAU/climateAU_MP_Count`;
    return this.http.post<any>(url, date);
  }

  // setLineData(data) {
  //   this.lineData = data;
  // }
  //
  // getLineData(): Observable<any> {
  //   return this.lineData;
  // }
}
