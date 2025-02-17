import { useAtomValue } from "jotai";
import MapContainer from "../components/Map/MapContainer";
import NavBar from "../components/NavBar/NavBar";
import RatingsSidePanel from "../components/Ratings/RatingsSidePanel";
import { selectedParkAtom } from "@lib/atoms/atoms";
import Banner from "./Banner";

const FrontPage = () => {
    const selectedPark = useAtomValue(selectedParkAtom);

    return (
        <div className="flex flex-col gap-2 sm:gap-1 p-2 sm:p-6 sm:pb-1 h-screen">
            <NavBar showSearchBar={true} />
            <div className="relative flex flex-row items-center gap-6 h-full">
                <MapContainer />
                {selectedPark && <RatingsSidePanel />}
            </div>
            <Banner />
        </div>
    );
};

export default FrontPage;
