var children = document.children;

function printDomTree(elements) {
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    console.log(element.tagName);
    printDomTree(element.children);
  }
}

printDomTree(children);
