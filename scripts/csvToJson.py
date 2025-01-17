"""
Used for converting csv with scrapped data from wikipedia national park
wikiParkLocation.json served as preliminary set for testing map setup
It's no longer used since the locaiton data wasn't accurate enough
"""
import csv
import json

with open('./NationalParks.csv', 'r', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    json_data = []

    for row in csv_reader:
        json_data.append(row)

with open('wikiParkLocation.json', 'w') as json_file:
    json.dump(json_data, json_file, indent=4)