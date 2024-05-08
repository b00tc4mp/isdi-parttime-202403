if (!logic.isUserLoggedIn()) {
  location.href = "../../login/";
}

const body = new Component(document.body);

const navBar = new Div();
navBar.addClass("nav-bar");
const username = logic.getUsername();
const usernameDisplay = new Paragraph();
usernameDisplay.setText(username);
const logoutButton = new Button();
logoutButton.removeClass("Button");
logoutButton.addClass("logout-button");
logoutButton.setText("logout");
logoutButton.stopListeningAfterClick(() => {
  logic.logoutUser();

  location.href = "../../login/";
});

body.add(navBar);
navBar.add(logoutButton);
navBar.add(usernameDisplay);

const post = new Component("article");

const authorTitle = new Paragraph();
authorTitle.setText("pepitogrillo");

const postTitle = new Component("h2");
postTitle.setText("How to console.log");

const postImage = new Img(
  "https://res.cloudinary.com/practicaldev/image/fetch/s--gJWXQzd2--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://cdn-images-1.medium.com/max/800/1%2AqmBE-ip-IkMnQuz3ZnaXHg.jpeg",
);

const postText = new Paragraph();
postText.setText(
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
);

post.add(authorTitle);
post.add(postTitle);
post.add(postImage);
post.add(postText);

body.add(post);

const footer = new Component("footer");
footer.addClass("Footer");

const addPostButton = new Button();
addPostButton.setText("+");

footer.add(addPostButton);

body.add(footer);
