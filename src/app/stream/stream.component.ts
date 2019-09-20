import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {

  catalog

  constructor(private data:DataService) { }

  ngOnInit() {
    this.data.getApi('stream').subscribe((res:any)=>{
      this.catalog = res
      console.dir(this.catalog)
    })
  }

}
