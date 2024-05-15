var xhr = new XMLHttpRequest();

xhr.addEventListener("load", function () {
  console.log(xhr.response());
});

xhr.open("GET", "https://www.google.com/search?q=hello+world");

xhr.send();
