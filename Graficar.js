
function Avl(){
const arbol=new AvlTree();
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
graf2(arbol.graficar());
}
function listDo() {
    const lista = new ListaDoble();
    console.log(lista.desplegar());
    lista.insert(10);
    console.log(lista.desplegar());
    lista.insert(15);
    lista.insert(20);
    lista.insert(11);
    console.log(lista.desplegar());
    lista.modificar(10, 90);
    console.log(lista.desplegar());
    lista.eliminar(20);
    console.log(lista.desplegar());
    console.log(lista.buscar(15));
    graf2(lista.graficar());
}
function listSim(){
    var lista = new ListaSimple();
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
    //lista.graficar()
    //graph2(lista);
    graf2(lista.graficar());
}

function graf(dot){
        
    // provide data in the DOT language
    //var DOTstring = 'dinetwork {1 -> 1 -> 2; 2 -> 3; 2 -- 4; 2 -> 1 }';
    //var parsedData = vis.Network.convert(DOTstring);
    var data = vis.network.convertDot(dot);

    /* var data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    }*/

    var options = parsedData.options;

    // you can extend the options like a normal JSON variable:
    options.nodes = {
        color: 'red',
        autoResize: true,
        height: '200%',
        width: '100%'
    }
    var container= document.getElementById("grafo1");

// create a network
    var network = new vis.Network(container, data, options);
}
function graf2(lista){
    var data={
        dot: lista
    }
    var container= document.getElementById("grafo1");
    var options = {
        width: '100%',
        height: '600px',
        //verticalScroll: true,
       /* nodes:{
            //shape:'dot',
            scaling: {
                label: {
                    min: 20,
                    max: 40
                },            
    
            }
        },*/
        interaction:{
            multiselect: false,
            //navigationButtons: true,
            selectable: true,
            selectConnectedEdges: true,
            tooltipDelay: 100,
            zoomView: true
            //DragNodes:false
        },
        physics: {
            stabilization:{
                enabled:true,
                onlyDynamicEdges:false,
                fit:true
            },
            barnesHut: {
                springLength: 200,
                gravitationalConstant:-23000,
                springLength: 0,
                springConstant: 0,
                damping: 10,
                avoidOverlap: 0
            },
            repulsion:{
                centralGravity:0,
            
            }
        },
    };
    var network= new vis.Network(container,data,options)
}
function graph2(lista){
    var nodes = new vis.DataSet([
        { id: 1, label: "Node 1" },
        { id: 2, label: "Node 2" },
        { id: 3, label: "Node 3" },
        { id: 4, label: "Node 4" },
        { id: 5, label: "Node 5" },
      ]);

      // create an array with edges
      var edges = new vis.DataSet([
        { from: 1, to: 3 },
        { from: 1, to: 2 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 3, to: 3 },
      ]);

      // create a network
      var container = document.getElementById("grafo1");
      var data = {
        nodes: nodes,
        edges: edges,
      };
      var options = {
        width: '400px',
        height: '400px'
      };
      var network = new vis.Network(container, data, options);
}
function grahp3() {

    // create a network
    var container = document.getElementById("grafo1");
    var options = {
        physics: {
            stabilization: false,
            barnesHut: {
                springLength: 200,
            },
        },
    };
    var data = {};
    var network = new vis.Network(container, data, options);

    $("#draw").click(draw);

    $("a.example").click(function (event) {
        var url = $(event.target).data("url");
        $.get(url)
            .done(function (dotData) {
                $("#data").val(dotData);
                draw();
            })
            .fail(function () {
                $("#error").html(
                    "Error: Cannot fetch the example data because of security restrictions in JavaScript. Run the example from a server instead of as a local file to resolve this problem. Alternatively, you can copy/paste the data of DOT graphs manually in the textarea below."
                );
                resize();
            });
    });

    $(window).resize(resize);
    $(window).load(draw);

    $("#data").keydown(function (event) {
        if (event.ctrlKey && event.keyCode === 13) {
            // Ctrl+Enter
            draw();
            event.stopPropagation();
            event.preventDefault();
        }
    });

    function resize() {
        $("#contents").height($("body").height() - $("#header").height() - 30);
    }

    function draw() {
        try {
            resize();
            $("#error").html("");

            // Provide a string with data in DOT language
            data = vis.parseDOTNetwork($("#data").val());

            network.setData(data);
        } catch (err) {
            // set the cursor at the position where the error occurred
            var match = /\(char (.*)\)/.exec(err);
            if (match) {
                var pos = Number(match[1]);
                var textarea = $("#data")[0];
                if (textarea.setSelectionRange) {
                    textarea.focus();
                    textarea.setSelectionRange(pos, pos);
                }
            }

            // show an error message
            $("#error").html(err.toString());
        }
    }

}