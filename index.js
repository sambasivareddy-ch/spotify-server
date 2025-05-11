import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import loginRouter from './routes/auth/login.js';
import callbackRouter from './routes/auth/callback.js';
import getProfile from './routes/api/get-profile.js';
import getTopArtists from './routes/api/get-artists.js';
import getTopTracks from './routes/api/get-tracks.js';
import getSong from './routes/api/get-song.js';
import getFeatures from './routes/api/get-features.js';
import getDevices from './routes/api/get-devices.js';
import transferDevices from './routes/api/transfer-device.js';
import getQueue from './routes/api/get-queue.js';
import getPlaylists from './routes/api/get-playlists.js';
import getPlaylistTracks from './routes/api/get-playlist-tracks.js';
import isAuth from "./routes/auth/is-auth.js";
import logout from "./routes/auth/logout.js";

import AuthorizeUser from './middleware/authorize.js';

import { initializeRedis } from './db/redis.js';

const app = express();

// Configurations and environment variables setup
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,   
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));

// Initialize Redis client
try {
  initializeRedis();
} catch(err) {
  console.log("Unable to initialize the redis")
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/login', loginRouter);
app.use('/callback', callbackRouter);
app.use('/auth/is-auth', isAuth);
app.use('/auth/logout', AuthorizeUser, logout);
app.use('/api/get-profile', AuthorizeUser, getProfile);
app.use('/api/get-artists', AuthorizeUser, getTopArtists);
app.use('/api/get-tracks', AuthorizeUser, getTopTracks);
app.use('/api/get-song', AuthorizeUser, getSong);
app.use('/api/get-features', AuthorizeUser, getFeatures);
app.use('/api/get-devices', AuthorizeUser, getDevices);
app.use('/api/transfer-device', AuthorizeUser, transferDevices);
app.use('/api/get-queue', AuthorizeUser, getQueue);
app.use('/api/get-playlist', AuthorizeUser, getPlaylists);
app.use('/api/get-playlist-track', AuthorizeUser, getPlaylistTracks);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});