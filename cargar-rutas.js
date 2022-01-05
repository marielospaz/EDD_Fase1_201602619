function cargarRutas(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let newGrafo = new grafo();
            let datos = JSON.parse(this.responseText);
            let res= document.querySelector('#res');
            res.innerHTML = '';
            const {rutas} = datos;
            if(rutas.length > 0) {
                var message = document.getElementById("message");
                message.style.display = "none";
            }
            for(let item of rutas){
               console.log(JSON.stringify(item));
               newGrafo.insertar(item.nombre);
               res.innerHTML += `
               <tr>
               <td style="padding: 0px;">${item.nombre}</td>
               <td style="padding: 0px;"></td>
               <td style="padding: 0px;"></td>
               </tr>`;
               const { adyacentes } = item;
               let contador = 0; 
               for (let ady of adyacentes) {
                   newGrafo.agregar_adyacente(item.nombre, ady.nombre, ady.distancia);
                   contador += 1;
                res.innerHTML += ` 
                <tr>
                <td style="padding: 0px;"></td>
                <td style="padding: 0px;">${ady.nombre}</td>
                <td style="padding: 0px;">${ady.distancia}</td>
                </tr>`;
               }
            }
            imprimirGrafo(newGrafo);
            recorridoAnchura(newGrafo, "bodega1", "bodega10");
        }
    }
    xhttp.open('GET', 'bodega.json', true);
    try {
        xhttp.send(); // Here a xmlhttprequestexception number 101 is thrown 
    } catch(err) {
        console.log(err); // This prints "XMLHttprequest error: undefined" in the body.
    }
}


function imprimirGrafo(newGrafo) {
    var cadena = newGrafo.graficar();
    console.log(cadena);
    var sample = cadena;
    var options = {
    format: 'png-image-element'
    }
    var viz = new Viz();
    viz.renderSVGElement(sample, options)
    .then(function (element) {
      var main = document.getElementById('main');
      main.appendChild(element);
      main.style.display="block";
    });

}

function recorridoAnchura(newGrafo, idOrigen, idDestino) {
    let visitados = [];
    let buscado = newGrafo.buscar(idOrigen);
    let cola = [buscado];
      
    while(cola.length > 0) {
        var primero = cola.shift();
        if(!visitados.includes(primero)) {
            visitados.push(primero);
            let adyasentes = obtenerAdyacentes(primero);
            for(let i = 0; i < adyasentes.length; i++) {
                cola.push(adyasentes[i]);
            }
            console.log(primero.ponderacion);
            if(primero.id === idDestino) {
                break;
            }            
        }
    }
}

function obtenerAdyacentes(nodo) {
    let adyasentes = [];
    let aux = nodo;
    console.log("-> "+aux.id);
    let aux2 = aux.adyasentes.primero;
    while(aux2 != null){
        console.log("   -"+aux2.id);
        adyasentes.push(aux2);
        aux2 = aux2.siguiente;
    }
    let ponderacionMenor = obtenerLaPonderacionMenor(adyasentes.map(item => item.ponderacion));
    return [adyasentes.find(ady => ady.ponderacion == ponderacionMenor)];
    //return adyasentes;
}


function obtenerLaPonderacionMenor(numeros) {
    return Math.min(...numeros); 
}

