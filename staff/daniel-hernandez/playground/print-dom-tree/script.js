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