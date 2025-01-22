import requests
import json

def post_national_park(park_json_data):
    endpoint = "http://localhost:5000/api/nationalpark"

    try:
        response = requests.post(endpoint, json=park_json_data)
        
        if response.status_code == 200:
            return response.json()
        else:
            print("Error:", response.status_code)
            return None
    
    except requests.exceptions.RequestException as e:
        print("Error:", e)
        return None
    
def main():
    with open('./json_data/park_list_with_uuid.json', 'r') as json_file:
        park_list = json.load(json_file)

    for park in park_list:
        response = post_national_park(park)

if __name__ == "__main__":
    main()