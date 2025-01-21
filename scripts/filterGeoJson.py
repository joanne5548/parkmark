"""
The geojson data is obtained from NPS provided api: https://www.nps.gov/lib/npmap.js/4.0.0/examples/data/national-parks.geojson
Source: https://home1.nps.gov/maps/tools/npmap.js/examples/geojson-layer/
"""
import json
from operator import itemgetter

filtered_data = []
with open('./json_data/national-parks-nps.geojson') as json_file:
    json_data = json.load(json_file)
    for object in json_data['features']:
        name = object['properties']['Name']
        
        if 'National Park' in name:
            coordinates = object['geometry']['coordinates']
            filtered_data.append({
                "name": name,
                "coordiantes": {
                    "longitude": coordinates[0],
                    "latitude": coordinates[1]
                }
            })

    # There are 58 national parks - what are the 5 missing?
    print(len(filtered_data))
    # Sort the list by alphabetical order
    # is this the best way to sort?
    filtered_data = sorted(filtered_data, key=itemgetter("name"))

with open('./json_data/filtered_national_parks_nps.json', 'w') as json_file:
    json.dump(filtered_data, json_file, indent=4)