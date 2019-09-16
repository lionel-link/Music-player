import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'music';
  constructor(private data:DataService)
  {}
  ngOnInit(): void {
    let id = localStorage.getItem('id')
    let token = localStorage.getItem('token')
    this.data.postApi('logged', { id: id, token: token }).subscribe((res: any) => {
      if (res.error == false) {
        this.data.logged.next(true)
        this.data.userName.next(res)
      }
    })
  }
 
}
