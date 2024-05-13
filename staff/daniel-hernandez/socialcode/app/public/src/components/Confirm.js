class Confirm extends Component {
  constructor() {
    super("dialog");
    this.addClass("confirm-delete-dialog");

    const confirmation = new Paragraph();
    confirmation.setText("Are you sure you want to delete this post?");

    const cancelButton = new Button("Cancel");
    cancelButton.addAutoFocusAttribute();
    cancelButton.onClick(() => this.onCancelListener());
    cancelButton.addClass("cancel-post-button");

    const confirmButton = new Button("OK");
    confirmButton.onClick(() => this.onOkListener());
    confirmButton.addClass("create-post-button");

    this.add(confirmation);
    this.add(cancelButton);
    this.add(confirmButton);
  }

  showModal() {
    const dialog = this.getElement();
    dialog.showModal();
  }

  close() {
    const dialog = this.getElement();
    dialog.close();
  }

  onCancel(listener) {
    this.onCancelListener = listener;
  }

  onOk(listener) {
    this.onOkListener = listener;
  }
}
