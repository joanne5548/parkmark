import { useRef } from "react";
import { Map, MapRef, MapEvent } from "react-map-gl";
import CustomMarker from "./CustomMarker";
// path alias doesn't work! @json_data/...
import parkList from "../../../../scripts/json_data/park_list_with_uuid.json";
// import parkList from "../../../../scripts/json_data/test.json";

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapContainer = () => {
    const mapRef = useRef<MapRef>(null);

    const handleOnMapLoad = (event: MapEvent) => {
        event.target.flyTo({
            center: [-98.618002, 38.724452],
            zoom: 3.85,
            duration: 2000,
            essential: true,
        });
    };

    return (
        <div className="flex items-center justify-center h-full">
            <div className="h-[88vh] 3xl:h-[90vh] w-full rounded-xl overflow-hidden">
                <Map
                    ref={mapRef}
                    mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
                    initialViewState={{
                        longitude: -170.79921,
                        latitude: 42.436391,
                        zoom: 2,
                    }}
                    onLoad={handleOnMapLoad}
                    style={{ width: "100%", height: "100%" }}
                    mapStyle="mapbox://styles/mapbox/outdoors-v12"
                >
                    {parkList.map((park) => {
                        const longitude: number = Number(park.park_info.coordinates.longitude);
                        const latitude: number = Number(park.park_info.coordinates.latitude);
                        if (!isNaN(longitude) && isFinite(longitude) && !isNaN(latitude) && isFinite(latitude)) {
                            return <CustomMarker
                                key={`[${longitude}, ${latitude}]`}
                                parkInfoJson={park}
                                mapRef={mapRef}
                            />
                        } else {
                            throw Error(
                                "Longitude/latitude of park location string is not a valid number"
                            );
                        }
                    })}
                </Map>
            </div>
        </div>
    );
};

export default MapContainer;
