import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService {

  constructor(private http: HttpClient) { }

  get(dados: any) {
    return this.http.get('/requisicao', {
      params: {
        _dados: JSON.stringify(dados)
      }
    });
  }

  post(dados: any) {
    return this.http.post('/requisicao', dados);
  }
}
