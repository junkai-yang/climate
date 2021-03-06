import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  lineData = new Subject<any>();
  heatData = new Subject<any>();
  nodeSize = new Subject<any>();

  private httpOption = {} // for token
  // API = `https://supergit.cn:4000/` // test
  // API = `https://supergit.cn:6000/` // test
  API = `https://bigdata.ict.griffith.edu.au:4102/` // uni


  // host = '/api/'

  constructor(private http: HttpClient) {
  }

  /***
   * get WordCloud Data
   * ***/
  getWordCloud(info): Observable<any> {
    const url = this.API + `climateAU_MP/climateAU_MP_Count`; // test
    // const url = this.API + `climateAU_MP_Count`; // uni
    return this.http.post<any>(url, info);
  }

  /***
   * get Line Data   https://supergit.cn:4000/climateAU/climateAU_MP_Count
   * ***/
  getLineGraph(date): Observable<any> {
    const url = this.API + `climateAU/climateAU_Choose_Compaund`; // test
    // const url = this.API + `climateAU_Count`; // uni
    return this.http.post<any>(url, date);
  }

  /***
   * get semantic network data
   */
  getNode(info): Observable<any> {
    const url = this.API + `climateAU_edg/climateAU_edge_Count`; // test
    // const url = this.API + `climateAU_edge_Count`; // uni
    return this.http.post<any>(url, info);
  }

  /***
   * get heatmap data
   */
  getMap(info): Observable<any> {
    const url = this.API + `climateAU/climateAU_MP_HeatMap`; //test
    // const url = this.API + `climateAU_MP_HeatMap`; // uni
    return this.http.post(url, info);
  }

  getInitLineData(): Observable<any> {
    const url = this.API + `climateAU/climateAU_All_Compaund`
    return this.http.get(url);
  }
}
