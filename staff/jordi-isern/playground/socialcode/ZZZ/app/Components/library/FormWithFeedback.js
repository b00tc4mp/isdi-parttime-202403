class FormWithFeedback extends Form {
    constructor(){
        super()

        this.addClass('FormWithFeedback')

        const feedbackPanel = new Component('p')
        feedbackPanel.addClass('feedback')

        this.feedbackPanel = feedbackPanel
    }

    setFeedback(message){

        this.feedbackPanel.setText(message)

        this.add(this.feedbackPanel)
    }
}