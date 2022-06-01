import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lead-search',
  templateUrl: './lead-search.component.html',
  styleUrls: ['./lead-search.component.css', '../common-styles.css']
})
export class LeadSearchComponent implements OnInit {
  lead_uname: any;
  lead_name: any;

  constructor(
    public userService : UserDetailsService,
    public router:Router,
    private route: ActivatedRoute
  ) { }

  leads: any
  public meet_lead_uname1: String=''
  public meet_lead_name1: String=''

  ngOnInit(): void {
    
    this.applyFilter()
    
  }

  applyFilter()
  {
    
    
    {
      this.userService.getAllDoctors().subscribe((data : any)=>{
        if(data.status ==='success')
        {
          this.leads = data.data
        }
      })
    }
  }

  searchLead()
  {
    var search_srting = document.getElementById('search-bar') as HTMLInputElement
    var spec = document.getElementById('specializations-filter') as HTMLSelectElement
    this.userService.filterAndSearch(spec.value, search_srting.value).subscribe((data:any)=>{
      if(data.status==='success')
      {
        this.leads = data.data
      }
      else
      {
        console.log(data);
        
      }
    })
  }

  getAppointmentView(uname: any, name: any)
  {
    var div = document.getElementById('appointment-view') as HTMLDivElement
    div.style.display = 'inherit'
    this.lead_uname = uname 
    this.lead_name = name
    var not_popup = document.getElementsByClassName('not-popup')
    for(let i=0; i<not_popup.length; i++)
    {
      (not_popup[i] as HTMLDivElement).style.filter = 'blur(10px)'
    }
  }

}
