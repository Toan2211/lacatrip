import InputField from '@components/InputField'
import TextArea from '@components/TextArea'
import { amenitiesHotelSelector } from '@pages/CommonProperty/baseproperty'
import PhotoUploads from '@components/PhotoUploads'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import AddressGenMap from '@components/AddressGenMap'
import { hotelStyle } from '@constants/hotelStyle'
import Mybutton from '@components/MyButton'
const animatedComponents = makeAnimated()
import * as yup from 'yup'
import { phoneRegExp } from '@constants/regex'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { serviceManagersSelector } from '@pages/System/ServiceManagers/servicemanager.slice'
import { getServiceManagers } from '@pages/System/ServiceManagers/servicemanager.slice'
import MySelect from '@components/MySelect'
import {
    createHotel,
    currentHotelSelector,
    getHotelById,
    loadingHotel,
    updateHotel
} from '../hotel.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import _ from 'lodash'
import { provincesSelector } from '@pages/CommonProperty/baseproperty'
import { useNavigate, useParams } from 'react-router-dom'
import { path } from '@constants/path'
function FormHotel() {
    const dispatch = useDispatch()
    const amenitiesHotel = useSelector(amenitiesHotelSelector)
    const serviceManagers = useSelector(serviceManagersSelector)
    const currentHotel = useSelector(currentHotelSelector)
    const provinces = useSelector(provincesSelector)
    const navigate = useNavigate()
    const loading = useSelector(loadingHotel)
    const id = useParams().id
    useEffect(() => {
        if (id && !currentHotel.id) dispatch(getHotelById(id))
    }, [id, currentHotel, dispatch])
    useEffect(() => {
        document.title = 'Form Hotel'
        dispatch(getServiceManagers({ limit: 1000 }))
    }, [dispatch])
    const [amenityIds, setAmenityIds] = useState(() =>
        currentHotel.amenitieshotel
            ? currentHotel.amenitieshotel.map(item => ({
                value: item.id,
                label: item.name
            }))
            : []
    )
    const [hotelStyles, setHotelStyles] = useState(() =>
        currentHotel.hotelStyle
            ? currentHotel.hotelStyle
                .split(',')
                .map(item => ({ value: item, label: item }))
            : []
    )
    const [images, setImages] = useState(() =>
        currentHotel.images
            ? currentHotel.images.map(image => ({
                id: image.id,
                url: image.url
            }))
            : []
    )
    const [isFirstTime, setIsFirstTime] = useState(true)
    const schema = yup.object().shape({
        name: yup.string().required('Name is required'),
        description: yup.string().required('Description is required'),
        phone: yup
            .string()
            .required('Phone number is required')
            .matches(phoneRegExp, 'Phone number is not valid'),
        website: yup.string().required('Website is required'),
        hotelClass: yup
            .number()
            .typeError('Hotel class must be number')
            .required('Website is required'),
        cheapestPrice: yup
            .number()
            .typeError('Staring Price must be number')
            .required('Staring Price is required'),
        address: yup.string().required('Address is required'),
        longtitude: yup
            .string()
            .typeError(
                'Input Address and generate map to get longtitude'
            )
            .required(
                'Input Address and generate map to get longtitude'
            ),
        latitude: yup
            .number()
            .typeError(
                'Input Address and generate map to get latitude'
            )
            .required(
                'Input Address and generate map to get latitude'
            ),
        serviceManagerId: yup
            .string()
            .required('Service Manager is required'),
        provinceId: yup.string().required('Province is required')
    })
    const form = useForm({
        defaultValues: {
            name: currentHotel.name ? currentHotel.name : '',
            description: currentHotel.description
                ? currentHotel.description
                : '',
            phone: currentHotel.phone ? currentHotel.phone : '',
            website: currentHotel.website ? currentHotel.website : '',
            hotelClass: currentHotel.hotelClass
                ? currentHotel.hotelClass
                : null,
            cheapestPrice: currentHotel.cheapestPrice
                ? currentHotel.cheapestPrice
                : null,
            address: currentHotel.address ? currentHotel.address : '',
            longtitude: currentHotel.longtitude
                ? currentHotel.longtitude
                : null,
            latitude: currentHotel.latitude
                ? currentHotel.latitude
                : null,
            serviceManagerId: currentHotel.serviceManagerId
                ? currentHotel.serviceManagerId
                : '',
            provinceId: currentHotel.provinceId
                ? currentHotel.provinceId
                : ''
        },
        resolver: yupResolver(schema)
    })
    useEffect(() => {
        if (!_.isEmpty(currentHotel)) {
            form.setValue('name', currentHotel.name)
            form.setValue('name', currentHotel.name)
            form.setValue('description', currentHotel.description)
            form.setValue('phone', currentHotel.phone)
            form.setValue('website', currentHotel.website)
            form.setValue('hotelClass', currentHotel.hotelClass)
            form.setValue('cheapestPrice', currentHotel.cheapestPrice)
            form.setValue('address', currentHotel.address)
            form.setValue('longtitude', currentHotel.longtitude)
            form.setValue('latitude', currentHotel.latitude)
            form.setValue(
                'serviceManagerId',
                currentHotel.serviceManagerId
            )
            form.setValue('provinceId', currentHotel.provinceId)
            setAmenityIds(
                currentHotel.amenitieshotel.map(item => ({
                    value: item.id,
                    label: item.name
                }))
            )
            setImages(
                currentHotel.images.map(image => ({
                    id: image.id,
                    url: image.url
                }))
            )
            setHotelStyles(
                currentHotel.hotelStyle
                    .split(',')
                    .map(item => ({ value: item, label: item }))
            )
        }
    }, [form, currentHotel])
    const handleOnChangeImage = data => {
        setImages(data)
    }
    const handleButtonForm = async data => {
        try {
            if (
                !amenityIds.length ||
                !hotelStyles.length ||
                !images.length
            )
                return
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('description', data.description)
            formData.append('phone', data.phone)
            formData.append('website', data.website)
            formData.append('hotelClass', data.hotelClass)
            formData.append('cheapestPrice', data.cheapestPrice)
            formData.append('address', data.address)
            formData.append('longtitude', data.longtitude)
            formData.append('latitude', data.latitude)
            formData.append('serviceManagerId', data.serviceManagerId)
            formData.append('provinceId', data.provinceId)
            for (const image of images) {
                if (image.file) formData.append('images', image.file)
            }
            for (const amenity of amenityIds) {
                formData.append('amenitiesIds', amenity.value)
            }
            formData.append(
                'hotelStyle',
                hotelStyles.map(style => style.value).toString()
            )

            if (_.isEmpty(currentHotel)) {
                await dispatch(createHotel(formData)).then(res =>
                    unwrapResult(res)
                )
            } else {
                formData.append('id', currentHotel.id)
                await dispatch(updateHotel(formData)).then(res =>
                    unwrapResult(res)
                )
            }
            toast.success(
                _.isEmpty(currentHotel)
                    ? 'Create hotel successfully'
                    : 'Update hotel successfully',
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000,
                    hideProgressBar: true
                }
            )
            navigate(path.hotels)
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        }
    }
    return (
        <div>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white min-h-[70vh] pb-5">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex">
                            <h3 className="font-semibold text-lg text-blue-600">
                                {_.isEmpty(currentHotel)
                                    ? 'Add Hotel'
                                    : 'Update Hotel'}
                            </h3>
                        </div>
                    </div>
                </div>
                <form onSubmit={form.handleSubmit(handleButtonForm)}>
                    <div className="block w-full overflow-x-auto px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Service Manager
                            </label>
                            <MySelect
                                placeholder="Service Manager manage the hotel"
                                form={form}
                                name="serviceManagerId"
                                options={serviceManagers.map(
                                    servicemanager => ({
                                        value: servicemanager.id,
                                        label:
                                            servicemanager.user
                                                .firstname +
                                            servicemanager.user
                                                .lastname
                                    })
                                )}
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Name
                            </label>
                            <InputField
                                placeholder="Name Hotel"
                                form={form}
                                name="name"
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Description
                            </label>
                            <TextArea
                                placeholder="Description Hotel..."
                                form={form}
                                name="description"
                                rows={2}
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Phone
                            </label>
                            <InputField
                                placeholder="Phone hotel to contact"
                                form={form}
                                name="phone"
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Website
                            </label>
                            <InputField
                                placeholder="Website of hotel"
                                form={form}
                                name="website"
                                type="input"
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Hotel Class
                            </label>
                            <InputField
                                type="number"
                                min="1"
                                max="5"
                                placeholder="Range Hotel from 1 to 5 stars"
                                form={form}
                                name="hotelClass"
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Hotel Style
                            </label>
                            <Select
                                styles={{
                                    control: baseStyles => ({
                                        ...baseStyles,
                                        borderColor:
                                            hotelStyles.length ===
                                                0 && !isFirstTime
                                                ? '#F05252'
                                                : '#D1D5DB'
                                    })
                                }}
                                onChange={data =>
                                    setHotelStyles(data)
                                }
                                value={hotelStyles}
                                closeMenuOnSelect={false}
                                placeholder={
                                    'Style of Hotel. Ex: Romantic, Loves,...'
                                }
                                components={animatedComponents}
                                isMulti
                                options={hotelStyle.map(style => ({
                                    value: style,
                                    label: style
                                }))}
                            />
                            {hotelStyles.length === 0 &&
                                !isFirstTime && (
                                <span className="text-[14px] text-red-500 pl-2 mt-1">
                                    Please select styles of hotel
                                </span>
                            )}
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Staring Price ($)
                            </label>
                            <InputField
                                placeholder="Staring Price (Price of normal room)"
                                form={form}
                                name="cheapestPrice"
                                type="number"
                                min="0"
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Amenities Of Hotel
                            </label>
                            <Select
                                styles={{
                                    control: baseStyles => ({
                                        ...baseStyles,
                                        borderColor:
                                            amenityIds.length === 0 &&
                                            !isFirstTime
                                                ? '#F05252'
                                                : '#D1D5DB'
                                    })
                                }}
                                onChange={data => setAmenityIds(data)}
                                value={amenityIds}
                                closeMenuOnSelect={false}
                                placeholder={
                                    'Select amenity of hotel...'
                                }
                                components={animatedComponents}
                                isMulti
                                options={amenitiesHotel.map(
                                    amenity => ({
                                        value: amenity.id,
                                        label: amenity.name
                                    })
                                )}
                            />
                            {amenityIds.length === 0 &&
                                !isFirstTime && (
                                <span className="text-[14px] text-red-500 pl-2 mt-1">
                                    Please select amenities of
                                    hotel
                                </span>
                            )}
                        </div>
                        <div className="relative w-full mb-2">
                            <label
                                className="block uppercase text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Province
                            </label>
                            <MySelect
                                placeholder="Province"
                                form={form}
                                name="provinceId"
                                options={provinces.map(province => ({
                                    value: province.id,
                                    label: province.name
                                }))}
                            />
                        </div>
                        <AddressGenMap form={form} />
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Photos
                            </label>
                            <PhotoUploads
                                addedPhotos={images}
                                onChange={handleOnChangeImage}
                            />
                            {images.length === 0 && !isFirstTime && (
                                <span className="text-[14px] text-red-500 pl-2 mt-1">
                                    Please upload photos of hotel
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="mt-10 text-right pr-4">
                        <Mybutton
                            isloading={loading > 0 ? true : false}
                            type="submit"
                            onClick={() => {
                                if (isFirstTime) setIsFirstTime(false)
                            }}
                            className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/5 ease-linear transition-all duration-150"
                        >
                            {_.isEmpty(currentHotel)
                                ? 'Add hotel'
                                : 'Update hotel'}
                        </Mybutton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormHotel
