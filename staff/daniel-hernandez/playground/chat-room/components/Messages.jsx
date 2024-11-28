const { Component } = React;

class Messages extends Component {
  constructor() {
    super();

    this.state = {
      messages: [
        {
          username: "USERNAME",
          text: "HAHAHA SO TRUE",
          date: new Date().toISOString(),
        },
        {
          username: "USERNAME2 ",
          text: ":(",
          date: new Date().toISOString(),
        },
        {
          username: "USERNAME3",
          text: "lol",
          date: new Date().toISOString(),
        },
      ],
    };
  }

  handleMessageSubmit(event) {
    event.preventDefault();

    const form = event.target;

    const username = form.username.value;
    const text = form.text.value;

    const message = {
      username,
      text,
      date: new Date().toISOString(),
    };

    const messages = this.state.messages.concat(message);

    this.setState({ messages });

    form.reset();
  }

  render() {
    return (
      <div>
        <MessageList
          title={"Messages"}
          messages={this.state.messages}
        ></MessageList>

        <form onSubmit={this.handleMessageSubmit.bind(this)}>
          <input name="username" placeholder="username" />
          <input name="text" placeholder="message" />
          <button type="submit">Send </button>
        </form>
      </div>
    );
  }
}
