import { Component, OnInit, Input } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-meet-form',
  templateUrl: './new-meet-form.component.html',
  styleUrls: ['./new-meet-form.component.css', '../common-styles.css']
})
export class NewMeetFormComponent implements OnInit {

  constructor(
    public userService : UserDetailsService,
    public router:Router,
    private route: ActivatedRoute
  ) { }

  current_user : any

  @Input() lead_uname: any
  @Input() lead_name: any

  appointment_details={
    client_username : '',
    lead_username: '',
    lead_name: '',
    time: '',
    problem: ''
  }

  ngOnInit(): void {
    this.current_user = JSON.parse(localStorage.getItem('CURRENT%USER')|| '{}')
    this.appointment_details.client_username = this.current_user.username

    //min today
    var inp = document.querySelector("input[type='datetime-local']") as HTMLInputElement
    inp.setAttribute('min', new Date().toISOString())
  }

  closeAppointmentForm()
  {
    var div = document.getElementById('appointment-view') as HTMLDivElement
    div.style.display = 'none'
    var not_popup = document.getElementsByClassName('not-popup')
    for(let i=0; i<not_popup.length; i++)
    {
      (not_popup[i] as HTMLDivElement).style.filter = 'blur(0px)'
    }
  }

  scheduleAppointment()
  {
    
    
    this.appointment_details.lead_username = this.lead_uname
    this.appointment_details.lead_name = this.lead_name
    console.log(this.appointment_details);
    this.userService.createAppointment(this.appointment_details).subscribe((data:any)=>{
      if(data.status==='success')
      {
        alert('Appointment scheduled!')
      }
      else
      {
        alert('Failed to schedule appointment')
      }
      this.appointment_details={
        client_username : this.current_user.name,
        lead_username: '',
        lead_name: '',
        time: '',
        problem: ''
      }
      this.closeAppointmentForm()
    })
    
  }

}
