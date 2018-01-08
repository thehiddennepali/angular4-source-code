import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


export class Product {
  constructor(
      public name: string,
      

    
    ) { }
}

@Injectable() 
export class ProductService {
	 
    private getUrl = 'http://139.59.39.52/frontend/web/index.php?r=api/product';

    constructor (private http: Http) {}
      
    getIndexData():Observable<Product[]> {
        return this.http.get(this.getUrl)
          .map(this.extractData)
          .catch(this.handleError);
    }

    private extractData(res:Response) {
        let body = res.json();
        return body || [];

    }

     
    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
        const body = error.json() || '';
        const errMsg=error.json() || '';
        return Observable.throw(errMsg);
        } 
    }

}

