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

const main = new Component("main");
body.add(main);

const postList = new Component("section");
main.add(postList);

{
  const postData = {
    author: "MrBlue",
    title: "Im MrBlue !",
    image:
      "https://imgs.search.brave.com/5Rxb3vgWLKdyD40_Hj2iwSiXoOmp-dLXm8SsQpMcRgk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFxQm1pcU5vckwu/anBn",
    text: "there's nothing to say.. I'm litteraly MrBlue.",
  };

  const post = new Post(postData);

  postList.add(post);
}

const posts = logic.getAllPosts();
posts.forEach((post) => {
  const post2 = new Post(post);

  postList.add(post2);
});

const footer = new Component("footer");
footer.addClass("Footer");

const addPostButton = new Button();
addPostButton.setText("+");

footer.add(addPostButton);

body.add(footer);
