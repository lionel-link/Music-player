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
  logged
  @ViewChild('contentPopUp',{static:false, read : ViewContainerRef}) contentPopUp: ViewContainerRef

  constructor(private data: DataService, private viewContainerRef :ViewContainerRef,private resolver:ComponentFactoryResolver, router: Router) { }


  ngOnInit() {
    this.data.popUp.subscribe(x=>this.contentPopUp.clear())
    this.data.logIn.subscribe(x=>this.logged = x)
    let id = localStorage.getItem('id')
    let token = localStorage.getItem('token')
    this.data.postApi('logged', {id:id, token:token}).subscribe((res:any)=>{
      this.logged = res
      console.dir( this.logged)
    })
  }

  logIn = ()=>{
    this.contentPopUp.clear()
    const factory = this.resolver.resolveComponentFactory(LoginComponent)
    const component = this.contentPopUp.createComponent(factory)
  }
}
