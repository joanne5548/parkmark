import React, { Dispatch } from 'react'
import { Popup } from 'react-map-gl';

interface CustomPopupProps {
    longitude: number;
    latitude: number;
    setMarkerHovered: Dispatch<React.SetStateAction<boolean>>;
    setMarkerClicked: Dispatch<React.SetStateAction<boolean>>;
}

const CustomPopup: React.FC<CustomPopupProps> = ({ longitude, latitude, setMarkerHovered, setMarkerClicked }) => {
  return (
    <Popup
            longitude={longitude}
            latitude={latitude}
            closeOnClick={false}
            onClose={() => {
                setMarkerHovered(false);
                setMarkerClicked(false);
            }}
        >
            <div className="text-center text-2xl">Death Valley</div>
            <div className="text-center text-lg">Average Rating</div>
            <div className="text-lg">put stars here</div>
            <div className="text-3xl">put pictures here</div>
        </Popup>
  )
}

export default CustomPopup
