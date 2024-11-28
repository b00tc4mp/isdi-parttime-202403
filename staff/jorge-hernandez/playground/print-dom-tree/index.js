function extractCode() {
  var allElements = document.documentElement;
  function recur(element, index) {
    var result = "";
    var space = " ".repeat(index);

    for (var i = 0; i < element.children.length; i++) {
      var child = element.children[i];
      result += space + child.tagName + "\n";
      result += recur(child, index + 1);
    }

    return result;
  }
  console.log(recur(allElements, 0));
}
extractCode();
