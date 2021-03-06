import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { ItemUserComponent } from './item-user/item-user.component';
import { ItemMenuComponent } from './item-menu/item-menu.component';
import { PlayerComponent } from './player/player.component';
import { SearchComponent } from './search/search.component';
import { TopComponent } from './top/top.component';
import { StreamComponent } from './stream/stream.component';
import { LikeComponent } from './like/like.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { MusicProgressComponent } from './music-progress/music-progress.component';
import { TrackComponent } from './track/track.component';

const mesRoutes = [
  { path: '', component: StreamComponent },
  { path: 'top', component: TopComponent },
  { path: 'like', component: LikeComponent },
  { path: 'playlist', component: PlaylistComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    SingupComponent,
    ItemUserComponent,
    ItemMenuComponent,
    PlayerComponent,
    SearchComponent,
    StreamComponent,
    TopComponent,
    LikeComponent,
    PlaylistComponent,
    MusicProgressComponent,
    TrackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(mesRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  entryComponents: [LoginComponent, SingupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
