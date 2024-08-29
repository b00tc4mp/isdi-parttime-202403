class Label extends Component{
    Component (){
        super('label')
    }

    setFor(id) {
        this.container.hrtmlFor = id
    }
}