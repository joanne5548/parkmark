import React, { useEffect, useState } from "react";
import { Marker } from "react-map-gl";
import CustomPopup from "./CustomPopup";
import { HiMapPin } from "react-icons/hi2";
import { useAtom } from "jotai";
import { selectedParkAtom } from "@lib/atoms/atoms";
import { ParkInfoJson } from "@lib/interfaces";

interface CustomMarkerProps {
    parkInfoJson: ParkInfoJson
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
    parkInfoJson,
}) => {
    const [markerHovered, setMarkerHovered] = useState<boolean>(false);
    const [markerClicked, setMarkerClicked] = useState<boolean>(false);
    const [selectedPark, setSelectedPark] = useAtom(selectedParkAtom);

    const handleMarkerClick = () => {
        setMarkerClicked(true);
        setSelectedPark(parkInfoJson);
    };

    const handleMouseEnter = () => {
        setMarkerHovered(true);
    };

    const handleMouseLeave = () => {
        setMarkerHovered(false);
    };

    const handlePopupClose = () => {
        setMarkerHovered(false);
        setMarkerClicked(false);
    };

    useEffect(() => {
        if (!selectedPark) {
            handlePopupClose();
        }
    }, [selectedPark])

    return (
        <Marker
            longitude={parkInfoJson.park_info.coordinates.longitude}
            latitude={parkInfoJson.park_info.coordinates.latitude}
            onClick={handleMarkerClick}
        >
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => {
                    setTimeout(handleMouseLeave, 20);
                }}
            >
                <HiMapPin className="size-6 text-red-500 stroke-1 stroke-slate-800" />
                {(markerHovered || markerClicked || selectedPark?.id===parkInfoJson.id) && (
                    <CustomPopup
                        parkInfoJson={parkInfoJson}
                        handlePopupClose={handlePopupClose}
                    />
                )}
            </div>
        </Marker>
    );
};

export default CustomMarker;
