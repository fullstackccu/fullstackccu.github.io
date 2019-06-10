const GoogleAuth = require('google-auth-library');

// ***NOTE:***
// You should create your own client ID via these instructions:
// https://developers.google.com/identity/sign-in/web/devconsole-project
// ***This client ID should be yours, so please create your own!!!***
const CLIENT_ID =
	'xxxxxxxxx-oooooooooooo.apps.googleusercontent.com';

function validateToken(token) {
  const auth = new GoogleAuth();
  const client = new auth.OAuth2(CLIENT_ID, '', '');

  return new Promise((resolve) => {
    client.verifyIdToken(
      token,
      CLIENT_ID,
      function(e, login) {
        const payload = login.getPayload();
        resolve({ email: payload.email });
      }
    );
  });
}

module.exports.validateToken = validateToken;
