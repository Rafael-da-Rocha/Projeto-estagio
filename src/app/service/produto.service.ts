import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

import { Produto } from '../Objetos/Produto';



@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API =`${environment.API}produtos`
  constructor(private $http : HttpClient) { }

  listar(){
    return this.$http.get<Produto[]>(`${this.API}`)
  }
  excluirItem(id: any){
    return this.$http.delete(`${this.API}/${id}`)
  }
  adicionarItem(prod: Produto){
    return this.$http.post(this.API, prod)
  }
  editarItem(prod: Produto){
    return this.$http.put(`${this.API}/${prod.id}`, prod)
  }
  listarItem(id: any){
    return this.$http.get<Produto>(`${this.API}/${id}`)
  }
}
