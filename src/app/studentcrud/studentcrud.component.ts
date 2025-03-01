import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectorRef,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';

import {NgForm} from '@angular/forms';
import { ObjectEncodingOptions } from 'node:fs';
@Component({
  selector: 'app-studentcrud',
  standalone:true,
  imports:[FormsModule ,CommonModule],
  templateUrl: './studentcrud.component.html',
  styleUrl: './studentcrud.component.css'
})
export class StudentcrudComponent  {

  
  StudentArray:any[] = [];
  currentEmployeeID="";


  firstname: string="";
  middlename: string="";
  lastname: string="";
  gender:string="";
  birthday: string="";
  state: string="";
  email:string="";
constructor(private http: HttpClient )
{
  this.getAllStudent();
}
  getAllStudent() {
    this.http.get("http://localhost:8000/user/getAll")
    .subscribe((resultData:any)=>
    {
      
      console.log(resultData);
      this.StudentArray=resultData.data;
      
    });
  }
register()
{
  let bodydata={
    firstname: this.firstname,
    middlename : this.middlename,
   lastname: this.lastname,
   gender:this.gender,
    birthday: this.birthday,
    state: this.state,
    email:this.email

  };
  console.log('Body Data:', bodydata);
this.http.post("http://localhost:8000/user/create",bodydata).subscribe((resultData:any) =>
{
  console.log("Success:",resultData);
  alert("Student Registered Successfully!");
 
  this.getAllStudent();
  this.firstname='';
  this.middlename='';
  this.lastname='';
  this.gender='';
  this.birthday='';
  this.state='';
  this.email='';
});
}
}


