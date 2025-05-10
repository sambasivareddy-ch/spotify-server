# 🎵 Spotify Profile Backend Server

A robust **Node.js + Express** backend for powering the Spotify Profile Frontend app. This server handles Spotify OAuth authentication and provides RESTful API endpoints to interact with the Spotify Web API on behalf of the authenticated user.

🔗 **Live API**: [spotify-siva-server.up.railway.app](https://spotify-siva-server.up.railway.app/)

---

## 🧾 Definition / Purpose

This backend application acts as a **middleware service** between the frontend and Spotify. It simplifies authentication and securely handles API requests to fetch user-specific Spotify data such as profile, top tracks, artists, and playlists.

---

## ⚙️ Implementation

- **Runtime**: Node.js
- **Framework**: Express.js
- **Cache**: Redis
- **Auth Flow**: OAuth 2.0 (Authorization Code Flow with PKCE)
- **Spotify API**: [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- **Environment Variables**: Uses `dotenv` for secret management

---

## 🚀 Practical Usage

| Endpoint                            | Method | Description                                      |
|-------------------------------------|--------|--------------------------------------------------|
| `/login`                            | GET    | Initiates Spotify OAuth login                    |
| `/auth/logout`                           | GET    | Logs the user out                                |
| `/auth/is-auth`                          | GET    | Checks if user is authenticated                  |
| `/api/get-profile`                          | GET    | Fetches Spotify user profile                     |
| `/api/get-tracks`                        | GET    | Returns user’s top tracks                        |
| `/api/get-artists`                      | GET    | Returns user’s top artists                       |
| `/api/get-playlist`                        | GET    | Returns user’s playlists                         |
| `/api/get-queue`                        | GET    | Returns user’s current playing song and queue                         |
| `/api/get-song/:id`                         | GET    | Returns track details by song ID                 |
| `/api/get-playlist-track/:id`                       | GET    | Returns playlist tracks details with given playlist ID              |
| `/api/playlist-tracks/:playlistId`      | GET    | Fetches tracks from a specific playlist          |
| `/api/queue`                            | GET    | Gets the current playback queue                  |
| `/api/currently-playing`                | GET    | Returns the currently playing song               |
| `/api/get-devices`                | GET    | Returns the currently playing active devices               |
| `/api/transfer-device`                | PUT    | Transfer the song playback to the given device              |
---

## 💡 Why It Was Introduced

Spotify’s Web API requires secure handling of **OAuth tokens** and **backend proxying** of user data requests. This server was created to:

- Offload sensitive OAuth logic from the client
- Provide clean REST endpoints for frontend consumption
- Simplify Spotify API usage across the app

---

## 📚 Resources

- 🔐 [Spotify Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/)
- 📘 [Spotify Web API Reference](https://developer.spotify.com/documentation/web-api/reference/)
- ⚙️ [Express.js Docs](https://expressjs.com/)
- 🌍 [Node.js Docs](https://nodejs.org/en/docs)
- 📦 [dotenv](https://www.npmjs.com/package/dotenv)

---

## 🛠️ Setup Instructions

```bash
git clone https://github.com/yourusername/spotify-profile-backend.git
cd spotify-profile-backend
npm install
node index.js
```

## .env Configuration
```bash
CLIENT_ID=#client_id
CLIENT_SECRET=#client_secret
REDIRECT_URI=#redirect_uri
PORT=#port
REQUEST_URI=https://accounts.spotify.com/api/token
REDIS_PASSWORD=#redis_password
```
