class FormWithFeedback extends Form {
  constructor() {
    super()

    const feedbackPanel = new Component('p')
    feedbackPanel.addClass("FormWithFeedback")
    this.feedbackPanel = feedbackPanel
  }

  setFeedback(message, level) {
    //const feedbackPanel = this.children[this.children.length - 1]

    if (level === "success")
      this.feedbackPanel.addClass("success")

    this.feedbackPanel.setText(message)

    this.add(this.feedbackPanel)
  }

  clearFeedback() {
    //super.clear()

    this.feedbackPanel.setText("")
    this.feedbackPanel.removeClass("success")

    this.remove(this.feedbackPanel)
  }
}