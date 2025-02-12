## About Parkmark
Parkmark is an online rating platform for U.S. national parks, built with React and Express.

You can access the website at: [ParkMark](https://parcomolo.vercel.app/) 🌳🌠

## Preview
![frontpage](./FrontPage.png)

![ReviewPage](./ReviewPage.png)

## Features
- [x] Interactive map with pins marking U.S. national parks
- [x] Leave reviews out of 5 stars
- [x] Attach image to reviews
- [x] Search bar for selecting desired park
- [x] Login with Google account (OAuth)

## Tech Stack
* Frontend: React
* Backend: Express
* Database: PostgreSQL
* Map Software: [Mapbox](https://www.mapbox.com/) with [react-mapbox-gl](https://visgl.github.io/react-map-gl/) library

## Installation
First, clone the repo:
```sh
git clone https://github.com/joanne5548/parkmark.git
```

### Frontend 
Install dependencies and run the development server:
```sh
cd client
npm install
npm run dev
```

### Backend - Development
Install dependencies for backend and run the development server:
```sh
cd server
npm install
npm run dev
```

### Backend - Production
Backend is deployed on Google Cloud Run with Docker. </br>
To run the production server, run docker:
```sh
cd server
docker build
docker run -p 5000:5000 <image_id>
```

## Directory Structure
1. `/client`
    - Contains frontend application
2. `/server`
    - Contains backend server
    - `/sql_queries`: contains database schema and queries used for its setting and modifications
3. `/scripts`
    - Contains Python scripts for data cleaning and retrieval

## Environment Variables
### Frontend
Placed in `/client` directory.
1. `VITE_BACKEND_URL`: URL for backend endpoint. For development server, it is set to `http://localhost:5000`
2. `VITE_MAPBOX_ACCESS_TOKEN`: Mapbox access token. Required to load map on the front page. Under free plan, you get free 50K loads every month.
3. `VITE_GOOGLE_OAUTH_CLIENT_ID`: Google OAuth client ID. Required to offer Google OAuth service on the website. More information on the setup can be found [here](./TodoList.md#google-oauth-info).

### Backend
Placed in `/server` directory.
1. `SERVER_DOMAIN`: Domain name of the server endpoint. For development, set to localhost.
2. `PORT`: Port number for the server. If not set, the server file will default to 5000.
3. `DB_HOST`: Domain name for database endpoint. For development, set to localhost.
4. `DB_PASSWORD`: Database password for the PostgreSQL user.
5. `DB_NAME`: Database name to use.
6. `GOOGLE_CLOUD_SERVICE_ACCOUNT_KEY_BASE_64`: Google cloud key for using buckets. The service account key downloaded in json is converted into base 64 to be stored as a string.
7. `GOOGLE_CLOUD_BUCKET_NAME`: Bucket name to use to store the images uploaded by users.

## Roadmap
- [ ] Create user information page
    - [ ] Include full list of national park tiles that highlights ones that are already reviewed
    - [ ] View past reviews
    - [ ] Tab for liked reviews
- [ ] Allow more than one image upload
- [ ] Allow edits to posts

Previous items can be found at: [TodoList.md](./TodoList.md)

## Contact
**Joanne Kim** </br>
You can reach me at: joanne.kim0328@gmail.com </br>
[Visit my website!](joannekim.dev) | [LinkedIn](https://www.linkedin.com/in/jkim0328)