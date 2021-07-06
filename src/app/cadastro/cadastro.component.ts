import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SituacaoPaginaProduto } from '../enums/SituacaoPaginaProduto.model';

import { Produto } from './../Objetos/Produto'
import { ProdutoService } from './../service/produto.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  produto: Produto ;
  textoBotao: string ;
  produtoForm: FormGroup;
  situacaoAtual:SituacaoPaginaProduto;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private prodService:ProdutoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.inicializarProduto();
    this.incializarForm()
    this.activatedRoute.params.subscribe(parametros =>{
      if(parametros['id']){
        this.situacaoAtual = SituacaoPaginaProduto.values().EDITAR
        this.buscarProduto(parametros['id']);
      }else {
        this.situacaoAtual = SituacaoPaginaProduto.values().CADASTRAR
      }
    })
  }

  inicializarProduto = () => {
    this.produto = new Produto(0,'',0)
  }

  incializarForm = ()  => {
    debugger
    if(this.produto) {
      this.produtoForm = this.formBuilder.group({
        nome: [this.produto.nome , Validators.required],
        preco: [this.produto.preco, [Validators.required, Validators.min(0.01)]]
      });
    }
  }

  buscarProduto = (id:any) => {
    this.prodService.listarItem(id)
      .subscribe(produto => {
        this.produto = produto
        this.incializarForm()
      })
  }

  submit = () => {
    if (this.produtoForm.invalid){
      return;
    }
    this.produto.nome = this.getFormValueField('nome');
    this.produto.preco = this.getFormValueField('preco')
    if( this.situacaoAtual.id == SituacaoPaginaProduto.values().CADASTRAR.id) {
      this.adicionar();
    } else {
      this.editar();
    }
  }

  adicionar = ()=>{
    this.prodService.adicionarItem(this.produto)
    .subscribe(
        success => this.navegar('home'),
        error =>console.log("Deu algum erro"),
        ()=> console.log('Requisição Completa')
    );
    
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

  getFormValueField = (field:string) => {
    return this.produtoForm.value[field]
  }

}