import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common'

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  //Osserva gli eventi sulla route tracks, restituisce la ParamMap che contiene tutti i
  //parametri passati all’url
  routeObs: Observable<ParamMap>;

  artist: Object; //Qui salverò la traccia selezionata
  albums: Object[];
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
    let artistID = params.get('id');

    this.spotifyServiceObs = this.service.getArtist(artistID);
    this.spotifyServiceObs.subscribe((data) => this.artist = data)

    this.spotifyServiceObs = this.service.getArtistAlbums(artistID);
    this.spotifyServiceObs.subscribe((data: Object[]) => { this.albums = data; console.log(this.albums) })
  }

  back(): void {
    this.location.back();
  }

}
