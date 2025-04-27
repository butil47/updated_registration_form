import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectorRef,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-studentcrud',
  standalone:true,
  imports:[FormsModule ,CommonModule],
  templateUrl: './studentcrud.component.html',
  styleUrl: './studentcrud.component.css'
})
export class StudentcrudComponent  {

  
  StudentArray:any[] = [];
  selectedStudent: any| null = null;
  currentEmployeeID="";
  submitted= false;


  firstname: string="dblight";
  middlename: string="";
  lastname: string="";
  gender:string="";
  birthday: string="";
  state: string="";
  email:string="";
constructor(private http: HttpClient )
{
  this.getAllStudents();
  
}
  getAllStudents() {
    this.http.get("http://localhost:8000/user/getAll")
    .subscribe((resultData:any)=>
    {
      
      console.log(resultData);
      this.StudentArray = resultData.data;
    });
  }
  checkconsole(){
    console.log("console test");
  }
register(form: NgForm)
{
  this.submitted=true;
  if(form.invalid){
    return;
  }
 
  console.log(form.value);
  

  let bodydata={
    firstname: form.value.firstname,
    middlename :form.value.middlename,
   lastname: form.value.lastname,
   gender:form.value.gender,
    birthday: form.value.birthday,
    state: form.value.state,
    email:form.value.email

  };
  console.log('Body Data:', bodydata);
this.http.post("http://localhost:8000/user/create",bodydata).subscribe((resultData:any) =>
{
  console.log("Success:",resultData);
  alert("Student Registered Successfully!");
 
  this.getAllStudents();
  this.firstname='';
  this.middlename='';
  this.lastname='';
  this.gender='';
  this.birthday='';
  this.state='';
  this.email='';
  form.resetForm();
}, (error)=> {
  console.error("Error occurred:",error);
  alert("failed to registration student.please try again.");
  
});
// form.resetForm();
this.submitted=false;
}

// Update the student record
editStudent(email: string) {
  const student = this.StudentArray.find(s => s.email === email);
  if (student) {
    this.selectedStudent = student;
    this.firstname = student.firstname;
    this.middlename = student.middlename;
    this.lastname = student.lastname;
    this.gender = student.gender;
    this.birthday = student.birthday;
    this.state = student.state;
    this.email = student.email;
  console.log("editing student with email:", email);
  }else{
    alert("student not found");
  }}
  updateStudent(){
  if (!this.selectedStudent) {
    alert("No student selected for update.");
    return;
  }

  let bodyData = {
    firstname: this.firstname,
    middlename: this.middlename,
    lastname: this.lastname,
    gender: this.gender,
    birthday: this.birthday,
    state: this.state,
    email: this.email
  };

  this.http.put(`http://localhost:8000/user/update/${this.selectedStudent.email}`, bodyData)
    .subscribe(
      (resultData: any) => {
        console.log("Updated successfully:", resultData);
        alert("Student Updated Successfully!");
        this.getAllStudents();
        this.selectedStudent = null;
        this.firstname = '';
        this.middlename = '';
        this.lastname = '';
        this.gender = '';
        this.birthday = '';
        this.state = '';
        this.email = ''; // Reset form
      },
      (error) => {
        console.error("Error occurred:", error);
        alert("Failed to update student. Please try again.");
      }
    );
}


// Delete a student by email
deleteStudent(email: string) {
  if (confirm("Are you sure you want to delete this student?")) {
    this.http.delete(`http://localhost:8000/user/delete/${email}`).subscribe(
      (resultData: any) => {
        console.log("Deleted successfully:", resultData);
        alert("Student Deleted Successfully!");
        this.getAllStudents(); // Refresh list
      },
      (error) => {
        console.error("Error occurred:", error);
        alert("Failed to delete student. Please try again.");
      }
    );
  }
}
}



