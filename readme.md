# ParkMark - Rate Your National Park Experience!

## Progress (To-Do)
### Front Page
#### Navbar
- [x] Complete layout
- [ ] Implement Login
- [ ] Complete responsive design
- [ ] Display user information upon login

#### Mapbox
- [ ] Get environment variable to be working
- [ ] Pin all parks
- [ ] Move over all css data for popup

## Development Info
### OAuth Info
[Youtube Tutorial](https://www.youtube.com/watch?v=GuHN_ZqHExs)

### Map Services
- [Mapbox](https://docs.mapbox.com/mapbox-gl-js/guides/install/)
    - Has 50,000 load limits per month
- [MapLibre](https://maplibre.org/)
    - Free

### Better Coordinates for the Park
- API From OpenStreetMap
    - Query [boundary=national_park](https://wiki.openstreetmap.org/wiki/Tag:boundary%3Dnational_park)
    - Result needs to be a node, not Way
    - References: [Loading Data from OpenStreetMap with Python and the Overpass API](https://towardsdatascience.com/loading-data-from-openstreetmap-with-python-and-the-overpass-api-513882a27fd0)