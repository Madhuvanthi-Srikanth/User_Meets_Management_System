import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  url = 'http://localhost:3000';
  //current_user = '';

  constructor (private http : HttpClient) {
    //this.getUserFeedbackDetails()
  }

 client_fields = ['username', 'name', 'phone', 'email', 'address']
 lead_fields = ['username', 'name', 'phone', 'email' ]


  createUser(details: any)
  {
    console.log(details.user_role);
    
    if(details.user_role ==='Lead')
    {console.log("hi");
      return this.http.post(`${this.url}/lead/new`, details)

    }
    else
    {
      return this.http.post(`${this.url}/client/new`, details)
    }
  }

  editUserDetails(details: any)
  {
    if(details.user_role ==='Lead')
    {
      return this.http.put(`${this.url}/lead/update`, details)
    }
    else
    {
      return this.http.put(`${this.url}/client/update`, details)
    }
  }

  getUser(details: any)
  {
    return this.http.get(`${this.url}/${details.user_type}/${details.username}`)
  }

  userLogin(details:any)
  {
    
    
    if(details.user_role==='Lead')
    {
      console.log("lead");
      
      return this.http.post(`${this.url}/lead/login`, details)
    }
    else if(details.user_role==='Client')
    {
      console.log("client");
      return this.http.post(`${this.url}/client/login`, details)
    }
    else
    {
      console.log("admin");
      return this.http.post(`${this.url}/admin/login`, details)
    }
  }

  forgotPassword(details: any)
  {
    return this.http.post(`${this.url}/forgot-password`, details)
  }
  //--appts
  getFutureAppointments(details: any)
  {
    return this.http.post(`${this.url}/meets/upcoming`, details)
  }
  getPastAppointments(details: any)
  {
    return this.http.post(`${this.url}/meets/past`, details)
  }
  createAppointment(details:any)
  {
    return this.http.post(`${this.url}/meets/new`, details)
  }

 
  //--filter lead
  getAllDoctors()
  {
    return this.http.get(`${this.url}/lead/all`)
  }

 
  filterAndSearch(spec:any, query_string: any)
  {
    return this.http.get(`${this.url}/lead/search/${spec}/${query_string}`)
  }
  //-- feedbacks
  getUserFeedback(username:any)
  {
    return this.http.get(`${this.url}/feedback/${username}`)
  }
  saveFeedback(details: any)
  {
    return this.http.post(`${this.url}/feedback/new`, details)
  }
  getAllFeedbacks()
  {
    return this.http.get(`${this.url}/feedback/all`)
  }
  searchFeedback(search:any)
  {
    return this.http.get(`${this.url}/feedback/search/${search}`)
  }
  sortFeedback(sort:any)
  {
    return this.http.get(`${this.url}/feedback/sort/${sort}`)
  }
  filterFeedback(filter:any)
  {
    return this.http.get(`${this.url}/feedback/filter/${filter}`)
  }
}
