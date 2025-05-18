import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-student-table',
  imports: [FormsModule,
    IconFieldModule,
    InputIconModule,
    RouterLink,
    CommonModule,
    
   ],
  templateUrl: './student-table.component.html',
  styleUrl: './student-table.component.css'
})
export class StudentTableComponent implements OnInit {
  StudentArray:any[] = [];
  selectedStudent: any| null = null;
  currentEmployeeID="";
  submitted= false;
  
 
  firstname: string="";
  middlename: string="";
  lastname: string="";
  gender:string="";
  birthday: Date | null = null;
  state: string="";
  email:string="";
  originalemail: string='';

  sex= [
    {name:'male'},
    {name:'female'}
  ];
  selectedsex: any;

  countries = [
    { name: 'Ethiopia' },
    { name: 'Kenya' },
    { name: 'Canada' },
    { name: 'United Kingdom' }
  ];
  
  selectedCountry: any;

  constructor(private http: HttpClient , private router: Router)
 {}
 ngOnInit(): void {
  this.getAllStudents();
}
    getAllStudents() {
      this.http.get("http://localhost:8000/user/getAll")
      .subscribe((resultData:any)=>
      {
        
        console.log(resultData);
        this.StudentArray = resultData.data;
      });
      console.log ('test');
    }
    
    
  editStudent(email: string) {
    const student = this.StudentArray.find(s => s.email === email);
    if (student) {
       this.router.navigate(['/studentcrud'], { queryParams: { email: email } });
      this.selectedStudent = student;
      this.originalemail = student.email;
      this.firstname = student.firstname;
      this.middlename = student.middlename;
      this.lastname = student.lastname;
      this.email= student.email;
      this.selectedsex = this.sex.find(option => option.name === student.gender);
      this.selectedCountry = this.countries.find(option => option.name === student.state);
      this.birthday = new Date(student.birthday); 
  
    console.log("editing student with email:", email);
    }else{
      alert("student not found");
    }}
    updateStudent(){
    if (!this.selectedStudent) {
      alert("No student selected for update.");
      return;
    }
    if (!this.originalemail){
      alert("No student selected or invalid email.");
      return;
    }
  
    let bodyData = {
      firstname: this.firstname,
      middlename: this.middlename,
      lastname: this.lastname,
      gender: this.selectedsex ? this.selectedsex.name : '',
      birthday: this.birthday ? (new Date(this.birthday)).toISOString().substring(0,10) : '',
      state: this.selectedCountry ? this.selectedCountry.name: '',
      email: this.email
    };
  
    this.http.put(`http://localhost:8000/user/update/${this.originalemail}`, bodyData)
      .subscribe(
        (resultData: any) => {
          console.log("Updated successfully:", resultData);
          alert("Student Updated Successfully!");
          this.getAllStudents();
          this.resetForm();
          
        },
        (error) => {
          console.error("Error occurred:", error);
          alert("Failed to update student. Please try again.");
        }
      );
    }
  
    resetForm(){
      this.selectedStudent = null;
      this.originalemail = '';
      this.firstname = '';
      this.middlename = '';
      this.lastname = '';
      this.gender = '';
      this.birthday = null;
      this.state = '';
      this.email = '';
    
      this.selectedsex = null;
      this.selectedCountry = null;}
  // Delete a student by email
  deleteStudent(email: string) {
    if (confirm("Are you sure you want to delete this student?")) {
      this.http.delete(`http://localhost:8000/user/delete/${email}`).subscribe(
        (resultData: any) => {
          console.log("Deleted successfully:", resultData);
          alert("Student Deleted Successfully!");
          this.StudentArray = resultData.users;
          // this.getAllStudents(); // Refresh list
        },
        (error) => {
          console.error("Error occurred:", error);
          alert("Failed to delete student. Please try again.");
        }
      );
    }
  }
  }

