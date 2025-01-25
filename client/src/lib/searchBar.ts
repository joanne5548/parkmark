import { NationalPark } from "./interfaces";

export const generateSuggestedPark = (
    input: string,
    parkList: NationalPark[]
) => {
    let suggestedParkList: NationalPark[] = [];

    parkList.forEach((park) => {
        if (park.name.toLowerCase().includes(input)) {
            suggestedParkList.push(park);
        }
    });

    return suggestedParkList;
};
