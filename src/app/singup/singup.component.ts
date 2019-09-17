import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  constructor(private fb:FormBuilder, private data:DataService) { }

  formSignUp = this.fb.group({
    nom: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{5,15}$')]],
    prenom: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{5,15}$')]],
    email: ['',[Validators.required, Validators.pattern('^[a-zA-Z]+\@[a-zA-Z]+\.com|fr$')]],
    password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-_@]{5,15}$')]]
  })

  ngOnInit() {
  }

  signUp(){
    this.data.postApi('signup',{nom:this.formSignUp.value.nom, prenom:this.formSignUp.value.prenom, email:this.formSignUp.value.email, password:this.formSignUp.value.password}).subscribe((res:any)=>{
      if(res.error == false){
        alert('connected')
        this.data.popUp.next(true)
      }
    })
  }
  hide(){
    this.data.popUp.next(true)
  }
}
