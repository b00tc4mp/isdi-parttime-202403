function printDomTree() {
    var tree = '';
    var nonSemanticTags = ['div', 'span', 'script', 'style', 'meta', 'link', 'noscript'];

    function loop(elements, indent) {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if (!nonSemanticTags.includes(element.tagName.toLowerCase())) {
                tree += '\t'.repeat(indent) + element.tagName + '\n';
                loop(element.children, indent + 1); // Increment the indentation level
            }
            else {
                loop(element.children, indent); // Keep the same indentation level for non-semantic tags
            }
        }
    }

    loop(document.children, 0);
    console.log(tree); // Print the tree representation
}

printDomTree();