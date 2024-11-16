function fetchGifs(query) {
  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function () {
    var parser = new DOMParser();
    var doc = parser.parseFromString(xhr.response, 'text/html');

    var images = doc.querySelectorAll('.giphy-gif-img');

    var gifs = [];

    images.forEach(function (image) {
      var url = image.src;
      console.log(url)
      gifs.push({ url: url });
    });

    console.table(gifs);
  });

  xhr.open('GET', `https://giphy.com/search/${query}`);
  xhr.send();
}

fetchGifs('hello world');