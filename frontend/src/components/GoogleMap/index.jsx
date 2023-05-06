import React from 'react'
import GoogleMapReact from 'google-map-react'
const Marker = props => {
    return (
        <div className=" bg-lime-700 w-[30px] h-[30px] flex justify-center items-center hover:bg-red-800">
            <span>Địa điểm</span>
        </div>
    )
}
const GoogleMaps = ({ latitude, longitude, children }) => {
    return (
        <div style={{ height: '50vh', width: '50%' }}>
            <GoogleMapReact
                bootstrapURLKeys={import.meta.env.VITE_GOOGLEMAP_KEY}
                center={{ lat: latitude, lng: longitude }}
                zoom={13}
                yesIWantToUseGoogleMapApiInternals
            >
                {children}
            </GoogleMapReact>
        </div>
    )
}

export default GoogleMaps
