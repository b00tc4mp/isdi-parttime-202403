class FormWithFeedback extends Form {
    constructor() {
        super()

        this.addClass("FormWithFeedback") // de esta manera hereda los estilos de Form y se agrega otra personaliada de "FormWithFeedback"

        const feedbackPanel = new Component("p")
        feedbackPanel.addClass("Feedback")

        this.feedbackPanel = feedbackPanel

    }

    setFeedback(message, level) {
        if (level === ("success"))
            this.feedbackPanel.addClass("success")

        this.feedbackPanel.setText(message)
        //se agrega feedbackPanel al contenedor del objeto actual
        this.add(this.feedbackPanel)
    }

    clear() {
        super.clear()

        this.feedbackPanel.setText("")
        this.feedbackPanel.removeClass("success")

        this.remove(this.feedbackPanel)
    }

}
