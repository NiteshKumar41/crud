import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../appModels/employee.model';
import { EmployeeService } from '../appservice/employee.service';
import { LocalStorageService } from '../local-storage.service';
import { FilterPipe } from '../pipe/filter.pipe';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  empForm: FormGroup
  employees: Employee[];
  showModal: boolean = true;
  editModal: boolean = false;
  
  constructor(private fb: FormBuilder, private empservice: EmployeeService, private router: Router, private localstorageService: LocalStorageService) { }
  public search: string
  ngOnInit(): void {
    this.getEmployees();
    this.empForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      position: ['', Validators.required]
    })

  }
  onAddEmployee() {
    // console.log('try to show modal');
    this.showModal = false;
    console.log(this.showModal);
  }
  onCloseModal() {
    this.showModal = true
  }

  getEmployees() {
    this.empservice.getEmployeeList().subscribe(
      (res: Employee[]) => {
        console.log(res);
        this.employees = res
      }
    );
  }

  onEmpSubmit() {
    if (this.empForm.valid) {
      // console.log(this.empForm.value);
      if (this.editModal) {
        this.empservice.updateEmployee(this.empForm.value).subscribe(
          (res) => {
            console.log(res);
            this.getEmployees();
          }
        );
        this.onCloseModal();
      }
      else {
        this.empservice.addEmployee(this.empForm.value).subscribe(
          (res) => {
            console.log(res);
            this.getEmployees();

          }
        );
        this.onCloseModal();
      }
    }
  }

  onDeleteEmployee(id) {
    return this.empservice.deleteEmployee(id).subscribe(
      (res) => {
        console.log(res);
        this.getEmployees();
      }
    )
  }

  onUpdateEmployee(emp) {
    this.showModal = false
    this.editModal = true
    this.empForm.patchValue(emp);
  }


  logout() {
    this.localstorageService.clear();
    this.router.navigateByUrl('/login');
  }
}
