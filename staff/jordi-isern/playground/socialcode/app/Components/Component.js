class Component {
    constructor(tagNameOrContainer = 'div'){
        if (typeof tagNameOrContainer === 'string'){
            this.container = document.createElement(tagNameOrContainer)
        }
        else if (tagNameOrContainer instanceof HTMLElement){
            this.container = tagNameOrContainer
        }
        else{
        throw new Error('tagNameOrContainer is not a tagName or container')
        }
        this.children = []
    }


    add(child) {
        if (!(child instanceof Component)) throw new TypeError('child is not component')

        this.children.push(child)

        this.container.appendChild(child.container)
    }
    
    remove(child){
        if (!(child instanceof Component)){ throw new TypeError('child is not component')}
           const index = this.children.indexOf(child)
        

        if(index > -1){
            this.children.splice(index, 1)
        }

        if(this.container.contains(child.container)){
            this.container.removeChild(child.container)
        }
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

    onClick(action){
        this.container.addEventListener('click', action)
    }
    removeAll(){
        const children = this.children.concat()
        children.forEach(child => this.remove(child))
    }
}