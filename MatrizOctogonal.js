class NodoMatrizOcta{
    constructor(x,y,dato){
        this.x=x;
        this.y=y;
        this.Dato=dato;
        this.arriba=null;
        this.abajo=null;
        this.izquierda=null;
        this.derecha=null;
    }
}
class NodoCabecera{
    constructor(tipo,indice){
        this.tipo=tipo;
        this.indice=indice;
        this.siguiente=null;
        this.derecha=null;
        this.abajo=null;
    }
}
class NodoRaiz{
    constructor(){
        this.NodoFilas=null;
        this.NodoColumnas=null;
    }
}
class MatrizOrtogonal{
    constructor(){
        this.NodoRaiz=null;
    }
    insertar_nodoFila(nodo){
        let filaTemporal=this.NodoRaiz.NodoFilas;
        while(filaTemporal.indice!=nodo.y){
            filaTemporal=filaTemporal.siguiente;
        }
        if(filaTemporal.derecha==null){
            nodo.derecha=filaTemporal.derecha;
            filaTemporal.derecha=nodo;
        }else if(filaTemporal.derecha.x>=nodo.x){
            nodo.derecha=filaTemporal.derecha;
            filaTemporal.derecha=nodo;
        }else{
            let actual=filaTemporal.derecha;
            while(actual.derecha!=null && actual.derecha.x<nodo.x){
                actual=actual.derecha;
            }
            nodo.derecha=actual.derecha;
            actual.derecha=nodo;
        }
    }
    insert_nodoColumna(nodo){
        let columnaTemporal=this.NodoRaiz.NodoColumnas;
        while(columnaTemporal.indice!=nodo.x){
            columnaTemporal=columnaTemporal.siguiente;
        }
        if (columnaTemporal.abajo==null){
            nodo.abajo=columnaTemporal.abajo;
            columnaTemporal.abajo=nodo;
        }else if(columnaTemporal.abajo.y>= nodo.y){
            nodo.abajo=columnaTemporal.abajo;
            columnaTemporal.abajo=nodo;
        }else{
            let actual=columnaTemporal.abajo;
            while(actual.abajo!=null&& actual.abajo.y < nodo.y){
                actual=actual.abajo;
            }
            nodo.abajo=actual.abajo;
            actual.abajo=nodo;
        }
    }
    insert_cabecera(nodo, indice,tipo){
        let filaTemporal=nodo;
        if(filaTemporal.indice>indice){
            let newCabeza=new NodoCabecera(tipo,indice);
            newCabeza.siguiente=this.NodoRaiz.NodoFilas;
            this.NodoRaiz.NodoFilas=newCabeza
        }else{
            let actual=filaTemporal;
            while(actual.siguiente!=null && actual.siguiente.indice<=indice){
                actual=actual.siguiente;
            }
            if (actual.indice != indice){
                let newCabeza=new NodoCabecera(tipo, indice)
                newCabeza.siguiente=actual.siguiente;
                actual.siguiente=newCabeza;
            }
        }
    }
    insertar(x,y,dato){
        let Nodo=new NodoMatrizOcta(x,y,dato);
        if (this.NodoRaiz==null){
            this.NodoRaiz=new NodoRaiz();
            this.NodoRaiz.NodoColumnas=new NodoCabecera("Columna",x);
            this.NodoRaiz.NodoFilas=new NodoCabecera("Fila",y);
            this.NodoRaiz.NodoColumnas.siguiente=null;
            this.NodoRaiz.NodoFilas.siguiente=null;
            this.NodoRaiz.NodoColumnas.abajo=Nodo;
            this.NodoRaiz.NodoFilas.derecha=Nodo;
        }else{
            let NodoAuxiliar=this.NodoRaiz;
            this.insert_cabecera(NodoAuxiliar.NodoFilas,y,"Filas");
            NodoAuxiliar=this.NodoRaiz;
            this.insert_cabecera(NodoAuxiliar.NodoColumnas,x,"Columna");
            this.insertar_nodoFila(Nodo);
            this.insert_nodoColumna(Nodo);
        }

    }
    buscar(x,y){
        let nodo=this.NodoRaiz.NodoColumnas;
        while(nodo !=null){
            let NodoAuxiliar=nodo.abajo;
            while(NodoAuxiliar !=null){
                if (NodoAuxiliar.x==x && NodoAuxiliar.y==y){
                    return true;
                }  
                NodoAuxiliar=NodoAuxiliar.abajo;
            }
            nodo=nodo.siguiente;            
        }
        return false
    }

