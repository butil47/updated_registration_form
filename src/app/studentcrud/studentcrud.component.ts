import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectorRef,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import {NgForm} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CalendarModule } from 'primeng/calendar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-studentcrud',
  standalone:true,
  imports:[FormsModule ,
    CommonModule,
     DropdownModule ,
     DatePickerModule, 
     InputGroupModule,
      CalendarModule ,
      InputGroupAddonModule,
      IconFieldModule,
      InputIconModule ],
  templateUrl: './studentcrud.component.html',
  styleUrl: './studentcrud.component.css'
})

export class StudentcrudComponent  {

  
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


constructor(private http: HttpClient,private router: Router, private route: ActivatedRoute )
{}
ngOnInit() {
  const email = this.route.snapshot.queryParamMap.get('email');
  if (email) {
    this.getAllStudents(email);
 
}}

    getAllStudents(email?: string){
      this.http.get("http://localhost:8000/user/getAll").subscribe((resultData: any) => {
        console.log('Fetched Students:', resultData);
        this.StudentArray = resultData.data; 

        if (email) {
          this.prefillStudent(email);
        }
  });
}
prefillStudent(email: string) {
  const student = this.StudentArray.find(s => s.email === email);
  if (student) {
    this.firstname = student.firstname;
    this.middlename = student.middlename;
    this.lastname = student.lastname;
    this.email = student.email;
    this.selectedsex = this.sex.find(option => option.name === student.gender);
    this.selectedCountry = this.countries.find(option => option.name === student.state);
    this.birthday = new Date(student.birthday);
    this.originalemail = student.email;
  } else {
    console.warn('Student not found:', email);
  }
}



checkconsole() {
  console.log("console test");
} 
  
      
register(form: NgForm)
{
  this.submitted=true;
  if(form.invalid){
    return;
  }
  console.log('Form values:', form.value);
  console.log('Selected gender:', this.selectedsex);
  console.log('Selected state:', this.selectedCountry);
  console.log('Birthday before submission:', this.birthday);
  console.log(form.value);
  

  let bodydata={
    firstname: form.value.firstname,
    middlename :form.value.middlename,
   lastname: form.value.lastname,
   gender:this.selectedsex?.name || '',
   birthday: this.birthday ? (new Date(this.birthday)).toISOString().substring(0,10) : '',
    state: this.selectedCountry?.name || '',
    email:form.value.email

  };
  if (this.originalemail) {
    // If editing an existing student, send a PUT request
    this.http.put(`http://localhost:8000/user/update/${this.originalemail}`, bodydata).subscribe(
      (resultData: any) => {
        alert("Student Updated Successfully!");
        this.router.navigate(['/students']);  // Navigate to the students list after update
       
      },
      (error) => {
        console.error("Error occurred:", error);
        alert("Failed to update student. Please try again.");
      }
    );
  } else {
  
this.http.post("http://localhost:8000/user/create",bodydata).subscribe((resultData:any) =>
{
  console.log("Success:",resultData);
  alert("Student Registered Successfully!");
  this.router.navigate(['/students']);
  
  this.getAllStudents();
  
}, (error)=> {
  console.error("Error occurred:",error);
  alert("failed to registration student.please try again.");
  
});
form.resetForm();
this.submitted=false;
}
}}
// Update the student record
// editStudent(email: string) {
//   const student = this.StudentArray.find(s => s.email === email);
//   if (student) {
//     this.selectedStudent = student;
//     this.originalemail = student.email;
//     this.firstname = student.firstname;
//     this.middlename = student.middlename;
//     this.lastname = student.lastname;
//     this.email= student.email;
//     this.selectedsex = this.sex.find(option => option.name === student.gender);
//     this.selectedCountry = this.countries.find(option => option.name === student.state);
//     this.birthday = new Date(student.birthday); 

//   console.log("editing student with email:", email);
//   }else{
//     alert("student not found");
//   }}
//   updateStudent(){
//   if (!this.selectedStudent) {
//     alert("No student selected for update.");
//     return;
//   }
//   if (!this.originalemail){
//     alert("No student selected or invalid email.");
//     return;
//   }

//   let bodyData = {
//     firstname: this.firstname,
//     middlename: this.middlename,
//     lastname: this.lastname,
//     gender: this.selectedsex ? this.selectedsex.name : '',
//     birthday: this.birthday ? (new Date(this.birthday)).toISOString().substring(0,10) : '',
//     state: this.selectedCountry ? this.selectedCountry.name: '',
//     email: this.email
//   };

//   this.http.put(`http://localhost:8000/user/update/${this.originalemail}`, bodyData)
//     .subscribe(
//       (resultData: any) => {
//         console.log("Updated successfully:", resultData);
//         alert("Student Updated Successfully!");
//         this.getAllStudents();
//         this.resetForm();
        
//       },
//       (error) => {
//         console.error("Error occurred:", error);
//         alert("Failed to update student. Please try again.");
//       }
//     );
//   }

//   resetForm(){
//     this.selectedStudent = null;
//     this.originalemail = '';
//     this.firstname = '';
//     this.middlename = '';
//     this.lastname = '';
//     this.gender = '';
//     this.birthday = null;
//     this.state = '';
//     this.email = '';
  
//     this.selectedsex = null;
//     this.selectedCountry = null;}
// // Delete a student by email
// deleteStudent(email: string) {
//   if (confirm("Are you sure you want to delete this student?")) {
//     this.http.delete(`http://localhost:8000/user/delete/${email}`).subscribe(
//       (resultData: any) => {
//         console.log("Deleted successfully:", resultData);
//         alert("Student Deleted Successfully!");
//         this.StudentArray = resultData.users;
//         // this.getAllStudents(); // Refresh list
//       },
//       (error) => {
//         console.error("Error occurred:", error);
//         alert("Failed to delete student. Please try again.");
//       }
//     );
//   }
// }
// }



