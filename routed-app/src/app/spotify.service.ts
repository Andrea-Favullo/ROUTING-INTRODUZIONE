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
        'Bearer BQAG_b-_7yC6B65CxAGZmFg2GGsR28P8US7j9BYp0GjsvHiaIEZ5zz48NcGMwa8pTeE7pPSTdF6ss3VjIHLg_9_WJ5ZdLpW05HtO91CeY8ATB05W71p1bgd9vTuwIA3qELiXrPesEeD8sMNvnJLN-F0l3Eu_kk0'
    });

    let obsTracks = this.http.get(url, { headers });
    return obsTracks;
    //Ritorno un observable ai componenti che richiedono il servizio
    }
}
