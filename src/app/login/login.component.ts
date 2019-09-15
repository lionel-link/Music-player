import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login
  password
  userName = {nom:"",prenom:""}

  constructor(private fb: FormBuilder, private data:DataService) { }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+\@[a-zA-Z]+\.com|fr$')]],
    password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-_@]{5,15}$')]]
  })

  ngOnInit() {
  }

  logIn = () => {
    this.data.postApi('login',this.loginForm.value).subscribe((res:any)=>{
      if (res){
        localStorage.setItem('id', res.id)
        localStorage.setItem('token', res.token)
        this.userName.nom = res.nom
        this.userName.prenom = res.prenom
        this.data.logIn.next(this.userName)
      }
      else{
        alert("Erreur connection")
      }
    })
  }

  hide(){
    this.data.popUp.next(this.userName)
  }

}
