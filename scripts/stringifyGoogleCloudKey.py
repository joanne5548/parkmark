import json

with open("../secrets/service-account-key.json", 'r') as json_file:
    json_data = json.load(json_file)
    json_data = json.dumps(json_data)
    print(json_data)