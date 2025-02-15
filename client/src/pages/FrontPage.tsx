import { useAtomValue } from "jotai";
import MapContainer from "../components/Map/MapContainer";
import NavBar from "../components/NavBar/NavBar";
import RatingsSidePanel from "../components/Ratings/RatingsSidePanel";
import { selectedParkAtom } from "@lib/atoms/atoms";

const FrontPage = () => {
    const selectedPark = useAtomValue(selectedParkAtom);

    return (
        <div className="flex flex-col gap-2 sm:gap-4 p-2 sm:p-6 h-screen">
            <NavBar showSearchBar={true} />
            <div className="relative flex flex-row items-center gap-6 h-full">
                <MapContainer />
                {selectedPark && <RatingsSidePanel />}
            </div>
        </div>
    );
};

export default FrontPage;
