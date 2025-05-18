
import { HttpInterceptorFn, HttpInterceptor } from '@angular/common/http';
import{of} from 'rxjs';
import{HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
    import {  HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
    import { Observable } from 'rxjs';


interface User {
  firstname: string;
  middlename: string;
  lastname: string;
  gender: string;
  state: string;
  birthday: string;
  email: string;
}

let usersData: { data: User[] } = {
  data: [
    {
      firstname: "Trump",
      middlename: "sjvn skj",
      lastname: "vskbkjd",
      gender: "female",
      state: "US",
      birthday: "2025-04-08",
      email: "robtm6590@gmail.com"
    }
  ]
};

// @Injectable()
//     export class MyInterceptor implements HttpInterceptor {
//       intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         // Modify the request (e.g., add a header)
//         const modifiedRequest = request.clone({
//           setHeaders: {
//             'Authorization': 'Bearer my-token'
//           }
//         });

//         // Handle the request and return the response
//         return next.handle(modifiedRequest);
//       }}
// export const fakeapiinterceptorInterceptor implements HttpInterceptor
export const fakeapiinterceptorInterceptor: HttpInterceptorFn = (request, next) => {
  const url = request.url;
  const method = request.method;
  console.log(`[Interceptor Triggered] ${method} ${url}`);
  console.log('fakeapiinterceptorInterceptor1');

  if(method === "GET" && url.endsWith("/user/getAll")) {
    console.log('fakeapiinterceptorInterceptor2');
    // of(new HttpResponse({ status: 200, body: usersData })).subscribe
    return of(new HttpResponse({ status: 200, body: usersData }));
    }

    // POST: Add a new student
  if (method === 'POST' && url.endsWith("/user/create")) {
    const newUser = request.body as User;
    
    usersData.data.push(newUser);
    return of(new HttpResponse({ status: 201, body: { message: 'User created', data: newUser } }));
  }

  // PUT: Update existing student
  if (method === 'PUT' && url.startsWith('http://localhost:8000/user/update/')) {
    const email = url.split('/').pop();
    const index = usersData.data.findIndex(user => user.email === email);
    if (index !== -1) {
      usersData.data[index] = request.body as User;
      return of(new HttpResponse({ status: 200, body: { message: 'User updated', data: request.body } }));
    } else {
      return of(new HttpResponse({ status: 404, body: { message: 'User not found' } }));
    }
  }

  // DELETE: Remove a user
  if (method === 'DELETE' && url.startsWith('http://localhost:8000/user/delete/')) {
    const email = url.split('/').pop();
    const initialLength = usersData.data.length;
    usersData.data = usersData.data.filter(user => user.email !== email);
    const deleted = usersData.data.length < initialLength;
    return of(new HttpResponse({
      status: deleted ? 200 : 404,
      body: {
        message: deleted ? 'User deleted' : 'User not found',
        users: usersData.data
      }
    }));
  }
  return next(request);
};
