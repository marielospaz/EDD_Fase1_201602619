function cargarVentas(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let tablaHash = new hash();
            let datos = JSON.parse(this.responseText);
            let res= document.querySelector('#res');
            res.innerHTML = '';
            const {ventas} = datos;
            if(ventas.length > 0) {
                var message = document.getElementById("message");
                message.style.display = "none";
            }
            for(let item of ventas){
                console.log(JSON.stringify(item));
               tablaHash.insertar(new nodo(JSON.stringify(item)));
               res.innerHTML += ` 
               <tr>
               <td>${item.vendedor}</td>
               <td>${item.cliente}</td>
               </tr>`;
               const { productos } = item;
               let contador = 0; 
               for (let prod of productos) {
                   contador += 1;
                res.innerHTML += ` 
                <tr>
                <td></td>
                <td></td>
                <td>${prod.id}</td>
                <td>${prod.cantidad}</td>
                </tr>`;
               }
            }
            //imprimirTablaHash(tablaHash);
        }
    }
    xhttp.open('GET', 'ventas.json', true);
    try {
        xhttp.send(); // Here a xmlhttprequestexception number 101 is thrown 
    } catch(err) {
        console.log(err); // This prints "XMLHttprequest error: undefined" in the body.
    }
}

function guardarArbolB(arbolB) {
    localStorage.setItem('arbolB', JSON.stringify(arbolB));
}

function imprimirTablaHash(tablaHash) {
    /*var cadena = tablaHash.graficar();
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
    });*/
    tablaHash.recorrer();

}