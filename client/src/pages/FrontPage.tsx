import { useAtomValue } from "jotai";
import MapContainer from "../components/Map/MapContainer";
import NavBar from "../components/NavBar/NavBar";
import RatingsSidePanel from "../components/Ratings/RatingsSidePanel";
import { selectedParkAtom } from "../lib/atoms/atoms";

const FrontPage = () => {
    const selectedPark = useAtomValue(selectedParkAtom);

    return (
        <div className="flex flex-row items-center">
            <div className="flex flex-col w-full gap-4 p-6">
                <NavBar />
                <MapContainer />
            </div>
            {selectedPark && <RatingsSidePanel />}
        </div>
    );
};

export default FrontPage;
