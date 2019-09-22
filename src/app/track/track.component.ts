import { Component, OnInit, Input } from '@angular/core';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  @Input() song
  @Input() album
  @Input() artiste
  audio = new Audio()
  duration;

  constructor(private music: MusicService) { }

  ngOnInit() {
    this.audio.src = this.song.url;
    this.audio.load();
    this.audio.onloadedmetadata = () => {
      this.duration = this.audio.duration
    }
  }

  sendMusicPlay(){
    this.music.track.next(this.song)
  }
}
