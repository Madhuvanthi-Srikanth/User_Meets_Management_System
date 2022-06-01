import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-lead-home',
  templateUrl: './lead-home.component.html',
  styleUrls: ['./lead-home.component.css', '../common-styles.css']
})
export class LeadHomeComponent implements OnInit {

  constructor(
    public userService : UserDetailsService,
    public router:Router,
    private route: ActivatedRoute
  ) { }

  appointments: any[] = []; 
  current_user : any

  ngOnInit(): void {
    this.current_user = JSON.parse(localStorage.getItem('CURRENT%USER') || '{}')
    this.getFutureAppointments()
  }

  getFutureAppointments()
  {
      this.userService.getFutureAppointments({username: this.current_user.username, role: this.current_user.user_type}).subscribe((data:any)=>{
      if(data.status ==='success')
      {
        this.appointments = data.data
        if(this.appointments.length>0)
        {
          for(let i=0; i<this.appointments.length; i++)
          {
            this.userService.getUser({user_type: 'client', username: this.appointments[i].client_username}).subscribe((data:any)=>{
              var today = new Date();
             
             
              console.log(this.appointments);
            })
          }
        }
      }
    })
  }

}
