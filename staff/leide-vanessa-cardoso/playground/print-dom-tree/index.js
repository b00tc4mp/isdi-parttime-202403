\\ class 28-03-2024

function printDomTree () {
    var children = document.children

    var tree = ""
    for (var i = 0; i < children.length; i++) {
        var child = children[0]

        tree = tree + child.tagName

        var childChildren = child.children
        
        for (var j = 0; j < childChildren.length; j++) {
            var childChild = childChildren[j]
            
            tree = tree + `\n` + " " + childChild.tagName

            var childChildChildren = childChild.children

            for (var k = 0; k < childChildren.length; k++) {
                var childChildChild = childChildChildren[k]

                tree = tree + "\n" + "  " + childChildChild.tagName
            }
            
        } 
    }
    console.log(tree)
}

printDomTree()


/*
HTML
 HEAD
  META
  META
 BODY
  DIV
  SCRIPT
  ...
  */

  // HINT recursion (in js)