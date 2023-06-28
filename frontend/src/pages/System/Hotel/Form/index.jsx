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
import { selectUser } from '@pages/Auth/auth.slice'
import ROLE from '@constants/ROLE'
function FormHotel() {
    const dispatch = useDispatch()
    const profile = useSelector(selectUser)
    const amenitiesHotel = useSelector(amenitiesHotelSelector)
    const currentHotel = useSelector(currentHotelSelector)
    const provinces = useSelector(provincesSelector)
    const navigate = useNavigate()
    const loading = useSelector(loadingHotel)
    const id = useParams().id
    useEffect(() => {
        if (id && !currentHotel.id) dispatch(getHotelById(id))
    }, [id, currentHotel, dispatch])
    useEffect(() => {
        document.title = 'Form khách sạn'
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
        name: yup.string().required('Hãy nhập tên'),
        description: yup.string().required('Hãy nhập mô tả'),
        phone: yup
            .string()
            .required('Hãy nhập số điện thoại')
            .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
        hotelClass: yup
            .number()
            .typeError('Chất lượng khách sạn')
            .required('Hãy chọn số sao chỉ chất lượngs'),
        cheapestPrice: yup
            .number()
            .typeError('Hãy nhập giá thấp nhất')
            .required('Hãy nhập giá thấp nhất'),
        address: yup.string().required('Hãy nhập địa chỉ'),
        longtitude: yup
            .string()
            .typeError('Hãy nhập địa chỉ để lấy kinh độ')
            .required('Hãy nhập địa chỉ để lấy kinh độ'),
        latitude: yup
            .number()
            .typeError('Hãy nhập địa chỉ để lấy vĩ độ')
            .required('Hãy nhập địa chỉ để lấy vĩ độ'),
        provinceId: yup.string().required('Hãy chọn tỉnh thành')
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
                : '',
            commissionPercent: currentHotel.commissionPercent
                ? currentHotel.commissionPercent
                : 10
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
                profile.serviceManagerId
            )
            form.setValue('provinceId', currentHotel.provinceId)
            form.setValue(
                'commissionPercent',
                currentHotel.commissionPercent
            )
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
    }, [form, currentHotel, profile])
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
            formData.append(
                'serviceManagerId',
                profile.serviceManagerId
            )
            formData.append('provinceId', data.provinceId)
            formData.append(
                'commissionPercent',
                data.commissionPercent
            )
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
                    ? 'Tạo khách sạn thành công'
                    : 'Cập nhật khách sạn thành công',
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
                                    ? 'Tạo mới khách sạn'
                                    : 'Cập nhật khách sạn'}
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
                                Tên khách sạn
                            </label>
                            <InputField
                                placeholder="Tên khách sạn"
                                form={form}
                                name="name"
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Mô tả ngắn gọn
                            </label>
                            <TextArea
                                placeholder="Mô tả ngắn gọn..."
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
                                Số điện thoại
                            </label>
                            <InputField
                                placeholder="Số điện thoại"
                                form={form}
                                name="phone"
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
                                placeholder="Chất lượng khách sạn"
                                form={form}
                                name="hotelClass"
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Phong cách
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
                                    'Phong cách. Ex: Lãng mạn, tình yêu,...'
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
                                        Hãy chọn ít nhất 1 phong cách
                                    </span>
                                )}
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Giá thấp nhất ($)
                            </label>
                            <InputField
                                placeholder="Giá của loại phòng rẻ nhất"
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
                                Tiện nghi
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
                                placeholder={'Tiện nghi khách sạn...'}
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
                                        Hãy chọn những tiện nghi khách
                                        sạn bạn có
                                    </span>
                                )}
                        </div>
                        <div className="relative w-full mb-2">
                            <label
                                className="block uppercase text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Tỉnh thành
                            </label>
                            <MySelect
                                placeholder="Tỉnh thành"
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
                                Hình ảnh
                            </label>
                            <PhotoUploads
                                addedPhotos={images}
                                onChange={handleOnChangeImage}
                            />
                            {images.length === 0 && !isFirstTime && (
                                <span className="text-[14px] text-red-500 pl-2 mt-1">
                                    Vui lòng đăng tải một vài hình ảnh
                                </span>
                            )}
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Phí hoa hồng (Nếu bạn muốn khách sạn
                                được hiển thị đầu lượt tìm kiếm. Hãy
                                tăng phí hoa hồng cho hệ thống)
                            </label>
                            <InputField
                                placeholder="Hệ thống mặc định sẽ lấy 10% / đơn đặt lịch"
                                form={form}
                                name="commissionPercent"
                                type="number"
                                min="10"
                                className="w-[360px]"
                            />
                        </div>
                    </div>
                    {profile.role.name === ROLE.SERVICEMANAGER && (
                        <div className="mt-10 text-right pr-4">
                            <Mybutton
                                isloading={loading > 0 ? true : false}
                                type="submit"
                                onClick={() => {
                                    if (isFirstTime)
                                        setIsFirstTime(false)
                                }}
                                className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/5 ease-linear transition-all duration-150"
                            >
                                {_.isEmpty(currentHotel)
                                    ? 'Tạo mới'
                                    : 'Cập nhật'}
                            </Mybutton>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default FormHotel
