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
   * get Employee
   * ***/
  getEmployeeInfo(): Observable<any>{
    const url = this.host + `/goods/findGoods`;
    const info = {
      "province": "江苏"
    }
    // const url = this.APIURL + '/goods/findGoods'
    console.log(url)
    return this.http.post<any>(url,info);
    // return this.http.get<any>(url);
  }
}
