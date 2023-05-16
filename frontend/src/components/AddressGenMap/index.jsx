import InputField from '@components/InputField'
import GoogleMaps from '@components/GoogleMap'
import Maker from '@components/Maker'
import React, { useState } from 'react'
import Geocode from 'react-geocode'
import Mybutton from '@components/MyButton'
Geocode.setApiKey(import.meta.env.VITE_GEOCODE_APIKEY)
Geocode.setLanguage(import.meta.env.VITE_GEOCODE_LANGUAGE)
Geocode.setRegion(import.meta.env.VITE_GEOCODE_REGION)
Geocode.setLocationType(import.meta.env.VITE_GEOCODE_LOCATIONTYPE)
Geocode.enableDebug()
function AddressGenMap({ form }) {
    const [lat, setLat] = useState(16.0748)
    const [lon, setLon] = useState(108.224)
    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition(postion => {
    //         setLat(postion.coords.latitude)
    //         setLon(postion.coords.longitude)
    //     })
    // }, [])
    const handleGenAddressToMap = () => {
        form.setValue('longtitude', 16.0748)
        form.setValue('latitude', 108.224)
        Geocode.fromAddress(form.getValues('address')).then(
            response => {
                const { lat, lng } =
                    response.results[0].geometry.location
                setLat(lat)
                setLon(lng)
                form.setValue('longtitude', lng)
                form.setValue('latitude', lat)
            },
            error => {
                // eslint-disable-next-line
                console.error(error)
            }
        )
    }
    return (
        <>
            <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-sm font-bold mb-2"
                    htmlFor="grid-password"
                >
                    Address
                </label>
                <div className="flex gap-5 items-center">
                    <div className="flex-1">
                        <InputField
                            placeholder="Address is required, it will show in Maps"
                            form={form}
                            name="address"
                        />
                    </div>
                    <Mybutton
                        type="button"
                        onClick={handleGenAddressToMap}
                        className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/4 ease-linear transition-all duration-150"
                    >
                        Show in Map
                    </Mybutton>
                </div>
            </div>
            <div className="relative w-full mb-2 flex space-x-4 ">
                <div className="relative w-1/2">
                    <label
                        className="block uppercase text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Longtitude
                    </label>
                    <InputField
                        placeholder="Longtitude of hotel"
                        type="number"
                        form={form}
                        name="longtitude"
                        disabled={true}
                    />
                </div>
                <div className="relative w-1/2">
                    <label
                        className="block uppercase text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Latitude
                    </label>
                    <InputField
                        placeholder="Latitude of hotel"
                        type="number"
                        form={form}
                        name="latitude"
                        disabled={true}
                    />
                </div>
            </div>
            <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-sm font-bold mb-2"
                    htmlFor="grid-password"
                >
                    Map
                </label>
                <GoogleMaps latitude={lat} longitude={lon}>
                    <Maker lat={lat} lng={lon} />
                </GoogleMaps>
            </div>
        </>
    )
}

export default AddressGenMap
