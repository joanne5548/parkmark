import { useSetAtom } from "jotai";
import React from "react";
import { Popup } from "react-map-gl";
import { selectedParkAtom } from "../../lib/atoms/atoms";
import RatingStatistics from "./RatingStatistics";

interface CustomPopupProps {
    parkInfoJson: {
        id: string;
        name: string;
        park_info: {
            coordinates: {
                longitude: number;
                latitude: number;
            };
        };
    };
    handlePopupClose: () => void;
}

const CustomPopup: React.FC<CustomPopupProps> = ({
    parkInfoJson,
    handlePopupClose,
}) => {
    const setSelectedPark = useSetAtom(selectedParkAtom);

    const handleParkNameButtonOnClick = () => {
        setSelectedPark(parkInfoJson);
    }

    return (
        <Popup
            longitude={parkInfoJson.park_info.coordinates.longitude}
            latitude={parkInfoJson.park_info.coordinates.latitude}
            offset={8}
            maxWidth=""
            closeOnClick={false}
            onClose={() => {
                handlePopupClose();
            }}
        >
            <div className="flex flex-col gap-4 items-center">
                <button
                    onClick={handleParkNameButtonOnClick}
                    className="text-center text-2xl font-medium border-none hover:underline"
                >
                    {parkInfoJson.name}
                </button>
                <RatingStatistics parkId={parkInfoJson.id} />
            </div>
        </Popup>
    );
};

export default CustomPopup;
