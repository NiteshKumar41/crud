import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../appModels/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public http: HttpClient)  { }
  
  url='http://localhost:3000/employee'
  
  addEmployee(emp:Employee){
      return this.http.post<any>(this.url,emp)
    }
  getEmployeeList(){
    return this.http.get(this.url);
  }
  deleteEmployee(id){
    return this.http.delete(`${this.url}/${id}`);
  }
  updateEmployee(emp:Employee){
    return this.http.put(`${this.url}/${emp._id}`,emp);
  }

  getData(data)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    const url="https://reqres.in/api/login";
    return this.http.post (url,data,httpOptions);

    
  }
}

