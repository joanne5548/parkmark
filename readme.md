# ParkMark - Rate Your National Park Experience!

![frontpage](./FrontPage.png)

## Progress (To-Do)
### Front Page
#### Navbar
- [x] Complete layout
- [x] Complete responsive design
- [x] Implement Login
- [ ] Display user information upon login
- [ ] Implement easier hovering over user information box popup
- [ ] Implement search functionality

#### Mapbox
- [x] Complete layout
- [x] Get environment variable to be working
- [x] Pin all parks
- [x] Spend time in getting good location data
    - Ended up using NPS API data - see filterJson.py for more info
- [x] Move over all css data for popup
- [ ] Fix marker dynamic sizing issue
    - Check heights of the mapbox-pin div

#### Next Steps...
- [x] Implement Google OAuth
- [ ] Establish database (create tables based on schema)
- [ ] Build national park page layout
- [ ] Build reviews tab layout

## Development Notes
### Google OAuth Info
- [Youtube Tutorial](https://www.youtube.com/watch?v=GuHN_ZqHExs)

### Redux (Global Store)
- [Website](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)

### Map Services
- [Mapbox](https://docs.mapbox.com/mapbox-gl-js/guides/install/)
    - Has 50,000 load limits per month
- [MapLibre](https://maplibre.org/)
    - Free

### Better Coordinates for the Park
- API From OpenStreetMap
    - Uses [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API) - [Overpass turbo](https://overpass-turbo.eu/) is pretty helpful in building queries
        - Query [boundary=national_park](https://wiki.openstreetmap.org/wiki/Tag:boundary%3Dnational_park)
        - Update: This one didn't work since boundary returns the locations of encompassing area
    - [Nominatim](https://nominatim.org/)'s geocoding API - search by name and get longitude & latitude
- Ended up using data from [NPS official website](https://home1.nps.gov/maps/tools/npmap.js/examples/geojson-layer/)
    - API: [download data](https://www.nps.gov/lib/npmap.js/4.0.0/examples/data/national-parks.geojson)