import { Component, AfterViewInit} from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../common-styles.css'],
})


export class SignupComponent implements AfterViewInit{

  constructor ( 
    public userService : UserDetailsService,
    public router:Router,
    private route: ActivatedRoute
    ) {}

  userType = '';
  // specializations : any

  signupDetails = {
    username: '',
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    user_role: '',
    remember_me: ''
  }


  ngAfterViewInit() {
    // this.userService.getSpecializations().subscribe(data => {
    //   this.specializations=data
    // })
  }


  changeUserType()
  {
    var e = (document.getElementById("user-role")) as HTMLSelectElement;
    var sel = e.selectedIndex;
    var opt = e.options[sel];
    var user = (<HTMLOptionElement>opt).value;
    this.userType = user
    if(this.userType ==='lead')
    {
      this.signupDetails.username=''
      this.signupDetails.email = ''
    }
    else if(this.userType ==='client')
    {
      this.signupDetails.username=''
      this.signupDetails.email=''
    }
    this.clearErrors()
  }

  signupSubmit()
  {
    this.clearErrors()
    this.userService.createUser(this.signupDetails).subscribe(data=>{
      var result : any = data
      if(result.status ==='failed')
      {
        if(result.message)
        {
          for (var i of Object.keys(result.message))
          {
            let ele = document.getElementsByClassName(`${i}-error`)[0] as HTMLSpanElement
            ele.innerText = result.message[i].message
          }
        }
        else if(result.thrown)
        {
          let ele = document.getElementsByClassName(`username-error`)[0] as HTMLSpanElement
          ele.innerText = result.thrown
        }
      }
      else if (result.status==='success')
      {
        this.clearErrors()
        
        //this.clearInputs()
        delete result.status
        delete result._doc._id
        delete result._doc.__v
        localStorage.setItem('CURRENT%USER', JSON.stringify(result._doc))
        localStorage.setItem('USER%TYPE', result._doc.user_type)

        if(this.signupDetails.remember_me!='')
        {
          this.createCookie(this.signupDetails.username, this.signupDetails.user_role)
        }
        this.router.navigate(['/home'], { relativeTo: this.route, replaceUrl:true })
      }
    })
    
  }

  clearErrors()
  {
    var errors = document.querySelectorAll('span')
    errors.forEach(i=>{
      i.innerText=''
    })
  }
  clearInputs()
  {
    this.signupDetails = {
      username: '',
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      user_role: '',
      remember_me: ''
    }
    
  }


  createCookie(uname:any, user_type: any)
  {
    var date = new Date()
    var details = {
      username: uname,
      user_type: user_type
    }
    date.setTime(date.getTime() + (2*24*60*60*1000))
    var cookie = `userdetails=${JSON.stringify(details)};expires=${date.toUTCString()};path= http://localhost:4200/`
    document.cookie = cookie
  }
  

}