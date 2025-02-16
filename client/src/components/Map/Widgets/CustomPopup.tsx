import { useSetAtom } from "jotai";
import React from "react";
import { Popup } from "react-map-gl";
import { selectedParkAtom } from "@lib/atoms/atoms";
import RatingStatistics from "../RatingStats/RatingStatistics";
import { FiExternalLink } from "react-icons/fi";
import { ParkInfoJson } from "@lib/interfaces";

interface CustomPopupProps {
    parkInfoJson: ParkInfoJson
    handlePopupClose: () => void;
}

const CustomPopup: React.FC<CustomPopupProps> = ({
    parkInfoJson,
    handlePopupClose,
}) => {
    const setSelectedPark = useSetAtom(selectedParkAtom);

    return (
        <Popup
            longitude={parkInfoJson.park_info.coordinates.longitude}
            latitude={parkInfoJson.park_info.coordinates.latitude}
            offset={8}
            maxWidth="23.5rem"
            closeOnClick={false}
            onClose={() => {
                handlePopupClose();
                setSelectedPark(null);
            }}
        >
            <div className="flex flex-col gap-1 sm:gap-2 items-center">
                <a
                    href={parkInfoJson.park_info.nps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-lg sm:text-xl font-medium hover:underline"
                >
                    <span>
                        {parkInfoJson.name}{" "}
                        <FiExternalLink className="text-lg inline align-baseline" />
                    </span>
                </a>
                <RatingStatistics parkId={parkInfoJson.id} />
            </div>
        </Popup>
    );
};

export default CustomPopup;
