class FormWithFeedback extends Form {
  constructor() {
    super('form')
    this.addClass('FormWithFeedback')

    const feedbackPanel = new Component('p')
    feedbackPanel.addClass('Feedback')
    this.feedbackPanel = feedbackPanel
  }

  setFeedback(message) {
    // const feedbackPanel = this.children[5]
    this.feedbackPanel.setText(message)
    this.add(this.feedbackPanel)
  }

  clear() {
    super.clear()
    this.feedbackPanel.setText('')
    this.remove(this.feedbackPanel)
  }
}
