class Node {
    constructor(dato, siguiente, anterior){
        this.dato = dato;
        this.siguiente = siguiente;
        this.anterior = anterior;
    };

};

class ListaDobleEnlazada {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.tamanio = 0;
    };

    AgregarCabeza(dato){
        const resultNode = new Node(dato, this.cabeza, null);

        if (this.cabeza){
            resultNode.siguiente = this.cabeza;
            this.cabeza.anterior = resultNode;
            this.cabeza = resultNode;

        }else {
            this.cabeza = resultNode;
            this.cola = resultNode;
        };
        this.tamanio++;
    };

    AgregarCola(dato){
        const resultNode = new Node(dato, null, this.cola);

        if (this.cola){
            resultNode.anterior = this.cola;
            this.cola.siguiente = resultNode;
            this.cola = resultNode;

        }else {
            this.cola = resultNode;
            this.cabeza = resultNode;
        };
        this.tamanio++;
    };

    AgregarA(dato, index){
        if (index < 0 || index > this.tamanio){
            return null;
        };

        const newNode = new Node(dato, null, null);
        let actual = this.cabeza;
        let anterior;

        if (index === 0){
            newNode.siguiente = actual;
            actual.anterio = newNode;
            this.cabeza = newNode;
        } else {
            for (let i = 0; i < index; i++){
                anterior = actual;
                actual = actual.siguiente;
            };

            newNode.siguiente = actual;
            newNode.anterior = anterior;
            actual.anterior = newNode;
            anterior.siguiente = newNode;
        
    };
    this.tamanio++;
};

    EliminarCabeza(){
        if (!this.cabeza){
            return null;
        };

        const valueToReturn = this.cabeza.dato;

        if (this.cabeza === this.cola){
            this.cabeza = null;
            this.cola = null;
        } else {
            this.cabeza = this.cabeza.siguiente;
            this.cabeza.anterior = null;
        };

        this.tamanio--;
        return valueToReturn;

    };

    EliminarCola(){
        if (!this.cola){
            return null;
        };

        const valueToReturn = this.cola.dato;

        if (this.cabeza === this.cola){
            this.cabeza = null;
            this.cola = null;
        } else {
            this.cola = this.cola.anterior;
            this.cola.siguiente = null;
        };

        this.tamanio--;
        return valueToReturn;

    };

    EliminarDato(dato){
        let actual = this.cabeza;
        let anterior = null;
        
        while(actual !== null){
            if(actual.dato === dato){
                if(!anterior){
                   return this.EliminarCabeza();
                } else if (!actual.siguiente) {
                   return this.EliminarCola();
                } else {
                    anterior.siguiente = actual.siguiente;
                    actual.siguiente.anterior = anterior;
                };

                this.tamanio--;
                return actual.dato;
            };
            anterior = actual;
            actual = actual.siguiente;
        };

        return null;
    };
    
    Imprimir(){
        let actual = this.cabeza;
        let resultado = '';
        while(actual){
            resultado += actual.dato + ' <-> ';
            actual = actual.siguiente;
        };

        return resultado += 'X';
    };

    ImprimirReverso(){
        let actual = this.cola;
        let resultado = '';
        while(actual){
            resultado += actual.dato + ' <-> ';
            actual = actual.anterior;
        };

        return resultado += 'X';
    };

    TenerTamanio(){
        return this.tamanio;
    };

    isEmpty(){
        return this.tamanio === 0;
    };
};

const listadobleenlazada = new ListaDobleEnlazada();
listadobleenlazada.AgregarCabeza("Juan");
listadobleenlazada.AgregarCabeza("Maria");
listadobleenlazada.AgregarCola("Dennis");
listadobleenlazada.AgregarCola("Javier");
listadobleenlazada.AgregarCabeza("Alejandro");
console.log(listadobleenlazada.Imprimir());