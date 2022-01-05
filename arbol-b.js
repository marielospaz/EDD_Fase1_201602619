// Arbol B de orden 5

//Todo: nodoB, clase responsable del diseño de los nodos de un arbol b
class nodoB{
    constructor(dato){
        this.dato = dato;
        //Todo: Apuntadores de lista - tipo nodoB
        this.siguiente = null; 
        this.anterior = null;
        //Todo: Apuntadores de arbol - tipo pagina
        this.izq = null;
        this.der = null;
    }
}

//Todo: Lista_nodoB, clase responable del diseño de una lista ordenada para almacenar los valores
class lista_nodoB{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.size=0;
    }

    insertar(nuevo){
        if(this.primero == null){
            this.primero = nuevo;
            this.ultimo = nuevo;
            this.size++;
            return true;
        }else{
            if(this.primero == this.ultimo){ // solo hay un dato en la lista
                if(nuevo.dato < this.primero.dato){
                    nuevo.siguiente = this.primero;
                    this.primero.anterior = nuevo;
                    //cambiar punteros de paginas
                    this.primero.izq = nuevo.der;

                    this.primero = nuevo;
                    this.size++;
                    return true;
                }else if(nuevo.dato> this.ultimo.dato){
                    this.ultimo.siguiente = nuevo;
                    nuevo.anterior = this.ultimo;
                    //cambiar punteros de paginas
                    this.ultimo.der = nuevo.izq;

                    this.ultimo = nuevo;
                    this.size++;
                    return true;
                }else{ // el dato es igual al primero
                    console.log("Ya existe un dato con ese valor en la lista");
                    return false;
                }
            }else{ //hay mas de un dato
                if(nuevo.dato < this.primero.dato){
                    nuevo.siguiente = this.primero;
                    this.primero.anterior = nuevo;
                    //cambiar punteros de paginas
                    this.primero.izq = nuevo.der;

                    this.primero = nuevo;
                    this.size++;
                    return true;
                }else if(nuevo.dato> this.ultimo.dato){
                    this.ultimo.siguiente = nuevo;
                    nuevo.anterior = this.ultimo;
                    //cambiar punteros de paginas
                    this.ultimo.der = nuevo.izq;

                    this.ultimo = nuevo;
                    this.size++;
                    return true;
                }else{
                    let aux = this.primero;
                    while(aux != null){
                        if(nuevo.dato < aux.dato){
                            nuevo.siguiente = aux;
                            nuevo.anterior = aux.anterior;
                            // cambiar los punteros de las paginas
                            aux.izq= nuevo.der;
                            aux.anterior.der = nuevo.izq;
                            //******************************* 
                            aux.anterior.siguiente = nuevo;
                            aux.anterior = nuevo;
                            this.size++;
                            return true;
                        }else if(nuevo.dato == aux.dato){
                            console.log("Ya existe un dato con ese valor en la lista");
                            return false;
                        }else{
                            aux = aux.siguiente;
                        }
                    }
                }
            }
        }
    }
}

//Todo: Pagina, clase responsable del diseño de las paginas de un arbol b
class pagina{
    constructor(){
        this.raiz = false;
        this.claves_max = 4;
        this.claves_min = 2;
        this.size =0;
        this.claves = new lista_nodoB();
    }

    insertar_EnPagina(nodo){
        if(this.claves.insertar(nodo)){
            this.size = this.claves.size;
            if(this.size < 5){
                return this;
            }else if(this.size == 5){ //dividir pagina
                return this.dividir_pagina(this);
            }
        }
        return null;
    }

