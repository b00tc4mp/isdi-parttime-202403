function printDomTree(element, space) {
    var semanticTags = ['HEADER', 'BODY', 'FOOTER', 'NAV', 'MAIN', 'ARTICLE', 'SECTION', 'ASIDE', 'DETAILS', 'FIGURE', 'MARK', 'SUMMARY', 'TIME'];
    var tree = "";

    // Agregar la etiqueta al árbol si es semántica
    if (semanticTags.includes(element.tagName)) {
        tree += " ".repeat(space) + element.tagName + "\n"; // Agregar la etiqueta con el espaciado correcto
    } else {
        tree += " ".repeat(space) + element.tagName + "\n"; // Incluso si no es semántica, agregarla al árbol
    }

    // Iterar sobre los hijos
    for (var i = 0; i < element.children.length; i++) {
        tree += printDomTree(element.children[i], space + 1); // Llamada recursiva con espaciado incrementado
    }

    return tree;
}

console.log(printDomTree(document.documentElement, 0));


///////////////////////////////////////////////


function printDomTree(element, space) {
    var tree = "";

    // Agregar espacios en blanco al árbol antes de la etiqueta
    tree += " ".repeat(space);

    // Agregar la etiqueta al árbol
    tree += element.tagName + "\n";

    // Iterar sobre los hijos
    for (var i = 0; i < element.children.length; i++) {
        tree += printDomTree(element.children[i], space + 1); // Llamada recursiva para cada hijo con espacio incrementado
    }

    return tree;
}

console.log(printDomTree(document.documentElement, 0));