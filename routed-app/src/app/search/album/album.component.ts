import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common'

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  //Osserva gli eventi sulla route tracks, restituisce la ParamMap che contiene tutti i
  //parametri passati all’url
  routeObs: Observable<ParamMap>;

  album: Object; //Qui salverò la traccia selezionata
  tracks: Object[];
  spotifyServiceObs: Observable<Object>;

  //Usiamo la dependency injection per farci mandare i moduli del routing e dello
  //SpotifyService
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SpotifyService,
    private location: Location) { }


  ngOnInit(): void {
    //Ottengo l'observable che notifica le informazioni sulla route attiva
    this.routeObs = this.route.paramMap;
    this.routeObs.subscribe(this.getRouterParam);
  }

  //Ogni volta che viene invocata la route tracks/:id, l'observable richiama questo metodo
  getRouterParam = (params: ParamMap) => {
    let albumID = params.get('id');

    this.spotifyServiceObs = this.service.getAlbum(albumID);
    this.spotifyServiceObs.subscribe((data: Object) => this.album = data)

    this.spotifyServiceObs = this.service.getAlbumTracks(albumID);
    this.spotifyServiceObs.subscribe((data: Object[]) => { this.tracks = data; console.log(this.tracks) })
  }

  back(): void {
    this.location.back();
  }

}