    dividir_pagina(pag){
        let temp = pag.claves.primero;
        for(var i=0; i<2;i++){ //ubicarnos en la posicion [2] de la lista (mitad)
            temp = temp.siguiente;
        }

        //pasar valores de la pagina a nodos independientes
        let primero = pag.claves.primero;
        let segundo = pag.claves.primero.siguiente;
        let tercero = temp.siguiente;
        let cuarto = pag.claves.ultimo;

        primero.siguiente = null;
        primero.anterior = null;

        segundo.siguiente = null;
        segundo.anterior = null;

        tercero.siguiente = null;
        tercero.anterior = null;

        cuarto.siguiente = null;
        cuarto.anterior = null;

        temp.siguiente = null;
        temp.anterior = null;

        //** crear nuevas paginas */
        let pag_izquierda = new pagina();
        pag_izquierda.insertar_EnPagina(primero);
        pag_izquierda.insertar_EnPagina(segundo);

        let pag_dercha = new pagina();
        pag_dercha.insertar_EnPagina(tercero);
        pag_dercha.insertar_EnPagina(cuarto);

        temp.izq = pag_izquierda;
        temp.der = pag_dercha;

        return temp;
    }

    es_hoja(pag){
        if(pag.claves.primero.izq==null){
            return true;
        }else{
            return false;
        }
    }
}

//Todo: Clase responsable del diseño del arbol b en general
class Arbol_B{
    constructor(){
        this.raiz = null;
        this.orden =5;
        this.altura =0;
    }

    insertar_nodo(dato){
        let nuevo = new nodoB(dato);
        
        if(this.raiz == null){
            this.raiz = new pagina();
            this.raiz.raiz = true;
            this.raiz = this.raiz.insertar_EnPagina(nuevo);
        }else{
            if(this.altura==0){
                let respuesta = this.raiz.insertar_EnPagina(nuevo);
                if(respuesta instanceof pagina){//Todo: la raiz no se dividio
                    this.raiz = respuesta;
                }else{
                    this.altura++;
                    this.raiz = new pagina();
                    this.raiz = this.raiz.insertar_EnPagina(respuesta);
                }
            }else{ 
                
                //Todo: Ya existe mas de una pagina, hay que recorrer el arbol para insertar el nuevo
                if(this.raiz == null){
                    console.log("la raiz es null ")
                    return;
                }   
                let respuesta = this.insertar_recorrer(nuevo,this.raiz);
                if(respuesta instanceof nodoB){ 
                    //Todo: La raiz se dividio
                    this.altura++;
                    this.raiz = new pagina();
                    this.raiz = this.raiz.insertar_EnPagina(respuesta);
                }else if(respuesta instanceof pagina){
                    this.raiz = respuesta;
                }
            }
        }
    }

    insertar_recorrer(nuevo, pagina_actual){
        if(pagina_actual.es_hoja(pagina_actual)){
            let respuesta = pagina_actual.insertar_EnPagina(nuevo);
            return respuesta;
        }else{
            if(nuevo.dato < pagina_actual.claves.primero.dato){ // va a la izquierda
                let respuesta = this.insertar_recorrer(nuevo,pagina_actual.claves.primero.izq);
                if(respuesta instanceof nodoB){ // la pagina se dividio y el nodo se tiene que insertar en la pagina actual
                    return pagina_actual.insertar_EnPagina(respuesta);
                }else if(respuesta instanceof pagina){
                    pagina_actual.claves.primero.izq = respuesta;
                    return pagina_actual;
                }
            }else if(nuevo.dato > pagina_actual.claves.ultimo.dato){ // va a la derecha porque es mayor al ultimo
                let respuesta = this.insertar_recorrer(nuevo,pagina_actual.claves.ultimo.der);
                if(respuesta instanceof nodoB){ // la pagina se dividio y el nodo se tiene que insertar en la pagina actual
                    return pagina_actual.insertar_EnPagina(respuesta);
                }else if(respuesta instanceof pagina){
                    pagina_actual.claves.ultimo.der = respuesta;
                    return pagina_actual;
                }
            }else{ // va en los apuntadores de los nodos de en medio
                let aux = pagina_actual.claves.primero;

                while(aux != null){
                    if(nuevo.dato < aux.dato){
                        let respuesta = this.insertar_recorrer(nuevo, aux.izq);
                        if(respuesta instanceof nodoB){ // la pagina se dividio y el nodo se tiene que insertar en la pagina actual
                            return pagina_actual.insertar_EnPagina(respuesta);
                        }else if(respuesta instanceof pagina){
                            aux.izq = respuesta;
                            aux.anterior.der = respuesta;
                            return pagina_actual;
                        }
                    }else if(nuevo.dato == aux.dato){
                        return pagina_actual;
                    }else{
                        aux = aux.siguiente;
                    }
                }
            }
        }
        return this;
    }

