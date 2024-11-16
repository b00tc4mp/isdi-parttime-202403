class Link extends Component {
  constructor() {
    super("a")

    this.addClass("Link")
    this.setUrl("")
  }


  setUrl(url) {
    this.container.href = url
  }
}
// Link.prototype.setTarget = function (target) {
//   this.container.target = target
// }
