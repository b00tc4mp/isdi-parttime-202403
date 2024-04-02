function printDomTree() {
    var children = document.children

    var tree = ''

    for(var i = 0; i < children.length; i++){
        var child = children[0]

        tree = tree + child.tagName

        var childChildren = child.children

        for(var j = 0; j < childChildren.length; j++ ){
            var child2 = childChildren[j]

            tree = tree + '\n' + ' ' + child2.tagName
        }
    }
    console.log(tree)
}

printDomTree()
