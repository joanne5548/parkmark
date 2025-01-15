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
        <div className="h-full">
            <Map
                ref={mapRef}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                initialViewState={{
                    longitude: -170.79921,
                    latitude: 42.436391,
                    zoom: 2,
                }}
                onLoad={handleOnMapLoad}
                style={{ width: "80vw", height: "80vh" }}
                mapStyle="mapbox://styles/mapbox/outdoors-v12"
            ></Map>
        </div>
    );
};

export default MapContainer;
