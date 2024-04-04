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

/*

hml
 head
  meta
  meta
  meta
  title
  link
  script
 body
   header
     h1
     nav
    main
     section
      article
      article
     section
      ...
*/

// HINT recursion (in js)