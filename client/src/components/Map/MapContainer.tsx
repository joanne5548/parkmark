import React, { useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map, MapRef, MapEvent } from "react-map-gl";

const MapContainer = () => {
    const mapRef = useRef<MapRef>(null);

    const handleOnMapLoad = (event: MapEvent) => {
        event.target.flyTo({
            center: [-97.544713, 37.739463],
            zoom: 3.85,
            duration: 2000,
            essential: true,
        })
    }

    return (
        <div className="flex items-center justify-center h-full">
            <div className="h-[90vh] w-[95vw] rounded-xl overflow-hidden">
                <Map
                    ref={mapRef}
                    mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                    initialViewState={{
                        longitude: -170.79921,
                        latitude: 42.436391,
                        zoom: 2,
                    }}
                    onLoad={handleOnMapLoad}
                    style={{ width: "100%", height: "100%" }}
                    mapStyle="mapbox://styles/mapbox/outdoors-v12"
                ></Map>
            </div>
        </div>
    );
};

export default MapContainer;