    //Todo: graficar funcion responsable de graficar enlaces y nodos
    graficar(){
        let cadena="digraph arbolB{\n";
        cadena+="rankr=TB;\n";
        cadena+="node[shape = box,fillcolor=\"azure2\" color=\"black\" style=\"filled\"];\n";
        cadena+= this.graficar_nodos(this.raiz);
        cadena+=  this.graficar_enlaces(this.raiz);
        cadena+="}\n"

        return cadena;
    }

    //Todo: graficar_nodos funcion responsable de graficar cada nodo del arbol b
    graficar_nodos(raiz_actual){
        let cadena="";

        if(raiz_actual.es_hoja(raiz_actual)){
            cadena+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = raiz_actual.claves.primero;
            while(aux!=null){
                contador++;
                cadena+="|{"+JSON.parse(aux.dato).nombre+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+JSON.parse(raiz_actual.claves.primero.dato).nombre+";\n";
            return cadena;
        }else{
            cadena+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = raiz_actual.claves.primero;
            while(aux!=null){
                contador++;
                cadena+="|{"+JSON.parse(aux.dato).nombre+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+JSON.parse(raiz_actual.claves.primero.dato).nombre+";\n";

            //Todo: Recorrer los hicos de cada clave
            aux = raiz_actual.claves.primero;
            while(aux != null){
                cadena+= this.graficar_nodos(aux.izq);
                aux = aux.siguiente;
            }
            cadena+= this.graficar_nodos(raiz_actual.claves.ultimo.der);
            return cadena;
        }   
    }

    //Todo: graficar_enlaces: funcion responsable de graficar los enlaces entre paginas y niveles
    graficar_enlaces(raiz_actual){
        let cadena="";
        if(raiz_actual.es_hoja(raiz_actual)){
            return ""+JSON.parse(raiz_actual.claves.primero.dato).nombre+";\n";
        }else{
            let aux = raiz_actual.claves.primero;
            let contador =0;
            let raiz_actual_txt = JSON.parse(raiz_actual.claves.primero.dato).nombre;
            while(aux != null){
                cadena+= "\n"+raiz_actual_txt+":p"+contador+"->"+this.graficar_enlaces(aux.izq);
                contador++;
                aux = aux.siguiente;
            }
            cadena+="\n"+raiz_actual_txt+":p"+contador+"->"+this.graficar_enlaces(raiz_actual.claves.ultimo.der);
            return cadena;
        }
    }
}
/************************************************************ */

let arbol = new Arbol_B();
arbol.insertar_nodo(5);
arbol.insertar_nodo(1);
arbol.insertar_nodo(7);
arbol.insertar_nodo(3);
arbol.insertar_nodo(13);
arbol.insertar_nodo(8);
arbol.insertar_nodo(35);
arbol.insertar_nodo(14);
arbol.insertar_nodo(10);
arbol.insertar_nodo(9);
arbol.insertar_nodo(12);
arbol.insertar_nodo(17);
arbol.insertar_nodo(22);
arbol.insertar_nodo(25);

arbol.insertar_nodo(100);
arbol.insertar_nodo(150);
arbol.insertar_nodo(220);
arbol.insertar_nodo(325);

console.log(arbol.graficar());