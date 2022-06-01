import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css', '../common-styles.css']
})
export class ClientProfileComponent implements OnInit {

  constructor(public userService : UserDetailsService) { }

  userType : any
  userData : any
  client_fields: any
  new_user_data:any

  ngOnInit(): void {
    this.userType = localStorage.getItem('USER%TYPE')
    this.userData = JSON.parse(localStorage.getItem('CURRENT%USER') || '{}')
    this.new_user_data = {
      username: this.userData.username,
      name: this.userData.name,
      email: this.userData.email,
      user_role: 'client',
      dob: this.userData.dob,
      gender: this.userData.gender,
      phone: this.userData.phone,
      address: this.userData.address
    }
    this.client_fields = this.userService.client_fields
    
   
  }

  editProfileDiv()
  {
    var data_div = document.getElementsByClassName('profile-data-display')[0] as HTMLDivElement
    data_div.style.display = 'none'
    var edit_div = document.getElementsByClassName("profile-data-edit")[0] as HTMLDivElement
    edit_div.style.display = 'inherit'
  }

  cancelEdit()
  {
    var data_div = document.getElementsByClassName('profile-data-display')[0] as HTMLDivElement
    data_div.style.display = 'inherit'
    var edit_div = document.getElementsByClassName("profile-data-edit")[0] as HTMLDivElement
    edit_div.style.display = 'none'
  }

  saveEdit()
  {
    this.userService.editUserDetails(this.new_user_data).subscribe((data : any)=>{
      this.userData = data._doc
      localStorage.setItem('CURRENT%USER', JSON.stringify(this.userData))
      this.cancelEdit()
    })
  }



}
