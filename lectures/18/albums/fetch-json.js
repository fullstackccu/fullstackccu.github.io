function onJsonReady(json) {
  const albums = json.albums;
  // Sort albums by year.
  albums.sort(function(a, b) {
    return a.year - b.year;
  });

  // Add album images to body.
  for (const album of albums) {
    const image = new Image();
    image.src = album.url;
    document.body.append(image);
  }
}

function onResponse(response) {
  return response.json();
}

fetch('http://fullstackccu.github.io/lectures/18/albums/albums.json')
    .then(onResponse)
    .then(onJsonReady);
