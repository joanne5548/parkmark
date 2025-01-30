import { useEffect, useRef, useState } from "react";
import { Map, MapRef, MapEvent, LngLatLike } from "react-map-gl";
import CustomMarker from "./Widgets/CustomMarker";
import parkList from "@json_data/park_list_with_uuid.json";
import { useAtom } from "jotai";
import { selectedParkAtom } from "@lib/atoms/atoms";
import ResetButton from "./Widgets/ResetButton";

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapContainer = () => {
    const mapRef = useRef<MapRef>(null);
    const [selectedPark, setSelectedPark] = useAtom(selectedParkAtom);
    const [responsiveZoomLevel, setResponsiveZoomLevel] = useState<number>(3.65);

    const handleOnMapLoad = (event: MapEvent) => {
        event.target.flyTo({
            center: [-98.618002, 38.724452],
            zoom: responsiveZoomLevel,
            duration: 2000,
            essential: true,
        });
    };

    const handleResetButtonOnClick = () => {
        mapRef.current?.flyTo({
            center: [-98.618002, 38.724452],
            zoom: responsiveZoomLevel,
            duration: 2000,
            essential: true,
        });

        setSelectedPark(null);
    };

    useEffect(() => {
        if (window.innerWidth > 640) {
            setResponsiveZoomLevel(3.65);
        }
        else {
            setResponsiveZoomLevel(2.1);
        }

        if (!selectedPark) {
            return;
        }

        let center: LngLatLike = [selectedPark.park_info.coordinates.longitude, selectedPark.park_info.coordinates.latitude];

        if (window.innerWidth > 640) {
            center = [center[0] + 0.019, center[1] + 0.0125];
        }
        else {
            center = [center[0] + 0.00066, center[1] - 0.004];
        }

        mapRef.current?.flyTo({
            center: center,
            zoom: 13,
            duration: 2750,
        });

        return () => {
            // close current popup?
            // do I have to maintain list of refs of every popup to close them here
            // wait why does this work when closing the review tab
        };
    }, [selectedPark, window.innerWidth]);

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
                    <ResetButton handleResetButtonOnClick={handleResetButtonOnClick} />
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
