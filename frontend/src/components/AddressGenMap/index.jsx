import InputField from '@components/InputField'
import GoogleMaps from '@components/GoogleMap'
import React, { useState } from 'react'
import Geocode from 'react-geocode'
import Mybutton from '@components/MyButton'
Geocode.setApiKey(import.meta.env.VITE_GEOCODE_APIKEY)
Geocode.setLanguage(import.meta.env.VITE_GEOCODE_LANGUAGE)
Geocode.setRegion(import.meta.env.VITE_GEOCODE_REGION)
Geocode.setLocationType(import.meta.env.VITE_GEOCODE_LOCATIONTYPE)
Geocode.enableDebug()
function AddressGenMap({ form }) {
    const [lat, setLat] = useState(() => form.getValues('latitude') || 16.0748)
    const [lon, setLon] = useState(() => form.getValues('longtitude') || 108.224)
    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition(postion => {
    //         setLat(postion.coords.latitude)
    //         setLon(postion.coords.longitude)
    //     })
    // }, [])
    const handleGenAddressToMap = () => {
        form.setValue('longtitude', 108.224)
        form.setValue('latitude', 16.0748)
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
                    Địa chỉ
                </label>
                <div className="flex gap-5 items-center">
                    <div className="flex-1">
                        <InputField
                            placeholder="Hãy nhập địa chỉ, nó sẽ hiển thị trên bản đồ"
                            form={form}
                            name="address"
                        />
                    </div>
                    <Mybutton
                        type="button"
                        onClick={handleGenAddressToMap}
                        className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/4 ease-linear transition-all duration-150"
                    >
                        Tìm kiếm
                    </Mybutton>
                </div>
            </div>
            <div className="relative w-full mb-2 flex space-x-4 ">
                <div className="relative w-1/2">
                    <label
                        className="block uppercase text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Kinh độ
                    </label>
                    <InputField
                        placeholder="Kinh độ"
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
                        Vĩ độ
                    </label>
                    <InputField
                        placeholder="Vĩ độ"
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
                    Bản đồ
                </label>
                <div className="h-[400px] w-2/3">
                    <GoogleMaps
                        center={{
                            lat: lat,
                            lng: lon
                        }}
                        markers={[
                            {
                                id: 9999,
                                name: 'Destination',
                                position: {
                                    lat: lat,
                                    lng: lon
                                }
                            }
                        ]}
                    ></GoogleMaps>
                </div>
            </div>
        </>
    )
}

export default AddressGenMap
