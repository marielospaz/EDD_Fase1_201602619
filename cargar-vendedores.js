


function cargarVendedores(){
    //console.log('dentro de la funcionnnnnn');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
            let newAvl = new avl();
            let datos = JSON.parse(this.responseText);
            let res= document.querySelector('#res');
            res.innerHTML = '';
            const {vendedores} = datos;
            if(vendedores.length > 0) {
                var message = document.getElementById("message");
                message.style.display = "none";
            }
            for(let item of vendedores){
                //console.log(JSON.stringify(item));
                newAvl.insertar(item.id, item);  
                var hash = CryptoJS.SHA256(item.password, item.nombre);
               res.innerHTML += ` 
               <tr>
               <td>${item.id}</td>
               <td>${item.nombre}</td>
               <td>${item.edad}</td>    
               <td>${item.correo}</td>
               <td>${hash}</td>
               </tr>`;
            }
            imprimirAvl(newAvl);
        }
    }
    xhttp.open('GET', 'vendedores.json', true);
    try {
        xhttp.send(); // Here a xmlhttprequestexception number 101 is thrown 
    } catch(err) {
        console.log(err); // This prints "XMLHttprequest error: undefined" in the body.
    }
}

function imprimirAvl(newAvl) {
    var cadena = newAvl.generarDot();
    console.log(cadena);
    var options = {
    format: 'png-image-element'
    }
    var viz = new Viz();
    viz.renderSVGElement(cadena, options)
    .then(function (element) {
      var main = document.getElementById('main');
      main.appendChild(element);
      main.style.display="block";
    });

}