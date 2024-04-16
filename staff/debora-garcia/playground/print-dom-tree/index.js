debugger

function printDomTree() {
    var tree = ''

    var nonSemanticTags = ['div', 'span', 'script', 'style', 'meta', 'link', 'noscript', 'path', 'rect', 'g', 'circle', 'polygon', 'iframe']

        ; (function loop(elements, indent) {
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i]
                /* 
                [html]
                html i=0 e=0

                    [head,body]
                    head i=0 e=1

                        [meta,meta,title]
                        meta, i=0, e=2 X
                            [] i=0, e=2--> array vacio, no entra en el bucle for, va al nivel anterior
                        meta i=1, e=2 X
                            [] i=0, e=2--> array vacio, no entra en el bucle for, va al nivel anterior

                        title i=2 e=2
                            [] i=0, e=2--> array vacio, no entra en el bucle for, va al nivel anterior

                        (i>elements.length)se acaba el bucle for, va al nivel superior
                    body i=1 e=1

                 */
                 
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
HTML
 HEAD
  TITLE
 BODY
  HEADER
   H1
    NAV
     UL
      LI
       A
      LI
       A
      LI
       A
      LI
       A
  MAIN
   SECTION
    H2
    P
   SECTION
    H2
    UL
     LI
     LI
     LI
  FOOTER
   P

     
HTML
 HEAD
  TITLE
 BODY
  HEADER
   H1
   NAV
    UL
     LI
      A
     LI
      A
     LI
      A
     LI
      A
  MAIN
   SECTION
    H2
    P
   SECTION
    H2
    UL
     LI
     LI
     LI
  FOOTER
   P

*/