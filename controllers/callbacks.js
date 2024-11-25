const admin = require('firebase-admin');
<<<<<<< HEAD
const serviceAccount = require('../serviceAccKey.json');
const firebaseConfig = require('../firebaseConfig.js');
=======
const serviceAccount = require('');
const firebaseConfig = require('');
>>>>>>> 2fb5afd (last)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  ...firebaseConfig,
});

const db = admin.firestore();
const functions = require('firebase-functions');
const cors = require('cors');
const corsHandler = cors({ origin: true });
require('dotenv').config();
const handleSpotifyCallback = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      console.log('entro aquuu');
      const { code } = req.body;
      const clientId = process.env.client_ID;
      const clientSecret = process.env.client_secret;
<<<<<<< HEAD
      const redirectUri = 'http://localhost:3000/callback';
=======

      const redirectUri = '';
>>>>>>> 2fb5afd (last)

      const tokenUrl = 'https://accounts.spotify.com/api/token';

      const authHeader = 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64');

      const tokenResponse = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': authHeader,
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUri,
        }),
      });

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
      console.log('tokenss',tokenData);
      const userResponse = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const userData = await userResponse.json();
      console.log('userda',userData);
      const userRef = db.collection('users').doc(code);
      const dn= userData.display_name;
      await userRef.set({
        access_token: accessToken,
        username: userData.display_name,
      });
      console.log('mando ', userRef)
      res.json({ accessToken, dn});
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

const getUserToken = functions.https.onRequest(async (req, res) => {
  try {
    const userId = req.params.userId;
    const userRef = db.collection('users').doc(userId);
    const userSnapshot = await userRef.get();

    if (userSnapshot.exists) {
      const userData = userSnapshot.data();
      res.json({ userToken: userData.access_token });
    } else {
      res.status(404).json({ error: 'Access token not found for the user' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = { handleSpotifyCallback, getUserToken };