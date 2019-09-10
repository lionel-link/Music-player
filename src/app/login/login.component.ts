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

  constructor(private fb: FormBuilder, private data:DataService) { }

  loginForm: FormGroup = this.fb.group({
    login: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+@[a-zA-Z]/.{com|fr}$')]],
    password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-_@]+$')]]
  })

  ngOnInit() {
  }

  logIn = () => {
  }

}