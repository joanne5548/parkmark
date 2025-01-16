import React, { RefObject, useEffect, useRef, useState } from "react";
import { LuMapPin } from "react-icons/lu";
import { MapRef, Marker } from "react-map-gl";

interface CustomMarkerProps {
    longitude: number;
    latitude: number;
    mapRef: RefObject<MapRef>;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ longitude, latitude, mapRef }) => {
    const [markerHovered, setMarkerHovered] = useState<boolean>(false);
    const [markerClicked, setMarkerClicked] = useState<boolean>(false);
    const [pinClassName, setPinClassName] = useState<string>("text-red-500 size-6");

    const handleMarkerClick = () => {
        setMarkerClicked(!markerClicked);
    };

    const handleMouseEnter = () => {
        setMarkerHovered(true);
    };

    const handleMouseLeave = () => {
        setMarkerHovered(false);
    }

    useEffect(() => {
        console.log('zoom has changed');
        
        const zoomCheck = mapRef.current?.getZoom();
        if (zoomCheck !== undefined) {
            let zoom: number = Math.round(zoomCheck);
            console.log(zoom);

            if (zoom <= 3) { zoom = 3; }
            else if (zoom > 3) { zoom = 4; }

            setPinClassName(`size-${zoom + 2} text-red-500`);
        }
    }, [mapRef.current?.getZoom()]);

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
                {/* {(markerClicked || markerHovered) && (
                    <CustomPopup
                        longitude={longitude}
                        latitude={latitude}
                        setMarkerHovered={setMarkerHovered}
                        setMarkerClicked={setMarkerClicked}
                    />
                )} */}
            </div>
        </Marker>
    );
};

export default CustomMarker;
