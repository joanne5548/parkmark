import csv
import json

with open('./NationalParks.csv', 'r', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    json_data = []

    for row in csv_reader:
        json_data.append(row)

with open('data.json', 'w') as json_file:
    json.dump(json_data, json_file, indent=4)