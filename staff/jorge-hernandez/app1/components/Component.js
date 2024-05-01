class Component {
  constructor(tagNameOrContainer) {
    if (typeof tagNameOrContainer === 'string')
      this.container = document.createElement(tagNameOrContainer)
    else if (tagNameOrContainer instanceof HTMLElement)
      this.container = tagNameOrContainer
    else throw new Error('tagNameOrContainer is not a tagName or container')

    this.children = []
  }

  add(child) {
    this.container.appendChild(child.container)
    this.children.push(child)
  }

  setText(text) {
    this.container.innerText = text
  }

  setId(id) {
    this.container.id = id
  }

  addClass(clazz) {
    this.container.classList.add(clazz)
  }

  removeClass(clazz) {
    this.container.classList.remove(clazz)
  }
}
