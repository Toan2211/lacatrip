import React, { useCallback, useState } from 'react'
import {
    GoogleMap,
    InfoWindow,
    Marker,
    useJsApiLoader
} from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%'
}

function GoogleMaps({ center, markers }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${import.meta.env.VITE_GOOGLEMAP_KEY}`
    })
    const [map, setMap] = useState(null)
    const [activeMarker, setActiveMarker] = useState(null)

    const handleActiveMarker = marker => {
        if (marker === activeMarker) {
            return
        }
        setActiveMarker(marker)
    }

    const onLoad = useCallback(
        function callback(map) {
            // This is just an example of getting and using the map instance!!! don't just blindly copy!
            const bounds = new window.google.maps.LatLngBounds(center)
            if (markers)
                markers.forEach(({ position }) =>
                    bounds.extend(position)
                )
            map.fitBounds(bounds)

            setMap(map)
        },
        [center, markers]
    )

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {markers &&
                markers.map(({ id, name, position }) => (
                    <Marker
                        key={id}
                        position={position}
                        onClick={() => handleActiveMarker(id)}
                    >
                        {activeMarker === id ? (
                            <InfoWindow
                                onCloseClick={() =>
                                    setActiveMarker(null)
                                }
                            >
                                <div>{name}</div>
                            </InfoWindow>
                        ) : null}
                    </Marker>
                ))}
            <></>
        </GoogleMap>
    ) : (
        <></>
    )
}

export default React.memo(GoogleMaps)
