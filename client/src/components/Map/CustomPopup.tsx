import React, { Dispatch } from "react";
import { Popup } from "react-map-gl";
import { Link } from "react-router-dom";

interface CustomPopupProps {
    parkInfoJson: {
        name: string;
        coordiantes: {
            longitude: number;
            latitude: number;
        };
    };
    setMarkerHovered: Dispatch<React.SetStateAction<boolean>>;
    setMarkerClicked: Dispatch<React.SetStateAction<boolean>>;
}

const CustomPopup: React.FC<CustomPopupProps> = ({
    parkInfoJson,
    setMarkerHovered,
    setMarkerClicked,
}) => {
    return (
        <Popup
            longitude={parkInfoJson.coordiantes.longitude}
            latitude={parkInfoJson.coordiantes.latitude}
            offset={8}
            maxWidth=""
            closeOnClick={false}
            onClose={() => {
                setMarkerHovered(false);
                setMarkerClicked(false);
            }}
        >
            <div className="flex flex-col gap-2">
                <Link
                    to={`/nationalpark/${parkInfoJson.name.replace(/\s/g, "").toLowerCase()}`}
                    // this keeps highlighting when mouse hovers over marker
                    className="text-center text-2xl font-medium hover:text-lime-900 hover:underline border-none hover:border-none"
                >
                    {parkInfoJson.name}
                </Link>
                <div className="text-center text-lg">Average Rating</div>
                <div className="text-lg">put stars here</div>
                <div className="text-lg">put pictures here</div>
            </div>
        </Popup>
    );
};

export default CustomPopup;
