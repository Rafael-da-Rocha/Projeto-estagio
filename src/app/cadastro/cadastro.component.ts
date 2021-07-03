import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Produto } from './../Objetos/Produto'
import { ProdutoService } from './../service/produto.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  id: any
  produto: Produto =new Produto (0,'', 0)
  textoBotao: string = 'Adicinar' 
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private prodService:ProdutoService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parametros =>{
      if(parametros['id']){
        this.textoBotao = 'Modificar'
        this.id = parametros['id']
        this.prodService.listarItem(this.id).subscribe(prod=>{
          this.produto=prod
         })
      }
    })
  }

  adicionar = ()=>{
    if (this.textoBotao == 'Adicinar'){
      this.prodService.adicionarItem(this.produto).subscribe(
        success => this.navegar('home'),
        error =>console.log("Deu algum erro"),
        ()=> console.log('Requisição Completa'))
      this.navegar('home')
    }else{
      this.editar()
    }
  }

  editar = () =>{
    this.prodService.editarItem(this.produto).subscribe(
      success => this.navegar('home'),
      error =>console.log("Deu algum erro"),
      ()=> console.log('Requisição Completa'))
    
  } 
  navegar =(rota: any)=>{
    this.router.navigate([rota])
  }
  limpar(){
    this.router.navigate([this.router.url])
  }

}
