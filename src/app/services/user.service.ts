import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http : HttpClient) { }

  postDatos(params: any){
    
    let options = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }; 
    var url = 'https://oespitia.hbcsoluciones.com.co/phpionic/php/proccess.php';   
    return this.http.post(url,JSON.stringify(params), options).map(res => res);
 
  }

}
