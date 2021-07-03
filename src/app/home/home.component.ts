import { Component, OnInit,TrackByFunction } from '@angular/core';
import { Router} from '@angular/router'

import { Produto } from '../Objetos/Produto';
import { ProdutoService } from './../service/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  prod: any
  produto: Array<Produto> = [ ];
  carregarLoading: boolean = false

  placements = ['top', 'left', 'right', 'bottom'];
  popoverTitle = 'Deletar';
  popoverMessage = 'Você tem certeza que deseja deletar este item?';
  confirmClicked = false;
  cancelClicked = false;
  trackByValue: TrackByFunction<string> = (index, value) => value;

  constructor(private produtoService: ProdutoService, private router: Router) { }

  ngOnInit(): void {

    this.produtoService.listar().subscribe((prods:Array<Produto> ) =>{
      setTimeout(() => {
        this.produto = prods
        this.carregarLoading = true        
      }, 100);
    })
  }

  excluirItem = (id: any)=>{
    this.produtoService.excluirItem(id).subscribe(
      success => this.router.navigate(['home']),
      error =>console.log("Deu algum erro"),
      ()=> console.log('Requisição Completa')
 
    )
    this.ngOnInit()
  }
  editar = (id:any) =>{
    this.router.navigate(['cadastro',id])
  }
  cadastro=()=>{
    this.router.navigate(['cadastro'])
  }
}
