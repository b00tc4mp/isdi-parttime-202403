function Component(tagNameOrContainer) {
    if (typeof tagNameOrContainer === 'string') {
        this.container = document.createElement(tagNameOrContainer);
    } else if (tagNameOrContainer instanceof HTMLElement) {
        this.container = tagNameOrContainer;
    } else {
        throw new Error('tagNameOrContainer is not a tagName or container');
    }

    this.children = [];
}

Component.prototype.add = function (child) {
    if(!(child instanceof Component)) throw new TypeError('child is not a component');

    this.children.push(child);

    this.container.appendChild(child.container);
}

Component.prototype.setID = function (id) {
    this.container.id = id;
}

Component.prototype.addClass = function (classID) {
    this.container.classList.add(classID);
}

Component.prototype.removeClass = function (classID) {
    this.container.classList.remove(classID);
}

Component.prototype.setText = function (text) {
    this.container.innerText = text;
}

Component.prototype.setHeight = function (height) {
    this.container.style.height = height + 'px';
}

Component.prototype.setWidth = function (width) {
    this.container.style.width = width + 'px';
}

Component.prototype.setTopMargin = function (gap) {
    this.container.style.marginTop = gap + 'px';
}

Component.prototype.setTop = function (top) {
    this.container.style.top = top + 'px';
}

Component.prototype.setRight = function (right) {
    this.container.style.right = right + 'px';
}

Component.prototype.setLeft = function (left) {
    this.container.style.left = left + 'px';
}

Component.prototype.setBottom = function (bottom) {
    this.container.style.bottom = bottom + 'px';
}

Component.prototype.setPosition = function (position) {
    this.container.style.position = position;
}

Component.prototype.setZIndex = function (index) {
    this.container.style.zIndex = index;
}

Component.prototype.getBounds = function () {
    return this.container.getBoundingClientRect();
}

Component.prototype.getBottom = function () {
    return getComputedStyle(this.container).bottom;
}

Component.prototype.getRight = function () {
    return getComputedStyle(this.container).right;
}

Component.prototype.getAll = function (elem) {
    return this.container.querySelectorAll(elem);
}

Component.prototype.stopListeningAfterClick = function (func) {
    var newFunction = func;

    var eventHandler = function() {
        newFunction();

        this.container.removeEventListener('click', eventHandler);
    }.bind(this);

    this.container.addEventListener('click', eventHandler);
}

Component.prototype.getElement = function () {
    return this.container;
}

Component.prototype.getPosition = function () {
    var rect = this.container.getBoundingClientRect();
    return {
        x: rect.right,
        y: rect.top
    }
}