import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-item-user',
  templateUrl: './item-user.component.html',
  styleUrls: ['./item-user.component.css']
})
export class ItemUserComponent implements OnInit {
  userName = {}
  logged = false
  @ViewChild('contentPopUp', { static: false, read: ViewContainerRef }) contentPopUp: ViewContainerRef

  constructor(private data: DataService, private viewContainerRef: ViewContainerRef, private resolver: ComponentFactoryResolver, router: Router) { }


  ngOnInit() {
    this.data.popUp.subscribe(x => this.contentPopUp.clear())
    this.data.userName.subscribe(x => this.userName = x)
    this.data.logged.subscribe(x=>{this.logged = x})
  }

  logIn () {
    this.contentPopUp.clear()
    const factory = this.resolver.resolveComponentFactory(LoginComponent)
    const component = this.contentPopUp.createComponent(factory)
  }

  logOut() {
    let id = localStorage.getItem('id')
    this.data.postApi('logout', {"id":id}).subscribe((res:any)=>{
      console.dir(res)
      if (res.error == false){
        localStorage.setItem('id',"")
        localStorage.setItem('token',"")
        this.userName = {}
        this.logged = false
      }
    })
  }
}
