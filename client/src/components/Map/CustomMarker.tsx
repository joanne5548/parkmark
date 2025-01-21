import React, { RefObject, useEffect, useRef, useState } from "react";
import { MapRef, Marker } from "react-map-gl";
import CustomPopup from "./CustomPopup";
import { HiMapPin } from "react-icons/hi2";

interface CustomMarkerProps {
    parkInfoJson: {
        name: string;
        coordiantes: {
            longitude: number;
            latitude: number;
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

    const handleMarkerClick = () => {
        setMarkerClicked(!markerClicked);
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
            longitude={parkInfoJson.coordiantes.longitude}
            latitude={parkInfoJson.coordiantes.latitude}
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
