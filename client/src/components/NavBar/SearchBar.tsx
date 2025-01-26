import { useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import parkList from "@json_data/park_list_with_uuid.json";
import { NationalPark } from "@lib/interfaces";
import { generateSuggestedPark } from "@lib/searchBar";
import { useSetAtom } from "jotai";
import { selectedParkAtom } from "@lib/atoms/atoms";

const SearchBar = () => {
    const searchRef = useRef<HTMLInputElement>(null);
    const [searchIsActive, setSearchIsActive] = useState<boolean>(false);
    const [suggestedParkList, setSuggestedParkList] = useState<NationalPark[]>(
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
        }
        else {
            setSearchBarExtraClasses("rounded-md");
            setSearchIsActive(false);
        }
    };

    const handleParkButtonClick = (park: NationalPark) => {
        setSelectedParkAtom(park);
        setSearchIsActive(false);
        setSearchBarExtraClasses("rounded-md");

        if (!searchRef.current) {
            return;
        }

        searchRef.current.value = "";
    };

    return (
        <div
            className={`relative flex flex-row items-center pl-2.5 w-[42%] max-h-10 gap-3 bg-white border-slate-300 border-2 ${searchBarExtraClasses}`}
        >
            <IoSearch className="size-5 text-slate-400" />
            <input
                ref={searchRef}
                onChange={handleSearchInputOnChange}
                placeholder="What's your favorite national park?"
                className="bg-inherit w-full outline-none text-slate-900 placeholder:text-slate-500"
            ></input>
            {searchIsActive && (
                <div
                    className="absolute left-[-2px] top-9 flex flex-col w-[calc(100%+4px)] max-h-52 overflow-y-auto text-[17px]
                            shadow-lg bg-white border-slate-300 border-2 border-t-0 rounded-b-md z-[1001]"
                >
                    {suggestedParkList.map((park) => {
                        return (
                            <button
                                onClick={() => {
                                    handleParkButtonClick(park);
                                }}
                                className="flex flex-row gap-3 py-2 pl-2.5 text-start text-slate-600 w-full hover:bg-slate-100"
                            >
                                <IoSearch className="size-5 text-slate-400" />
                                {park.name}{" "}
                                <span className="text-slate-400 pl-2">
                                    {park.park_info.states}
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
