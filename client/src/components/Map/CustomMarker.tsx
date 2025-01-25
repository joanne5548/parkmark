import React, { RefObject, useEffect, useState } from "react";
import { MapRef, Marker } from "react-map-gl";
import CustomPopup from "./CustomPopup";
import { HiMapPin } from "react-icons/hi2";
import { useSetAtom } from "jotai";
import { selectedParkAtom } from "../../lib/atoms/atoms";

interface CustomMarkerProps {
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
    mapRef: RefObject<MapRef>;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
    parkInfoJson,
    mapRef,
}) => {
    const [markerHovered, setMarkerHovered] = useState<boolean>(false);
    const [markerClicked, setMarkerClicked] = useState<boolean>(false);
    const setSelectedParkAtom = useSetAtom(selectedParkAtom);

    const handleMarkerClick = () => {
        setMarkerClicked(true);
        setSelectedParkAtom(parkInfoJson);
        mapRef.current?.flyTo({
            center: [
                parkInfoJson.park_info.coordinates.longitude,
                parkInfoJson.park_info.coordinates.latitude,
            ],
            zoom: 13,
            duration: 2750,
        });
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
                {(markerHovered || markerClicked) && (
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
