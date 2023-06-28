import InputField from '@components/InputField'
import TextArea from '@components/TextArea'
import PhotoUploads from '@components/PhotoUploads'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import AddressGenMap from '@components/AddressGenMap'
import Mybutton from '@components/MyButton'
const animatedComponents = makeAnimated()
import * as yup from 'yup'
import { phoneRegExp } from '@constants/regex'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { serviceManagersSelector } from '@pages/System/ServiceManagers/servicemanager.slice'
import { getServiceManagers } from '@pages/System/ServiceManagers/servicemanager.slice'
import MySelect from '@components/MySelect'
import { unwrapResult } from '@reduxjs/toolkit'
import _ from 'lodash'
import { provincesSelector } from '@pages/CommonProperty/baseproperty'
import { useNavigate, useParams } from 'react-router-dom'
import { path } from '@constants/path'
import {
    createRestaurant,
    currentRestauRantSelector,
    getRestaurantDetail,
    loadingRestaurant,
    updateRestaurant
} from '../restaurant.slice'
import { cusinesRestaurant } from '@constants/cusinesRestaurant'
import { specialDietsRestaurant } from '@constants/specialDietsRestaurant'
import { selectUser } from '@pages/Auth/auth.slice'
function RestaurantForm() {
    const dispatch = useDispatch()
    const profile = useSelector(selectUser)
    const serviceManagers = useSelector(serviceManagersSelector)
    const currentRestaurant = useSelector(currentRestauRantSelector)
    const provinces = useSelector(provincesSelector)
    const navigate = useNavigate()
    const loading = useSelector(loadingRestaurant)
    const id = useParams().id
    const [images, setImages] = useState(() =>
        currentRestaurant.images
            ? currentRestaurant.images.map(image => ({
                id: image.id,
                url: image.url
            }))
            : []
    )
    const [cusines, setCusines] = useState(() =>
        currentRestaurant.cusines
            ? currentRestaurant.cusines
                .split(',')
                .map(item => ({ value: item, label: item }))
            : []
    )
    const [specialDiets, setSpecialDiets] = useState(() =>
        currentRestaurant.specialDiets
            ? currentRestaurant.specialDiets
                .split(',')
                .map(item => ({ value: item, label: item }))
            : []
    )
    useEffect(() => {
        if (id && !currentRestaurant.id)
            dispatch(getRestaurantDetail(id))
    }, [id, currentRestaurant, dispatch])
    useEffect(() => {
        document.title = 'Form Restaurant'
        dispatch(getServiceManagers({ limit: 1000 }))
    }, [dispatch])
    const [isFirstTime, setIsFirstTime] = useState(true)
    const schema = yup.object().shape({
        name: yup.string().required('Hãy nhập tên nhà hàng'),
        description: yup.string().required('Hãy nhập mô tả'),
        phone: yup
            .string()
            .required('Hãy nhập số điện thoại')
            .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
        address: yup.string().required('Hãy nhập địa chỉ'),
        longtitude: yup
            .string()
            .typeError(
                'Hãy nhập địa chỉ để lấy kinh độ'
            )
            .required(
                'Hãy nhập địa chỉ để lấy kinh độ'
            ),
        latitude: yup
            .string()
            .typeError(
                'Hãy nhập địa chỉ để lấy vĩ độ'
            )
            .required(
                'Hãy nhập địa chỉ để lấy vĩ độ'
            ),
        provinceId: yup
            .string()
            .typeError('Hãy chọn tỉnh thành')
            .required('Hãy chọn tỉnh thành'),
        minPrice: yup
            .string()
            .typeError('Hãy giá giá món rẻ nhất')
            .required('Hãy nhập giá món rẻ nhất'),
        maxPrice: yup
            .string()
            .typeError('Hãy giá giá món đắt nhất')
            .required('Hãy giá giá món đắt nhất'),
        limitBookPerDay: yup
            .string()
            .typeError('Hãy nhập số người tối đa đặt / ngày')
            .required('Hãy nhập số người tối đa đặt / ngày')
    })
    const form = useForm({
        defaultValues: {
            name: currentRestaurant.name
                ? currentRestaurant.name
                : '',
            description: currentRestaurant.description
                ? currentRestaurant.description
                : '',
            phone: currentRestaurant.phone
                ? currentRestaurant.phone
                : '',
            website: currentRestaurant.website
                ? currentRestaurant.website
                : '',
            address: currentRestaurant.address
                ? currentRestaurant.address
                : '',
            longtitude: currentRestaurant.longtitude
                ? currentRestaurant.longtitude
                : null,
            latitude: currentRestaurant.latitude
                ? currentRestaurant.latitude
                : null,
            serviceManagerId: currentRestaurant.serviceManagerId
                ? currentRestaurant.serviceManagerId
                : '',
            provinceId: currentRestaurant.provinceId
                ? currentRestaurant.provinceId
                : null,
            minPrice: currentRestaurant.minPrice
                ? currentRestaurant.minPrice
                : null,
            maxPrice: currentRestaurant.maxPrice
                ? currentRestaurant.maxPrice
                : null,
            limitBookPerDay: currentRestaurant.limitBookPerDay
                ? currentRestaurant.limitBookPerDay
                : null
        },
        resolver: yupResolver(schema)
    })
    useEffect(() => {
        if (!_.isEmpty(currentRestaurant)) {
            form.setValue('name', currentRestaurant.name)
            form.setValue(
                'description',
                currentRestaurant.description
            )
            form.setValue('phone', currentRestaurant.phone)
            form.setValue('address', currentRestaurant.address)
            form.setValue('longtitude', currentRestaurant.longtitude)
            form.setValue('latitude', currentRestaurant.latitude)
            form.setValue(
                'serviceManagerId',
                currentRestaurant.serviceManagerId
            )
            form.setValue('provinceId', currentRestaurant.provinceId)
            form.setValue('minPrice', currentRestaurant.minPrice)
            form.setValue('maxPrice', currentRestaurant.maxPrice)
            form.setValue(
                'limitBookPerDay',
                currentRestaurant.limitBookPerDay
            )
            setImages(
                currentRestaurant.images.map(image => ({
                    id: image.id,
                    url: image.url
                }))
            )
            setCusines(
                currentRestaurant.cusines
                    .split(',')
                    .map(item => ({ value: item, label: item }))
            )
            setSpecialDiets(
                currentRestaurant.specialDiets
                    .split(',')
                    .map(item => ({ value: item, label: item }))
            )
        }
    }, [form, currentRestaurant])
    const handleOnChangeImage = data => {
        setImages(data)
    }
    const handleButtonForm = async data => {
        try {
            if (!images.length) return
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('description', data.description)
            formData.append('phone', data.phone)
            formData.append('address', data.address)
            formData.append('longtitude', data.longtitude)
            formData.append('latitude', data.latitude)
            formData.append('serviceManagerId', profile.serviceManagerId)
            formData.append('provinceId', data.provinceId)
            formData.append('minPrice', data.minPrice)
            formData.append('maxPrice', data.maxPrice)
            formData.append('limitBookPerDay', data.limitBookPerDay)
            formData.append(
                'cusines',
                cusines.map(cusine => cusine.value).toString()
            )
            formData.append(
                'specialDiets',
                specialDiets.map(specialDiet => specialDiet.value).toString()
            )
            for (const image of images) {
                if (image.file) formData.append('images', image.file)
            }

            if (_.isEmpty(currentRestaurant)) {
                await dispatch(createRestaurant(formData)).then(res =>
                    unwrapResult(res)
                )
            } else {
                formData.append('id', currentRestaurant.id)
                await dispatch(updateRestaurant(formData)).then(res =>
                    unwrapResult(res)
                )
            }
            toast.success(
                _.isEmpty(currentRestaurant)
                    ? 'Tạo nhà hàng thành công'
                    : 'Cập nhật nhà hàng thành công',
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000,
                    hideProgressBar: true
                }
            )
            navigate(path.restaurants)
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
                                {_.isEmpty(currentRestaurant)
                                    ? 'Tạo mới nhà hàng'
                                    : 'Cập nhật nhà hàng'}
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
                                Tên nhà hàng
                            </label>
                            <InputField
                                placeholder="Tên nhà hàng"
                                form={form}
                                name="name"
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Mô tả ngắn
                            </label>
                            <TextArea
                                placeholder="Mô tả ngắn về nhà hàng..."
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
                                Ẩm thực của nhà hàng
                            </label>
                            <Select
                                styles={{
                                    control: baseStyles => ({
                                        ...baseStyles,
                                        borderColor:
                                            cusines.length === 0 &&
                                            !isFirstTime
                                                ? '#F05252'
                                                : '#D1D5DB'
                                    })
                                }}
                                onChange={data => setCusines(data)}
                                value={cusines}
                                closeMenuOnSelect={false}
                                placeholder={
                                    'Ẩm thực của nhà hàng...'
                                }
                                components={animatedComponents}
                                isMulti
                                options={cusinesRestaurant.map(
                                    style => ({
                                        value: style,
                                        label: style
                                    })
                                )}
                            />
                            {cusines.length === 0 && !isFirstTime && (
                                <span className="text-[14px] text-red-500 pl-2 mt-1">
                                    Vui lòng chọn phong cách ẩm thực của nhà hàng
                                </span>
                            )}
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Chế độ ăn uống đặc biệt
                            </label>
                            <Select
                                styles={{
                                    control: baseStyles => ({
                                        ...baseStyles,
                                        borderColor:
                                            cusines.length === 0 &&
                                            !isFirstTime
                                                ? '#F05252'
                                                : '#D1D5DB'
                                    })
                                }}
                                onChange={data =>
                                    setSpecialDiets(data)
                                }
                                value={specialDiets}
                                closeMenuOnSelect={false}
                                placeholder={
                                    'Chế độ ăn uống đặc biệt...'
                                }
                                components={animatedComponents}
                                isMulti
                                options={specialDietsRestaurant.map(
                                    style => ({
                                        value: style,
                                        label: style
                                    })
                                )}
                            />
                            {specialDiets.length === 0 &&
                                !isFirstTime && (
                                <span className="text-[14px] text-red-500 pl-2 mt-1">
                                    Hãy chọn chế độ ăn uống đặc biệt
                                </span>
                            )}
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Giá từ
                            </label>
                            <InputField
                                placeholder="Giá món thấp nhất"
                                form={form}
                                name="minPrice"
                                type="number"
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Giá cao nhất
                            </label>
                            <InputField
                                placeholder="Giá món cao nhất"
                                form={form}
                                name="maxPrice"
                                type="number"
                            />
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
                            {_.isEmpty(currentRestaurant)
                                ? 'Tạo mới'
                                : 'Cập nhật'}
                        </Mybutton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RestaurantForm
