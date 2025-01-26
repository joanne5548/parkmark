import { useEffect, useRef } from "react";
import { Map, MapRef, MapEvent } from "react-map-gl";
import CustomMarker from "./CustomMarker";
// import parkList from "@json_data/test.json";
import parkList from "@json_data/park_list_with_uuid.json";
import { useAtomValue } from "jotai";
import { selectedParkAtom } from "@lib/atoms/atoms";

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapContainer = () => {
    const mapRef = useRef<MapRef>(null);
    const selectedPark = useAtomValue(selectedParkAtom)

    const handleOnMapLoad = (event: MapEvent) => {
        event.target.flyTo({
            center: [-98.618002, 38.724452],
            zoom: 3.85,
            duration: 2000,
            essential: true,
        });
    };

    useEffect(() => {
        if (!selectedPark) {
            return;
        }

        mapRef.current?.flyTo({
            center: [
                selectedPark.park_info.coordinates.longitude+0.02,
                selectedPark.park_info.coordinates.latitude+0.0125,
            ],
            zoom: 13,
            duration: 2750,
        });

        return () => {
            // close current popup?
            // do I have to maintain list of refs of every popup to close them here
            // wait why does this work when closing the review tab
        }
    }, [selectedPark])

    return (
        <div className="flex items-center w-full h-full">
            <div className="w-full h-full rounded-xl overflow-hidden">
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
                        const longitude: number = Number(
                            park.park_info.coordinates.longitude
                        );
                        const latitude: number = Number(
                            park.park_info.coordinates.latitude
                        );
                        if (
                            !isNaN(longitude) &&
                            isFinite(longitude) &&
                            !isNaN(latitude) &&
                            isFinite(latitude)
                        ) {
                            return (
                                <CustomMarker
                                    key={`[${longitude}, ${latitude}]`}
                                    parkInfoJson={park}
                                />
                            );
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
