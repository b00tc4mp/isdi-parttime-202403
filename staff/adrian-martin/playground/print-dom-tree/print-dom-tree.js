/*function printDomTree() {
    var tree = ''

    var nonSemanticTags = ['div', 'span', 'script', 'style', 'meta', 'link', 'noscript', 'path', 'rect', 'g', 'circle', 'polygon', 'iframe']

        ;(function loop(elements, indent){
            for(var i = 0; i < elements.length; i++){
                var element = elements[i]

                var isSemantic = !nonSemanticTags.includes(element.tagName.toLowerCase())

            if(isSemantic)
                tree = tree + ' '.repeat(indent) + element.tagName + '\n'

                loop(element.children, indent + (isSemantic? 1 : 0))
            }
        })(document.children, 0)

    console.log(tree)
}
printDomTree()
*/

//printDomTree:1 Uncaught EvalError: Identifier 'printDomTree' cannot be declared with 'var' in current evaluation scope, consider trying 'let' instead

//VM1614:1 EvalError no detectado: el identificador 'printDomTree' no se puede declarar con 'var' en el alcance de evaluación actual; considere intentar 'let' en su lugar

function printDomTree() {
    var tree = ''

    var nonSemanticTags = ['div', 'span', 'script', 'style', 'meta', 'link', 'noscript', 'path', 'rect', 'g', 'circle', 'polygon', 'iframe']

        ; (function loop(elements, indent) {
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i]

                var isSemantic = !nonSemanticTags.includes(element.tagName.toLowerCase())

                if (isSemantic)
                    tree = tree + ' '.repeat(indent) + element.tagName + '\n'

                loop(element.children, indent + (isSemantic ? 1 : 0))
            }
        })(document.children, 0)

    console.clear()
    console.log(tree)
}

printDomTree()