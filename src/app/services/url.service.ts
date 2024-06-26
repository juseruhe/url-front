import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  endpoint = environment.api_backend;

  constructor(private http: HttpClient) {
   }

   sendUrl(url: string){
    const body = JSON.stringify({url: url})
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Indica que estás enviando datos JSON
    });
   return this.http.post(this.endpoint,body,{headers:headers})
   }

   sendUrls(urls: any[]){
    const body = JSON.stringify({urls: urls})
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Indica que estás enviando datos JSON
    });
   return this.http.post<{results: any}>(this.endpoint+"/urls",body,{headers:headers})
   }


   getUrls(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Indica que estás enviando datos JSON
    });
    return this.http.get<{results: any}>(this.endpoint+"/getUrls",{headers: headers})
   }


   addUrl(url: string) {
    const body = JSON.stringify({url: url});
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Indica que estás enviando datos JSON
    });
    return this.http.post<{result: any}>(this.endpoint+"/addUrl",body,{headers: headers})
   }

   deleteUrl(id: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Indica que estás enviando datos JSON
    });
    return this.http.delete<{result: any}>(this.endpoint+"/deleteUrl/"+id,{headers: headers})
   }

   editUrl(id: number, url: string){
    const body = {url: url}
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Indica que estás enviando datos JSON
    });
    return this.http.put<{result: any}>(this.endpoint+"/editUrl/"+id,body,{headers: headers})
   }
}
