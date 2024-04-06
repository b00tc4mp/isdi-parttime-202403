/*
const root = document.documentElement;

const printTree = (root, range = 0) => {
    const tagName = root.tagName;
    const nodeType = root.nodeType;

    const elementNode = Node.ELEMENT_NODE; 
    const textNode = Node.TEXT_NODE;

    if(nodeType === elementNode) {
        console.log(`${'  '.repeat(range)}${tagName}`);
        const childNodes = root.childNodes;
        for(let i = 0; i < childNodes.length; i++){ 
            printTree(childNodes[i], range + 1);
        }
    } else if(nodeType === textNode) {
        const trimSpaces = root.textContent.trim();
        if(trimSpaces !== "") {
            console.log(`${'  '.repeat(range)} '${trimSpaces}'`);
        }
    }
}

printTree(root);
*/

//no es6 features
function printDomTree() {
    var tree = ''

    var nonSemanticTags = ['div', 'span', 'script', 'style', 'meta', 'link', 'noscript', 'path', 'rect', 'g', 'circle']

    function loop(elements, indent) {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i]

            var isSemantic = !nonSemanticTags.includes(element.tagName.toLowerCase())

            if (isSemantic)
                tree = tree + ' '.repeat(indent) + element.tagName + '\n'

            loop(element.children, indent + (isSemantic ? 1 : 0))
        }
    }

    loop(document.children, 0)

    console.clear()
    console.log(tree)
}

printDomTree()