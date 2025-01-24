# ParkMark - Rate Your National Park Experience!

![frontpage](./FrontPage.png)

## Progress (To-Do)

### Front Page

#### Navbar

-   [x] Complete layout
-   [x] Complete responsive design
-   [x] Implement Login
-   [x] Display user information upon login
-   [ ] Implement easier hovering over user information box popup
-   [ ] Implement search functionality

#### Ratings Side Panel

-   [x] Build basic reviews layout
-   [ ] Display images correctly
-   [ ] Build create review page
-   [ ] Implement Thumbs up feature

#### Mapbox

-   [x] Complete layout
-   [x] Get environment variable to be working
-   [x] Pin all parks
-   [x] Spend time in getting good location data
    -   Ended up using NPS API data - see filterJson.py for more info
-   [x] Move over all css data for popup
-   [x] Fix marker dynamic sizing issue
    -   Check heights of the mapbox-pin div
    -   Bruh. It just got fixed on its own. I have no idea how or why this happened
-   [ ] Finish designing popup box
    -   [ ] Display average ratings
    -   [ ] Show images from reviews (Preferrably most popular ones)

#### Next Steps...

-   [x] Implement Google OAuth
-   [x] Establish database (create tables based on schema)
    -   [x] Implement REST API for user data
    -   [x] Insert user data upon google login
-   [ ] Build Ratings side panel

<details>
<summary>Past To-dos (Completed)</summary>
</details>

### Backend

#### UserData

-   [x] Modify get request to throw 404 error if user does not exist
    -   [x] Identify what and where the 500 (or something else) error is coming from
-   [x] Look for a way to mute 404 error or find out a better way to deal with new user
-   [ ] Check & update if user data has changed on every login

#### Storing Images for Reviews

-   [ ] Look into Google Cloud

<details>
<summary>Past To-dos (Completed)</summary>

#### Data

-   [x] Check missing national park data
-   [x] Fill in missing national park data in `filtered_national_parks_nps.json`
-   [x] Make sure to check again if the number matches to 63!
-   [x] Then run `generateParkUuid.py` again
</details>

## Development Notes

### Dealing with Timezones

-   [Detailed StackOverflow post on storing timezone in user database and maintaining post created times](https://stackoverflow.com/questions/44965545/best-practices-with-saving-datetime-timezone-info-in-database-when-data-is-dep)

### Global State Variables

-   [Redux](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
-   [Jotai](https://jotai.org/) - ended up using this

### Map Services

-   [Mapbox](https://docs.mapbox.com/mapbox-gl-js/guides/install/)
    -   Has 50,000 load limits per month
-   [MapLibre](https://maplibre.org/)
    -   Free

<details>
<summary>Past Notes (Resolved)</summary>

### Google OAuth Info

-   [Youtube Tutorial](https://www.youtube.com/watch?v=GuHN_ZqHExs)
-   [Jwt Fields Description](https://developers.google.com/assistant/identity/google-sign-in-oauth)

### Backend in TypeScript

-   [A good tutorial with extra tips/info on TS compilation to JS](https://blog.logrocket.com/how-to-set-up-node-typescript-express/#creating-minimal-server-express)

### Better Coordinates for the Park

-   API From OpenStreetMap
    -   Uses [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API) - [Overpass turbo](https://overpass-turbo.eu/) is pretty helpful in building queries
        -   Query [boundary=national_park](https://wiki.openstreetmap.org/wiki/Tag:boundary%3Dnational_park)
        -   Update: This one didn't work since boundary returns the locations of encompassing area
    -   [Nominatim](https://nominatim.org/)'s geocoding API - search by name and get longitude & latitude
-   Ended up using data from [NPS official website](https://home1.nps.gov/maps/tools/npmap.js/examples/geojson-layer/) - API: [download data](https://www.nps.gov/lib/npmap.js/4.0.0/examples/data/national-parks.geojson)
</details>
