import json

def check_missing_park_list():
    park_list_mine = []
    with open('./json_data/filtered_national_parks_nps.json', 'r') as json_file:
        json_data = json.load(json_file)
        for park in json_data:
            # Lowercase all of park names for better search
            park_list_mine.append(park['name'].lower())
    print(park_list_mine)

    park_list_correct = []
    with open('./raw_data/filtered_national_park_name_list_full.txt', 'r', encoding="utf8") as txt_file:
        for line in txt_file:
            park_list_correct.append(line.strip().lower())
    print(park_list_correct)

    park_list_missing = []
    for park in park_list_correct:
        park_exists = any(park in my_park_name for my_park_name in park_list_mine)
        if (not park_exists):
            park_list_missing.append(park)

    return park_list_missing
    
# Missing park list:
[
    'capital reef', # exists, spelling was different (Capitol Reef National Park). Fixed.
    'gateway arch', # added
    'haleakalā', # exists, missing special character. Fixed.
    'hawaiʻi volcanoes', # exists, missing special character. Fixed.
    'indiana dunes', # added
    'new river gorge', # added
    'pinnacles', # added
    'redwood', # added
    'white sands', # added
    'wrangell–st.\xa0elias' # exists, missing special character. Only first special character – is fixed.
]

def main():
    park_list_missing = check_missing_park_list()
    print(park_list_missing)

    # Final Check
    with open('./json_data/filtered_national_parks_nps.json', 'r', encoding="utf8") as json_file:
        json_data = json.load(json_file)

    print(len(json_data))