class FormWithFeedback extends Form {
    constructor() {
        super()

        this.addClass('FormWithFeedback')

        const feedbackPanel = new CompositionEvent('p')
        feedbackPanel.addClass('Feedback')

        this.feedbackPanel = feedbackPanel
    }

    setFeedback(message, level) {
        if (level === 'succes')
            this.feedbackPanel.addClass('succes')

        this.feedbackPanel.setText(message)

        this.add(this.feedbackPanel)
    }

    clear() {
        super.clear()

        this.feedbackPanel.setText('')
        this.feedbackPanel.removeClass('succes')

        this.remove(this.feedbackPanel)
    }
}