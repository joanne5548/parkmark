import json
import requests
from requests.exceptions import RequestException

overrides = {
    "Gates Of The Arctic National Park & Preserve": "gaar",
    "National Park of American Samoa": "npsa",
    "Sequoia & Kings Canyon National Parks": "seki",
    "Carlsbad Caverns National Park": "cave",
    "Wrangell\u2013St Elias National Park & Preserve": "wrst",
    "Katmai National Park & Preserve": "katm",
}


def createNpsUrl(name):
    if name in overrides:
        park_code = overrides[name]
    else:
        parts = name.lower().split(" ")
        if len(parts) <= 3:  # One park name. eg: Yellowstone National Park
            park_code = name[:4].lower()
        else:  # Two or more park name. eg: Grand Teton National Park
            park_code = parts[0][:2] + parts[1][:2]
    return f"https://www.nps.gov/{park_code}/index.htm"


def checkUrls(urls):
    for url in urls:
        response = requests.get(url)
        if response.status_code != 200:
            print(url)


def generateAndCheckUrls():
    url_list = []
    print("Checking if the generated URLs are valid ...")
    with open("./json_data/park_list_with_uuid.json", "r") as json_file:
        json_data = json.load(json_file)
        for park in json_data:
            url_list.append(createNpsUrl(park["name"]))
    checkUrls(url_list)
    print("Checking done!")


def addUrlToJson():
    with open("./json_data/park_list_with_uuid.json", "r") as json_file:
        json_data = json.load(json_file)
        for park in json_data:
            park["park_info"]["nps_url"] = createNpsUrl(park["name"])

        # print(json_data[0])

    with open("./json_data/park_list_with_uuid.json", "w") as json_file:
        json_file.write(json.dumps(json_data, indent=4))


def sendPutRequestDev(backend_url, park_id, payload):
    try:
        response = requests.put(f"{backend_url}/{park_id}", json=payload, timeout=10)
        response.raise_for_status()
        return True
    except RequestException as e:
        print(f"Failed to update park id: {park_id}")
        return False


def sendPutRequestProd(backend_url, park_id, payload, headers):
    try:
        response = requests.put(
            f"{backend_url}/{park_id}", json=payload, headers=headers, timeout=10
        )
        response.raise_for_status()
        return True
    except RequestException as e:
        print(f"Failed to update park id: {park_id}\nError: {e}")
        return False


def updateTableInDatabase():
    dev_backend_url = "http://localhost:5000/api/nationalpark"
    prod_backend_url = "https://parkmark-153383262818.us-east1.run.app/api/nationalpark"

    headers = {
        "Content-Type": "application/json",
    }

    with open("./json_data/park_list_with_uuid.json", "r") as json_file:
        json_data = json.load(json_file)

    for park in json_data:
        park_id = park.get("id")
        payload = {"name": park.get("name"), "park_info": park.get("park_info")}
        sendPutRequestProd(prod_backend_url, park_id, payload, headers)


def main():
    # generateAndCheckUrls()
    # addUrlToJson()
    updateTableInDatabase()


if __name__ == "__main__":
    main()
