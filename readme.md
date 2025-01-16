# ParkMark - Rate Your National Park Experience!

## Progress (To-Do)
### Front Page
#### Navbar
- [x] Complete layout
- [x] Complete responsive design
- [ ] Implement Login
- [ ] Display user information upon login
- [ ] Implement easier hovering over user information box popup

#### Mapbox
- [x] Complete layout
- [x] Get environment variable to be working
- [x] Pin all parks
- [ ] Spend time in getting good location data
- [ ] Move over all css data for popup

## Development Info
### OAuth Info
- [Youtube Tutorial](https://www.youtube.com/watch?v=GuHN_ZqHExs)

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