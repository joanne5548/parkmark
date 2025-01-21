import json
from uuid import uuid4

park_list_with_uuid = []
with open('./json_data/filtered_national_parks_nps.json') as park_list_without_uuid_file:
    park_list_without_uuid_data = json.load(park_list_without_uuid_file)
    for park in park_list_without_uuid_data:
    # park = park_list_without_uuid_data[0]
        uuid = uuid4()
        park_data = {
            "id": str(uuid),
            "name": park['name'],
            "park_info": {
                "coordinates": park['coordiantes']
            }
        }
        park_list_with_uuid.append(park_data)

with open('./json_data/park_list_with_uuid.json', 'w') as json_file:
    json.dump(park_list_with_uuid, json_file, indent=4)