//EJEMPLO DE RECURSIVIDAD

function printDomTree() {
    var tree = ''//guarda el elemento a imprimir
    var nonSemanticTags = ['div','span', 'script','style','link','meta','noscript','rect','g','circle',]; //elementos que no queremos que imprima

    function loop(elements, indent){
        for (var i = 0; i < elements.length; i++){
            var element = elements[i]

            var isSemantic = !nonSemanticTags.includes(element.tagName.toLowerCase()

            if(isSemantic)
            tree = tree + ' '.repeat(indent) + element.tagName + '\n'

            loop(element.children, indent + (isSemantic? 1: 0 ))
        }
    }loop(document.children, 0)

    console.log(tree)

}
printDomTree()
