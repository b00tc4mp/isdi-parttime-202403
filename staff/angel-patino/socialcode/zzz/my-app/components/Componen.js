class Component {
    constructor(tagOrName) {
        if (typeof tagOrName === 'string')
            tagOrName = document.createElement(tagOrName)
        else if (tagOrName instanceof HTMLElement || tagOrName instanceof HTMLDocument)
            this.container = tagOrName
        else
            throw new Error('is not a tag or container')
    }

}