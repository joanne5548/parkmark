import { useAtomValue } from "jotai";
import MapContainer from "../components/Map/MapContainer";
import NavBar from "../components/NavBar/NavBar";
import RatingsSidePanel from "../components/Ratings/RatingsSidePanel";
import { selectedParkAtom } from "@lib/atoms/atoms";

const FrontPage = () => {
    const selectedPark = useAtomValue(selectedParkAtom);

    return (
        <div className="flex flex-col gap-2 sm:gap-4 p-2 sm:p-6 h-screen">
            <NavBar />
            <div className="flex-1 min-h-0 overflow-auto relative flex flex-row items-center gap-6">
                <MapContainer />
                {selectedPark && <RatingsSidePanel />}
            </div>
            {/* <div className="hidden sm:block self-end text-xs underline underline-offset-2 text-slate-600">
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/joanne5548/parkmark"
                >
                    Check out the source code!
                </a>
            </div> */}
        </div>
    );
};

export default FrontPage;
