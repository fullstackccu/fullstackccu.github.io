const SPOTIFY_PATH = 'https://api.spotify.com/v1/search?type=album&q=';

class App {
  constructor() {
    this._onJsonReady = this._onJsonReady.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    this.albumUrls = [];

    const form = document.querySelector('form');
    form.addEventListener('submit', this._onSubmit);
  }

  _onSubmit(event) {
    event.preventDefault();
    const textInput = document.querySelector('#artist-text');
    const query = encodeURIComponent(textInput.value);

    this.albumUrls = [];
    fetch(SPOTIFY_PATH + query,
	    	{ method: "GET",
	          headers: {
	    	    "Accept": "application/json",
		        "Content-Type": "application/json",
		       "Authorization": "Bearer BQC5d8HVSbS0ZXcumz9VwyzvUmsSOEigs6-y4fyzEODyKP1scF5oiQZzLqetcsOSRT9fB1Wo61VuTexIVIfli711LlKCihZBl_xqjoiknTUkulfhwUi3j0JwsZWGnSZ7GBxelQvIbXEbNQM5Z-VDMbmK8_fDtHx696e3peyJyKcVOW1W6B8"
			   }
	    	}
         )
        .then(this._onResponse)
        .then(this._onJsonReady);
  }

  _renderAlbums() {
    const albumContainer = document.querySelector('#album-container');
    albumContainer.innerHTML = '';
    for (const url of this.albumUrls) {
      const album = new Album(albumContainer, url);
    }
  }

  _onJsonReady(json) {
    if (!json.albums) {
      return;
    }
    
    for (const item of json.albums.items) {
      const url = item.images[0].url;
      this.albumUrls.push(url);
    }
    this._renderAlbums();
  }

  _onResponse(response) {
    return response.json();
  }
}
