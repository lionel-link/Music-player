import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';
import { trackModel } from '../Models/track.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  track: trackModel
  audio = new Audio()
  paused = false
  volumeWidth
  

  constructor(private music:MusicService) { }

  ngOnInit() {

    this.music.track.subscribe(t=> {
      this.track = t;
      this.audio.src = this.track.url;
      this.audio.load();
      this.play();
    })
    
    this.volumeWidth = 0;
    
    // this.audio.ontimeupdate = (e) => {
    //   this.duration = this.audio.duration;
    //   this.elapsed = this.audio.currentTime;
    //   this.position = (this.elapsed / this.duration) * 100;
    // }
  }

  play = () => {
    this.audio.play()
    this.paused = true
  }

}
