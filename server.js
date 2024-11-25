const {handleSpotifyCallback,getUserToken} = require('./controllers/callbacks.js')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());
const port = process.env.PORT || 3001;
const getRouter = express.Router();
getRouter.get('/get-token/:userId', getUserToken);

const postRouter = express.Router();
postRouter.post('/spotify-callback', handleSpotifyCallback);


app.use(getRouter);
app.use(postRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});