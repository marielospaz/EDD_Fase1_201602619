class Nodo{
    constructor(valor){
        this.Valor=valor;
        this.next=null;
    }
};
class ListaSimple{
    constructor(){
        this.primero=null;
        this.ultimo=null;
        this.size=0;
    };

    insert(valor){
        const nuevo=new Nodo(valor);
        if (!this.primero){
            this.primero=nuevo;
            this.primero.next=null;
            this.ultimo=nuevo;
        }else{
            this.ultimo.next=nuevo;
            nuevo.next=null;
            this.ultimo=nuevo
        }
        this.size++;
        console.log("Nodo Ingresado");
    }

    desplegar(){
        let actual=this.primero;
        let dato='';
        if(this.primero!=null){
            while(actual!=null){
                dato+="["+actual.Valor+"] -> ";
                actual=actual.next;
            }
            dato+="[NULL]";
            return dato;
        }else{
            return "lista vacia";
        }
    }

    buscar(busca){
        let actual= this.primero;
        let encontrado=false;

        while(actual!=null && encontrado!=true){
            if (actual.Valor==busca){
                encontrado=true;
            }
            actual=actual.next;
        }
        if(encontrado==true){
            return true;
        }else{
            return false;
        }
    };

    modificar(busca, dato){
        let actual= this.primero;
        let encontrado=false;

        while(actual!=null && encontrado!=true){
            if (actual.Valor==busca){
                actual.Valor=dato;
                encontrado=true;
            }
            actual=actual.next;
        }
        if(encontrado==true){
            console.log("Dato Modificado");
        }else{
            console.log("Dato no encontrado");
        }
    };

    eliminar(dato){
        let actual=this.primero;
        let auxiliar=null;
        let encontrado=false;
        if(this.primero!=null){
            while(actual!=null && encontrado!=true){
                if(actual.Valor==dato){
                    if(actual==this.primero){
                        this.primero=this.primero.next;
                    }else if(actual==this.ultimo){
                        auxiliar.next=null;
                        this.ultimo=auxiliar
                    }else{
                        auxiliar.next=actual.next;
                    }
                    encontrado=true;
                }
                auxiliar=actual;
                actual=actual.next;
            }
           // delete(auxiliar);

            if(encontrado==true){
                console.log("El nodo fue eliminado");
            }else{
                console.log("El nodo no Existe");
            }
        }else{
            console.log("La lista se encuentra Vacia");
        }
    }

    graficar(){
        let graph="digraph R {\n\t";
        graph+="rankdir=LR\n\t";
        graph+="node [style=rounded]\n\t";        
        let actual= this.primero;
        let contador=0;
        
        while(actual!=null){
            graph+="\tnode"+(contador)+"[shape=box, label=\""+(actual.Valor)+"\"]\n";
            contador++;
            actual=actual.next;
        }
        for(var i=0;i<contador;i++){
            if(((contador-1)-i)==0){
                continue;
            }else{
                graph+="\tnode"+(i)+" -> node"+(i+1)+";\n";
            }
        }
        graph+="\n\t}";
        
        return graph;
    }
}

/*const lista =new ListaSimple();
lista.insert(1);
lista.insert(2);
lista.insert(3);
lista.insert(4);
console.log(lista.desplegar());
lista.modificar(2,10);
console.log(lista.desplegar());
lista.insert(8);
console.log(lista.desplegar());
lista.eliminar(1);
console.log(lista.desplegar());
console.log(lista.buscar(10));
lista.graficar();*/