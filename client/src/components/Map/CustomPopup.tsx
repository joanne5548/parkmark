import React from "react";
import { Popup } from "react-map-gl";

interface CustomPopupProps {
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
    handlePopupClose: () => void;
}

const CustomPopup: React.FC<CustomPopupProps> = ({
    parkInfoJson,
    handlePopupClose,
}) => {
    return (
        <Popup
            longitude={parkInfoJson.park_info.coordinates.longitude}
            latitude={parkInfoJson.park_info.coordinates.latitude}
            offset={8}
            maxWidth=""
            closeOnClick={false}
            onClose={() => {
                handlePopupClose();
            }}
        >
            <div className="flex flex-col gap-2">
                {/* <Link
                    to={`/park/${parkInfoJson.name.replace(/\s/g, "").toLowerCase()}`}
                    // this keeps highlighting when mouse hovers over marker
                    className="text-center text-2xl font-medium hover:underline border-none hover:border-none"
                >
                    {parkInfoJson.name}
                </Link> */}
                <div className="text-center text-2xl font-medium border-none">{parkInfoJson.name}</div>
                <div className="text-center text-lg">Average Rating</div>
                <div className="text-lg">put stars here</div>
                <div className="text-lg">put pictures here</div>
            </div>
        </Popup>
    );
};

export default CustomPopup;
