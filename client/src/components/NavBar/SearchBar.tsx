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

    const handleSearchInputOnChange = () => {
        if (!searchRef.current) {
            return;
        }
        if (searchRef.current.value.length === 0) {
            setSearchIsActive(false);
            return;
        }

        const suggestedParkList = generateSuggestedPark(
            searchRef.current.value,
            parkList
        );

        setSuggestedParkList(suggestedParkList);

        setSearchIsActive(true);
    };

    const handleParkButtonClick = (park: NationalPark) => {
        setSelectedParkAtom(park);
    };

    return (
        <div className="relative flex flex-row items-center pl-2.5 w-5/12 max-h-10 gap-3 bg-slate-200 rounded-md">
            <IoSearch className="size-5 text-slate-500" />
            <input
                ref={searchRef}
                onChange={handleSearchInputOnChange}
                placeholder="What's your favorite national park?"
                className="bg-inherit w-full outline-none text-slate-900 placeholder:text-slate-500"
            ></input>
            {searchIsActive && (
                <div className="absolute left-0 top-10 flex flex-col w-full max-h-52 overflow-y-auto text-[17px] bg-slate-200 rounded;-md z-[1000]">
                    {suggestedParkList.map((park) => {
                        return (
                            <button
                                onClick={() => {
                                    handleParkButtonClick(park);
                                    setSearchIsActive(false);
                                }}
                                className="py-2 text-slate-600 w-full rounded-md hover:bg-slate-100"
                            >
                                {park.name}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
