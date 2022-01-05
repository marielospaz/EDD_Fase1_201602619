class NodoAvl{
    constructor(valor){
        this.Valor=valor;
        this.Altura=0;
        this.left=this.right=null;
    }
}
class AvlTree{
    constructor(){
        this.root=null;
        this.contador=0;
    }
    
    insertar(valor){
        this.root=this._insert(valor,this.root);
    }
    _insert(dato,nodo){
        if(nodo==null){
            return new NodoAvl(dato);
        }else{
            if (dato < nodo.Valor){
                nodo.left=this._insert(dato,nodo.left);
                let balance = Number(this.height(nodo.right)-this.height(nodo.left));
                if(balance==-2){
                    if(dato< nodo.left.Valor){
                        //condicion IZquierda-Izquierda
                        nodo = this.RotarIzq(nodo);
                    }else{
                        //condicion Derecha Izquierda
                        nodo=this.RotarDerIzq(nodo);
                    }

                }
            }else if(dato>nodo.Valor){
                nodo.right=this._insert(dato,nodo.right);
                let balance = Number(this.height(nodo.right)-this.height(nodo.left));
                if(balance==2){
                    if(dato>nodo.right.Valor){
                        nodo=this.RotarDer(nodo);
                    }else{
                        nodo=this.RotarIzqDer(nodo);
                    }
                }
            }else{
                nodo.Valor=dato;
            }
        }
        nodo.Altura=1+this.max(this.height(nodo.left), this.height(nodo.right));
        return nodo;
    }

    height(nodo){
        if(nodo!=null){
            return nodo.Altura;
        }else{
            return -1;
        }
    }
    RotarDer(raiz){
        let NewRaiz= raiz.right;
        raiz.right=NewRaiz.left;
        NewRaiz.left=raiz;
        ///nolose
        raiz.Altura=1+this.max(this.height(raiz.left), this.height(raiz.right));
        NewRaiz.Altura=1+this.max(this.height(NewRaiz.right), raiz.Altura);
        return NewRaiz;
    }
    RotarIzq(nodo){
        let NewRaiz=nodo.left;
        nodo.left=NewRaiz.right;
        NewRaiz.right=nodo;
        nodo.Altura=1+this.max(this.height(nodo.left), this.height(nodo.right));
        NewRaiz.Altura=1+this.max(this.height(NewRaiz.left), nodo.Altura);
        return NewRaiz;
    }
    RotarIzqDer(nodo){
        nodo.right=this.RotarIzq(nodo.right);
        return this.RotarDer(nodo);
    }
    RotarDerIzq(nodo){
        nodo.left=this.RotarDer(nodo.left);
        return this.RotarIzq(nodo);
    }
    max(A1,A2){
        if(A1>=A2){return A1;}else{return A2; }
    }

    search(dato){
        if(this._search(dato, this.root)==true){
            console.log("dato encontrado");
        }else{
            console.log("dato no encontrado");
        }
    }
    _search(dato,nodo){
        if(nodo!=null){
            if(nodo.Valor==dato){
                return true;
            }else if(nodo.Valor>dato){
                return this._search(dato,nodo.left);
            }else{
                return this._search(dato, nodo.right);
            }
        }
    }
    print(){
        this._print(this.root);
    }
    _print(nodo){
        if(nodo!=null){
            this._print(nodo.left);
            console.log("Valor: "+nodo.Valor);
            this._print(nodo.right);
        }
    }
    delete(dato){
        this.root=this._delete(this.root,dato);
    }
    _delete(nodo,dato){
        if(nodo==null){
            return nodo;
        }else if(dato<nodo.Valor){
            nodo.left=this._delete(nodo.left,dato);
        }else if(dato>nodo.Valor){
            nodo.right=this._delete(nodo.right,dato);
        }else{
            if(nodo.left==null){
                let temp=nodo.right;
                nodo=null;
                return temp;
            }else if(nodo.right==null){
                let temp=nodo.left;
                nodo=null;
                return temp;
            }
            let temp=this.getMinNodo(nodo.left);
            nodo.Valor=temp.Valor;
            nodo.left=this._delete(nodo.left,temp.Valor);
            nodo.right=this._delete(nodo.right,temp.Valor);
        }
        if(nodo==null){
            return nodo;
        }
        nodo.Altura=1+this.max(this.getAltura(nodo.left),this.getAltura(nodo.right)); 
        let balance=this.getbalance(nodo);
        //balanceo Caso#1 LL
        if(balance>1 && this.getbalance(nodo.left)>=0){
            return this.rightRotar(nodo);
        }
        //balanceo Caso#2 RR
        if(balance<-1 && this.getbalance(nodo.right)<=0){
            return this.leftRotar(nodo);
        }
        //balanceo Caso#3 LR
        if(balance>1 && this.getbalance(nodo.left)<0){
            nodo.left=this.leftRotar(nodo.left);
            return this.rightRotar(nodo);
        }
        //balanceo Caso#4 RL
        if(balance<-1 && this.getbalance(nodo.right)>0){
            nodo.right=this.rightRotar(nodo.right);
            return this.leftRotar(nodo);
        }
        return nodo;
    }

