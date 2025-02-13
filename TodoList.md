# Below are the old readme contents

## Progress (To-Do)

### Front Page

#### Ratings Side Panel

-   [x] Build basic reviews layout
-   [x] Build create review page
-   [x] Implement Thumbs up feature
-   [x] Display images correctly
    -   [x] Add image preview
-   [ ] Implement multiple images
    -   [x] Create separate component for displaying multiple images
    -   [ ] Modify form margin between image box and content
-   [x] Handle delete review
    -   Delete button should do the following **In Order**
        1. Delete all images in bucket :heavy_check_mark:
        2. Delete all relevant ReviewImage rows :heavy_check_mark:
        3. Delete the review itself :heavy_check_mark:

#### Display Image Component

-   [x] Make arrows that can slide through each image
    -   [x] Use image url list from backend
-   [ ] Add sliding animation
-   [ ] Add click to view larger feature

#### Next Steps...

-   [x] Implement Google OAuth
-   [x] Establish database (create tables based on schema)
    -   [x] Implement REST API for user data
    -   [x] Insert user data upon google login
-   [x] Build Ratings side panel
-   [x] remove dynamic sizing for stars and pins
-   [x] Add image upload
-   [ ] Add image upload... More than one!

<details>
<summary>Past To-dos (Completed)</summary>

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
-   [x] Finish designing popup box
    -   [x] Display average ratings
    -   [x] Fix 0% bar
    -   [x] Fix padding for longer names
-   [x] Add reset button
-   [x] Fix hover popup not showing after clicking the marker and closing the popup

#### Navbar

-   [x] Complete layout
-   [x] Complete responsive design
-   [x] Implement Login
-   [x] Display user information upon login
-   [x] Implement search functionality
    -   [x] Fix misaligned dropdown
    -   [ ] Hovering to search result should display corresponding popup?!
-   [x] Implement easier hovering over user information box popup
-   [x] Implement Responsive Design (for mobile) - [x] Search bar - [x] Align popup - [x] Google Sign In button
</details>

### Backend

#### Storing Images for Reviews

-   [x] Look into Google Cloud
    -   Note: The relevant information is stored in secrets/index.js
-   [x] Edit select query for fetching reviews to include image list
    -   Actually solved with something cool - used Agg.Array from Postgres

#### Database

-   [x] Create a new table for images (ReviewImage)
    -   [x] Do I need to cascade on delete and update for review id??
        -   I think I should handle this separately, since the image deletion should be executed in certain order
-   [x] Move all img_url data in Review to ReviewImage table
-   [x] Drop img_url column in Review table

#### REST API

-   [x] Do table join for returning list of reviews with user information
-   [x] Move server domain to .env
-   [x] Get rid of 404 error for empty get requests
-   [x] Modify review post request to handle image upload
-   [x] Sort reviews by most recent
-   [x] Implement image deletion from bucket on review deletion
-   [x] Block liking a post more than once

#### Park Location Data

-   [x] Check missing national park data
-   [x] Fill in missing national park data in `filtered_national_parks_nps.json`
-   [x] Make sure to check again if the number matches to 63!
-   [x] Then run `generateParkUuid.py` again
-   [x] Add in missing states list

<details>
<summary>Past To-dos (Completed)</summary>

#### UserData

-   [x] Modify get request to throw 404 error if user does not exist
    -   [x] Identify what and where the 500 (or something else) error is coming from
-   [x] Look for a way to mute 404 error or find out a better way to deal with new user
-   [x] Check & update if user data has changed on every login
</details>

## Development Notes

### Sending files from frontend to backend

-   Used middleware Multer
    -   [Official docs from Express](https://expressjs.com/en/resources/middleware/multer.html)
    -   [Tutorial with handling single/multiple files](https://blog.logrocket.com/multer-nodejs-express-upload-file/)

### Dealing with Timezones

-   [Detailed StackOverflow post on storing timezone in user database and maintaining post created times](https://stackoverflow.com/questions/44965545/best-practices-with-saving-datetime-timezone-info-in-database-when-data-is-dep)

### Global State Variables

-   [Redux](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
-   [Jotai](https://jotai.org/) - ended up using this

### Map Services

-   [Mapbox](https://docs.mapbox.com/mapbox-gl-js/guides/install/)
    -   Has 50,000 load limits per month
    -   Used [React Mapbox Library (react-map-gl)](https://visgl.github.io/react-map-gl/)
-   [MapLibre](https://maplibre.org/)
    -   Free

<details>
<summary>Past Notes (Resolved)</summary>

### Google OAuth Info

-   [Youtube Tutorial](https://www.youtube.com/watch?v=GuHN_ZqHExs)
-   [Jwt Fields Description](https://developers.google.com/assistant/identity/google-sign-in-oauth)
-   [GoogleLogin Props](https://github.com/MomenSherif/react-oauth?tab=readme-ov-file)

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
