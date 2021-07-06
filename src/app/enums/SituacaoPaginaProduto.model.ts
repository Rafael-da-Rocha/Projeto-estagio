export class SituacaoPaginaProduto {

    id: number;
    textoBotao:string;


    static values() {
        return {
            CADASTRAR: {
                textoBotao:'Adicionar',
                id:1
            },
            EDITAR: {
                textoBotao:'Modificar',
                id:2
            }
        }
    }

}