    print_fila() {
        
        let nodo = this.NodoRaiz.NodoFilas;
        while (nodo != null) {
            let nodo_temp = nodo.derecha
            while (nodo_temp != null) {
                console.log("fila:"+(nodo_temp.x)+" , Columna:"+(nodo_temp.y));
                nodo_temp = nodo_temp.derecha;
            }
            nodo = nodo.siguiente;
        }
    }
    print_columna() {
        let nodo = this.NodoRaiz.NodoColumnas;
        while (nodo != null) {
            let nodo_temp = nodo.abajo
            while (nodo_temp != null) {
                console.log("fila:"+(nodo_temp.x)+" , Columna:"+(nodo_temp.y));
                nodo_temp = nodo_temp.abajo;
            }
            nodo = nodo.siguiente;
        }
    }
    graficar() {
        let grafo = "digraph";
        grafo += "{\nnode[shape=record];\n";
        grafo += "graph[pencolor=transparent];\n";
        //grafo+=str("rankdir=LR;\n")
        grafo += "node [style=filled];\n";
        let nodo = this.NodoRaiz.NodoFilas;

        for (var y = 1; y <= 11; y++) {
            let nodo_temp = nodo.derecha
            for (var x = 1; x <= 11; x++) {
                if (this.buscar(x, y)) {
                    grafo += "p" + (x) + "" + "" + (y) + "[label=\"{<data>" + (x) + "," + (y) + "|<next>}\" pos=\"" + (x) + "," + (10 - y) + "!\"];\n";
                    if (nodo_temp.derecha != null) {
                        let nodo_2 = nodo_temp;
                        nodo_temp = nodo_temp.derecha;
                        grafo += "p" + (nodo_2.x) + "" + "" + (nodo_2.y) + "->" + "p" + (nodo_temp.x) + "" + "" + (nodo_temp.y) + "[dir=both];\n";
                    }
                } else {
                    continue;
                }
                if (nodo.siguiente != null) {
                    if (nodo.siguiente.indice == y + 1) {
                        nodo = nodo.siguiente;
                    }

                }

            }

        }
        nodo = this.NodoRaiz.NodoColumnas;
        for (var x = 1; x <= 11; x++) {
            let nodo_temp = nodo.abajo;
            for (var y = 1; y <= 11; y++) {
                if (this.buscar(x, y)) {
                    if (nodo_temp.abajo != null) {
                        let nodo_2 = nodo_temp;
                        nodo_temp = nodo_temp.abajo;
                        grafo += "p" + (nodo_2.x) + "" + "" + (nodo_2.y) + "->" + "p" + (nodo_temp.x) + "" + "" + (nodo_temp.y) + "[dir=both];\n";
                    }
                } else {
                    continue;
                }
                if (nodo.siguiente != null) {
                    if (nodo.siguiente.indice == x + 1) {
                        nodo = nodo.siguiente;
                    }
                }
            }
        }
        grafo += "}\n";
        console.log(grafo);
    }

}
nueva_matriz = new MatrizOrtogonal();

nueva_matriz.insertar(2,5,"nuevo nodo");
nueva_matriz.insertar(2,3,"nuevo nodo");
nueva_matriz.insertar(2,4,"nuevo nodo");
nueva_matriz.insertar(2,9,"nuevo nodo");
nueva_matriz.insertar(3,7,"nuevo nodo");
nueva_matriz.insertar(3,1,"nuevo nodo");
nueva_matriz.insertar(3,8,"nuevo nodo");
nueva_matriz.insertar(3,9,"nuevo nodo");
nueva_matriz.insertar(6,6,"nuevo nodo");
nueva_matriz.insertar(6,1,"nuevo nodo");
nueva_matriz.insertar(6,5,"nuevo nodo");
nueva_matriz.insertar(6,9,"nuevo nodo");
nueva_matriz.insertar(8,3,"nuevo nodo");
nueva_matriz.insertar(8,4,"nuevo nodo");
nueva_matriz.insertar(9,8,"nuevo nodo");
nueva_matriz.insertar(9,9,"nuevo nodo");
nueva_matriz.insertar(8,1,"nuevo nodo");
nueva_matriz.insertar(10,10,"nuevo nodo");
nueva_matriz.insertar(10,1,"nuevo nodo");
nueva_matriz.graficar();
//let nodo = nueva_matriz.NodoRaiz.NodoColumnas;
    