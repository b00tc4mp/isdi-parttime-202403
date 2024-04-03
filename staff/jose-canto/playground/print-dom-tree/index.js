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

function printDomTree(element, space) {
  var semanticTags = ['HEADER', 'BODY', 'FOOTER', 'NAV', 'MAIN', 'ARTICLE', 'SECTION', 'ASIDE', 'DETAILS', 'FIGURE', 'MARK', 'SUMMARY', 'TIME'];
  var tree = "";

  if (semanticTags.includes(element.tagName)) {
    tree += element.tagName + "\n"; // Agregar etiqueta semántica al "tree" con salto de línea
    // Agregar espacios en blanco a "tree"
    for (var i = 0; i < space; i++) {
      tree += " "; // Agregar espacio
    }
  }

  for (var i = 0; i < element.children.length; i++) {
    tree += printDomTree(element.children[i], space + 1); // Llamada recursiva para cada hijo
  }

  return tree;
}

console.log(printDomTree(document.documentElement, 0));