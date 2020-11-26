import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Dichiaro che il servizio è iniettabile agli altri componenti a partire dal componente root
@Injectable({
    providedIn: 'root'
})
export class SpotifyService {
    //url per oauth: https://developer.spotify.com/console/get-search-item/
    //Ottengo il modulo HttpClient
    constructor(private http: HttpClient) { }

    searchTrack(query: string) {
    const url = `https://api.spotify.com/v1/search?q=${query}&type=track`;
    const headers = new HttpHeaders({
        Authorization:
        'Bearer BQBUtyBQfBdcHayWtQrGita0PH0Kd1-eKI4rocFEWSoWVm-HMOD3HUncavkcSnrihz3cLJ3u2R5aFOXUuAK05tR23wIDV_CFEe9zZdzNZvgusxvt3tykdK0nhK5B7XUcxyDPp2MXJWiMQR7xgdwmfiLSFXi48_8'
    });

    let obsTracks = this.http.get(url, { headers });
    return obsTracks;
    //Ritorno un observable ai componenti che richiedono il servizio
    }
}
