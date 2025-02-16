import { useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import parkList from "@json_data/park_list_with_uuid.json";
import { ParkInfoJson } from "@lib/interfaces";
import { generateSuggestedPark } from "@lib/searchBar";
import { useSetAtom } from "jotai";
import { selectedParkAtom } from "@lib/atoms/atoms";

interface SearchBarProps {
    showSearchBar: boolean;
}

const SearchBar = ({ showSearchBar }: SearchBarProps) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const [searchIsActive, setSearchIsActive] = useState<boolean>(false);
    const [suggestedParkList, setSuggestedParkList] = useState<ParkInfoJson[]>(
        []
    );
    const setSelectedParkAtom = useSetAtom(selectedParkAtom);

    const [searchBarExtraClasses, setSearchBarExtraClasses] =
        useState<string>("rounded-md");

    const handleSearchInputOnChange = () => {
        if (!searchRef.current) {
            return;
        }
        if (searchRef.current.value.length === 0) {
            setSearchIsActive(false);
            setSearchBarExtraClasses("rounded-md");
            return;
        }

        const suggestedParkList = generateSuggestedPark(
            searchRef.current.value,
            parkList
        );

        setSuggestedParkList(suggestedParkList);

        if (suggestedParkList.length > 0) {
            setSearchBarExtraClasses("rounded-t-md border-b-0");
            setSearchIsActive(true);
        } else {
            setSearchBarExtraClasses("rounded-md");
            setSearchIsActive(false);
        }
    };

    const handleParkButtonClick = (park: ParkInfoJson) => {
        setSelectedParkAtom(park);
        setSearchIsActive(false);
        setSearchBarExtraClasses("rounded-md");

        if (!searchRef.current) {
            return;
        }

        searchRef.current.value = "";
    };

    return (
        <>
            {showSearchBar && (
                <div
                    className={`relative flex flex-row items-center pl-1.5 sm:pl-2.5 w-full sm:w-[42%] max-h-10 gap-1 sm:gap-3 bg-white border-slate-300 border-[1px] ${searchBarExtraClasses}`}
                >
                    <IoSearch className="size-5 text-slate-400" />
                    <input
                        ref={searchRef}
                        onChange={handleSearchInputOnChange}
                        placeholder="What's your favorite national park?" // Change this to 'Search' when window size is < 768px
                        className="bg-inherit w-full outline-none text-slate-900 placeholder:text-slate-500"
                    ></input>
                    {searchIsActive && (
                        <div
                            className="absolute left-[-1px] top-9 flex flex-col w-[calc(100%+2px)] max-h-52 overflow-y-auto text-[17px]
                            shadow-lg bg-white border-slate-300 border-[1px] border-t-0 rounded-b-md z-[1001]"
                        >
                            {suggestedParkList.map((park) => {
                                return (
                                    <button
                                        onClick={() => {
                                            handleParkButtonClick(park);
                                        }}
                                        className="flex flex-row gap-1 sm:gap-3 py-2 pl-1.5 sm:pl-2.5 w-full hover:bg-slate-100"
                                    >
                                        <IoSearch className="size-5 flex-shrink-0 text-slate-400" />
                                        <div className="flex flex-row justify-between sm:justify-normal w-full text-sm sm:text-base text-start text-slate-600">
                                            <div>{park.name}</div>
                                            <div className="text-slate-400 px-2 text-right">
                                                {park.park_info.states}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default SearchBar;