    leftRotar(nodo){
        let right=nodo.right;
        let left=right.left;
        right.left=nodo;
        nodo.right=left
        nodo.Altura=this.max(this.getAltura(nodo.left),this.getAltura(nodo.right))+1;
        right.Altura=this.max(this.getAltura(right.left),nodo.Altura)+1;
        return  right;
    }
    rightRotar(nodo){
        let left=nodo.left;
        let right=left.right;
        left.right=nodo;
        nodo.left=right;
        nodo.Altura=this.max(this.getAltura(nodo.left),this.getAltura(nodo.right))+1;
        left.Altura=this.max(this.getAltura(left.left),nodo.Altura)+1;
        return left;
    }
    getbalance(root){
        if(root==null){
            retun -1
        }else{
            return this.getAltura(root.left)-this.getAltura(root.right);
        }
    }

    getAltura(nodo){
        if(nodo==null){
            return -1;
        }else{
            return nodo.Altura;
        }
    }

    getMinNodo(nodo){
        if(nodo==null || nodo.right==null){
            return nodo;
        }else{
            return this.getMinNodo(nodo.right);
        }

    }
    search(dato){
        if(this._search(dato,this.root)==true){
            console.log("Dato Encontrado");
        }else{
            console.log("Dato No Encontrado");
        }
    }
    _search(dato,nodo){
        if(nodo!=null){
            if(nodo.Valor==dato){
                return true;
            }else if(nodo.Valor>dato){
                return this._search(dato,nodo.left);
            }else{
                return this._search(dato,nodo.right);
            }
        }else{
            return false;
        }
    }
    graficar(){
        let cadena = "digraph arbol {\n"
        if(this.root!=null){
            cadena += this.listar(this.root);
            cadena += "\n";
            cadena += this.enlazar(this.root);
        }
        cadena += "}";
        //console.log(cadena);
        return cadena;
    }
    listar(raiz_actual){
        if(raiz_actual!=null){
            let cadena = "n"+(raiz_actual.Valor)+"[label= \""+(raiz_actual.Valor)+"\"];\n";
            cadena += this.listar(raiz_actual.left);
            cadena += this.listar(raiz_actual.right);
            return cadena;
        }else{
            return "";
        }
    }
    enlazar(raiz_actual){
        let cadena ="";
        if(raiz_actual!=null){
            if(raiz_actual.left!=null){
                cadena+= "n"+(raiz_actual.Valor)+" -> n"+(raiz_actual.left.Valor)+"\n";
            }
            if(raiz_actual.right!=null){
                cadena+= "n"+(raiz_actual.Valor)+" -> n"+(raiz_actual.right.Valor)+"\n";
            }
            cadena += this.enlazar(raiz_actual.left)
            cadena += this.enlazar(raiz_actual.right)
        }
        return cadena;
    }

}

/*const arbol=new AvlTree();
arbol.insertar(25);
arbol.insertar(15);
arbol.insertar(30);
arbol.insertar(8);
arbol.insertar(10);
arbol.insertar(5);
arbol.insertar(28);
arbol.insertar(27);
arbol.insertar(40);
arbol.print();
arbol.delete(10);
//arbol.delete(10)
arbol.print();
//arbol.delete(30);
//arbol.insertar(50);
//arbol.insertar(100);
//arbol.print();
arbol.graficar()*/
