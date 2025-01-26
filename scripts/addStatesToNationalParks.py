import csv
import json

def addStates():
    state_dict = {}
    with open("./raw_data/NationalParks.csv", 'r' , encoding="utf8") as csv_file:
        csv_reader = csv.reader(csv_file)
        next(csv_reader)
        for row in csv_reader:
            state_dict[row[0].lower() + " national park"] = row[1]

    with open("./json_data/park_list_with_uuid.json", 'r') as json_file:
        json_data = json.load(json_file)
        count = 0
        for park in json_data:
            park_name = park["name"].lower()
            if park_name in state_dict:
                park["park_info"]["states"] = state_dict[park_name]
                count += 1
        print(count)
        
    with open("./json_data/park_list_with_uuid.json", 'w') as json_file:
        json_file.write(json.dumps(json_data, indent=4))

def main():
    addStates()

if __name__=="__main__":
    main()