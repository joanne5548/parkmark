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
    const [pinClassName, setPinClassName] = useState<string>("");
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

    useEffect(() => {
        const updateMarkerSize = () => {
            const zoomCheck = mapRef.current?.getZoom();
            if (zoomCheck !== undefined) {
                let zoom: number = Math.round(zoomCheck);

                let size: number;
                if (zoom < 4) {
                    size = 5;
                } else if (zoom < 6) {
                    size = 6;
                } else {
                    size = 7;
                }

                setPinClassName(
                    `size-${size} text-red-500 stroke-1 stroke-slate-800`
                );
            }
        };

        updateMarkerSize();

        const map = mapRef.current;
        if (map) {
            map.on("zoom", updateMarkerSize);

            return () => {
                map.off("zoom", updateMarkerSize);
            };
        }
    }, [mapRef.current]);

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
                <HiMapPin className={pinClassName} />
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
