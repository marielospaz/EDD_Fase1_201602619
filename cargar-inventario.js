


function cargarInventario(){
    //console.log('dentro de la funcionnnnnn');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
            let arbolB = new Arbol_B();
            let datos = JSON.parse(this.responseText);
            let res= document.querySelector('#res');
            res.innerHTML = '';
            const {productos} = datos;
            if(productos.length > 0) {
                var message = document.getElementById("message");
                message.style.display = "none";
            }
            for(let item of productos){
                console.log(JSON.stringify(item));
               arbolB.insertar_nodo(JSON.stringify(item));  
               res.innerHTML += ` 
               <tr>
               <td>${item.id}</td>
               <td>${item.nombre}</td>
               <td>${item.precio}</td>    
               <td>${item.cantidad}</td>
               </tr>`;   
            }
            imprimirArbolB(arbolB);
        }
    }
    xhttp.open('GET', 'productos.json', true);
    try {
        xhttp.send(); // Here a xmlhttprequestexception number 101 is thrown 
    } catch(err) {
        console.log(err); // This prints "XMLHttprequest error: undefined" in the body.
    }
}

function guardarArbolB(arbolB) {
    localStorage.setItem('arbolB', JSON.stringify(arbolB));
}

function imprimirArbolB(arbolB) {
    var cadena = arbolB.graficar();
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