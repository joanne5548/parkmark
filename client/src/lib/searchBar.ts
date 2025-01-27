import { NationalPark } from "@lib/interfaces";

export const generateSuggestedPark = (
    input: string,
    parkList: NationalPark[]
) => {
    let suggestedParkList: NationalPark[] = [];
    const prefixMatches = new Set();

    parkList.forEach((park) => {
        if (park.name.toLowerCase().startsWith(input)) {
            suggestedParkList.push(park);
            prefixMatches.add(park);
        }
    });
    parkList.forEach((park) => {
        if (
            park.name.toLowerCase().includes(input) &&
            !prefixMatches.has(park)
        ) {
            suggestedParkList.push(park);
        }
    });

    return suggestedParkList;
};
