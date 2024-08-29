// Imprime por consola el arbon de elementos DOM de una pagina Web

/*

function printDomTree () {
    // Obtenemos los elementos hijos del documento HTML
    var children = document.children;
    var tree = "";

    // Iteramos sobre los elementos hijos del documento
    for (let i = 0; i < children.length; i++){
        // Obtenemos la etiqueta del elemento hijo actual
        var child = children[i].tagName;

        // Concatenamos la etiqueta del elemento hijo actual al árbol
        tree = tree + child;

        // Iteramos sobre los hijos del elemento hijo actual
        for(var j = 0 ; j < children[i].children.length; j++){
            // Obtenemos la etiqueta del hijo actual del elemento hijo actual
            var childChild = children[i].children[j].tagName;
            
            // Agregamos el hijo actual al árbol con indentación
            tree = tree + "\n" + "  " + childChild;

            // Si el hijo actual tiene más hijos, los iteramos y los agregamos al árbol con indentación adicional
            for(var k = 0 ; k < children[i].children[j].children.length; k++){
                var childGrandChild = children[i].children[j].children[k].tagName;
                tree = tree + "\n" + "    " + childGrandChild;
            }
        }
    }

    // Imprimimos el árbol completo en la consola
    console.log(tree);
}

// Llamamos a la función printDomTree
printDomTree();


/*
HTML
  HEAD
    META
    STYLE
    META
    LINK
    TITLE
    LINK
    SCRIPT
    SCRIPT
  BODY
    ASIDE
    MAIN
    SCRIPT
    IMG
    IMG
    SCRIPT
    DIV

*/

function printDomTree() {
  var tree = "";

  var nonSemanticTags = ["div", "span", "script", "style", "meta", "link", "nonscript", "path", "rect"];

  function loop(elements, indent) {
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];

      // Si el elemento no está en la lista de etiquetas no semánticas, agregamos su etiqueta al árbol
      if (!nonSemanticTags.includes(element.tagName.toLowerCase())) {
        tree += " ".repeat(indent) + element.tagName + "\n";
      }

      // Llamamos recursivamente a la función loop para los hijos del elemento actual
      loop(element.children, indent + 1);
    }
  }

  // Comenzamos el recorrido del árbol desde el elemento raíz del documento
  loop(document.children, 0);

  console.log(tree);
}

printDomTree();
