import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../appservice/employee.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private empService: EmployeeService,private router:Router,
    private localstorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  onSubmit(data){
    console.log(data);  
    
    this.empService
    .getData(data).subscribe((token)=>{
      console.log(token);
      
      this.localstorageService.setItem('userprofile', JSON.stringify(token));
      this.router.navigateByUrl('/employee');
  
      
    })
  }
}
