class Component {
  constructor(tagNameOrContainer = "div") {
    if (typeof tagNameOrContainer === "string") {
      this.container = document.createElement(tagNameOrContainer);
    } else if (
      tagNameOrContainer instanceof HTMLElement ||
      tagNameOrContainer instanceof HTMLDocument
    ) {
      this.container = tagNameOrContainer;
    } else {
      throw new Error("tagNameOrContainer is not a tagName or container");
    }

    this.children = [];
  }

  add(child) {
    if (!(child instanceof Component))
      throw new TypeError("child is not a component");

    this.children.push(child);

    this.container.appendChild(child.container);
  }

  remove(child) {
    if (!(child instanceof Component))
      throw new TypeError("Child is not an instance of Component");

    const index = this.children.indexOf(child);

    if (index > -1) {
      this.children.splice(index, 1);
    }

    if (this.container.contains(child.container)) {
      this.container.removeChild(child.container);
    }
  }

  removeAll() {
    const children = this.children.concat();

    children.forEach((child) => this.remove(child));
  }

  setID(id) {
    this.container.id = id;
  }

  addClass(classID) {
    this.container.classList.add(classID);
  }

  removeClass(classID) {
    this.container.classList.remove(classID);
  }

  setText(text) {
    this.container.innerText = text;
  }

  setHeight(height) {
    this.container.style.height = height + "px";
  }

  setWidth(width) {
    this.container.style.width = width + "px";
  }

  setTopMargin(gap) {
    this.container.style.marginTop = gap + "px";
  }

  setTop(top) {
    this.container.style.top = top + "px";
  }

  setRight(right) {
    this.container.style.right = right + "px";
  }

  setLeft(left) {
    this.container.style.left = left + "px";
  }

  setBottom(bottom) {
    this.container.style.bottom = bottom + "px";
  }

  setPosition(position) {
    this.container.style.position = position;
  }

  setZIndex(index) {
    this.container.style.zIndex = index;
  }

  getBounds() {
    return this.container.getBoundingClientRect();
  }

  getBottom() {
    return getComputedStyle(this.container).bottom;
  }

  getRight() {
    return getComputedStyle(this.container).right;
  }

  getAll(elem) {
    return this.container.querySelectorAll(elem);
  }

  stopListeningAfterClick(func) {
    const newFunction = func;

    const eventHandler = () => {
      newFunction();

      this.container.removeEventListener("click", eventHandler);
    };

    this.container.addEventListener("click", eventHandler);
  }

  getElement() {
    return this.container;
  }

  getPosition() {
    const rect = this.container.getBoundingClientRect();
    return {
      x: rect.right,
      y: rect.top,
    };
  }

  onClick(callback) {
    this.container.addEventListener("click", callback);
  }
}
