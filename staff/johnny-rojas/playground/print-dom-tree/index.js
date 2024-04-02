var allDocument = document.documentElement;

function printDomTree(element, space) {
  var tree = " ";
  for (var i = 0; i < space; i++) {
    tree += " ";
  }
  for (var i = 0; i < element.children.length; i++) {
    var child = element.children[i];

    tree += child.tagName + "\n";

    tree += printDomTree(child, space + 1);
  }
  return tree;
}

console.log(printDomTree(allDocument, 0));


/*
function printDomTree(element, depth = 0) {
    const indentation = " ".repeat(depth * 2);
    console.log(`${indentation}${element.tagName}`);

    for (const child of element.children) {
        printDomTree(child, depth + 1);
    }
}

const allDocument = document.documentElement;
printDomTree(allDocument);
*/