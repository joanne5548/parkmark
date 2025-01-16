import React, { RefObject, useEffect, useRef, useState } from "react";
import { LuMapPin } from "react-icons/lu";
import { MapRef, Marker } from "react-map-gl";
import CustomPopup from "./CustomPopup";

interface CustomMarkerProps {
    longitude: number;
    latitude: number;
    mapRef: RefObject<MapRef>;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
    longitude,
    latitude,
    mapRef,
}) => {
    const [markerHovered, setMarkerHovered] = useState<boolean>(false);
    const [markerClicked, setMarkerClicked] = useState<boolean>(false);
    const [pinClassName, setPinClassName] = useState<string>(
        "text-red-500 size-6"
    );

    const handleMarkerClick = () => {
        setMarkerClicked(!markerClicked);
    };

    const handleMouseEnter = () => {
        setMarkerHovered(true);
    };

    const handleMouseLeave = () => {
        setMarkerHovered(false);
    };

    useEffect(() => {
        const updateMarkerSize = () => {
            const zoomCheck = mapRef.current?.getZoom();
            if (zoomCheck !== undefined) {
                let zoom: number = Math.round(zoomCheck);
                console.log(zoom);

                let size: number;
                if (zoom < 4) {
                    size = 5;
                } else if (zoom < 6) {
                    size = 6;
                } else {
                    size = 7;
                }

                setPinClassName(`size-${size} text-red-500`);
            }
        };

        updateMarkerSize();

        const map = mapRef.current;
        if (map) {
            map.on("zoom", updateMarkerSize);

            return () => {
                map.off('zoom', updateMarkerSize);
            }
        }
    }, [mapRef.current]);

    return (
        <Marker
            longitude={longitude}
            latitude={latitude}
            onClick={handleMarkerClick}
        >
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => {
                    setTimeout(handleMouseLeave, 20);
                }}
            >
                <LuMapPin className={pinClassName} />
                {(markerClicked || markerHovered) && (
                    <CustomPopup
                        longitude={longitude}
                        latitude={latitude}
                        setMarkerHovered={setMarkerHovered}
                        setMarkerClicked={setMarkerClicked}
                    />
                )}
            </div>
        </Marker>
    );
};

export default CustomMarker;
