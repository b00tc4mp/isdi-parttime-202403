var children = document

var tree = ' '

function printDomTree (element){
    children = element.children
    for (let i = 0; i < children.length; i++) {
       var child = children[i]
        tree = tree +'\n'+ ' '+ child.tagName
       
       printDomTree(child)
   }
    console.log(tree)
}
printDomTree(children)