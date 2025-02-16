import requests
from bs4 import BeautifulSoup
import re
import json
from tqdm import tqdm


def get_park_info(url):
    try:
        response = requests.get(url)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")

        park_info = {"background_url": None, "title": None, "description": None}

        background_div = soup.find("div", class_="picturefill-background")
        if background_div and "style" in background_div.attrs:
            style = background_div["style"]
            url_match = re.search(r'url\(["\']?([^)"\']+)["\']?\)', style)

            if url_match:
                image_path = url_match.group(1)
                image_path = image_path.replace("&amp;", "&")

                if image_path.startswith("/"):
                    image_path = f"https://www.nps.gov{image_path}"

                park_info["background_url"] = image_path

        title_element = soup.find("h1", class_="page-title park-title")
        if title_element:
            park_info["title"] = title_element.text.strip()

        if title_element:
            description = title_element.find_next("p")
            if description:
                park_info["description"] = description.text.strip()

        return park_info

    except requests.RequestException as e:
        print(f"Error fetching the webpage: {e}")
        return None


def test():
    park_url = (
        "https://www.nps.gov/ever/index.htm"
    )
    park_info = get_park_info(park_url)

    if park_info:
        print("Park Information:")
        print("-" * 50)
        if park_info["title"]:
            print(f"Title: {park_info['title']}")
        if park_info["description"]:
            print(f"\nDescription: {park_info['description']}")
        if park_info["background_url"]:
            print(f"\nBackground image URL: {park_info['background_url']}")
    else:
        print("Could not fetch park information")


def scrapeAll():
    with open("./json_data/park_list_with_uuid.json", "r") as json_file:
        json_data = json.load(json_file)

    for park in tqdm(json_data):
        park_url = park["park_info"]["nps_url"]
        park_details = get_park_info(park_url)

        park["park_info"]["description"] = {
            "title": park_details["title"],
            "content": park_details["description"]
        }
        park["park_info"]["img_url"] = park_details["background_url"]

    with open("./json_data/park_list_with_uuid.json", "w") as json_file:
        json_file.write(json.dumps(json_data, indent=4))


def main():
    scrapeAll()


if __name__ == "__main__":
    main()