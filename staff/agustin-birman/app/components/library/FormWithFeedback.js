class FormWithFeedback extends Form {
    contructor() {
        super()

        this.addClass('FormWhitFeedback')

        const feedbackPanel = new Component('p')
        feedbackPanel.addClass('Feedback')

        this.feedbackPanel = feedbackPanel
    }

    setFeedback(message, level) {
        if (level === 'success')
            this.feedbackPanel.addClass('success')

        this.feedbackPanel.setText(message)

        this.add(this.feedbackPanel)
    }

    clear() {
        super.clear()

        this.feedbackPanel.setText('')
        this.feedbackPanel.removeClass('success')

        this.remove(this.feedbackPanel)
    }
}