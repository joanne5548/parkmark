"""
Tried Nominatim API, but it only returns results exactly matches query (national park).
Results are stored in ./json_data/location.geo.json
"""
import requests
import json

def get_address():
    url = "https://nominatim.openstreetmap.org/search?q=*national+park*&countrycodes=us&format=geocodejson"
    headers = {
        'User-Agent': 'parkmark'
    }

    try:
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            data = response.json()
            return data
        else:
            print('Error', response.status_code)
            return None
    except requests.exceptions.RequestException as e:
        print('Error:', e)
        return None
    
def main():
    data = get_address()
    if data:
        print("Yooo")
        with open('./json_data/location.geo.json', 'w') as json_file:
            json.dump(data, json_file, indent=4)
    else:
        print("Failed to fetch data from api call")

if __name__ == '__main__':
    main()