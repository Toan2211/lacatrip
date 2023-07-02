import InputField from '@components/InputField'
import TextArea from '@components/TextArea'
import PhotoUploads from '@components/PhotoUploads'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import AddressGenMap from '@components/AddressGenMap'
import Mybutton from '@components/MyButton'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { getServiceManagers } from '@pages/System/ServiceManagers/servicemanager.slice'
import MySelect from '@components/MySelect'
import { unwrapResult } from '@reduxjs/toolkit'
import _ from 'lodash'
import { provincesSelector } from '@pages/CommonProperty/baseproperty'
import { useNavigate, useParams } from 'react-router-dom'
import { path } from '@constants/path'
import {
    createDestination,
    currentDestinationSelector,
    getDetail,
    loadingDestinationSelector,
    setCurrentDestination,
    updateDestination
} from '../destination.slice'
import { selectUser } from '@pages/Auth/auth.slice'
import { useTranslation } from 'react-i18next'
function DestinationForm() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const profile = useSelector(selectUser)

    const currentDestination = useSelector(currentDestinationSelector)
    const provinces = useSelector(provincesSelector)
    const navigate = useNavigate()
    const loading = useSelector(loadingDestinationSelector)
    const id = useParams().id
    useEffect(() => {
        if (id && !currentDestination.id) dispatch(getDetail(id))
    }, [id, currentDestination, dispatch])
    useEffect(() => {
        document.title = _.isEmpty(currentDestination)
            ? `${t('create')} ${t(
                'destinationTravel'
            ).toLocaleLowerCase()} ${t('successfully')}`
            : `${t('update')} ${t(
                'destinationTravel'
            ).toLocaleLowerCase()} ${t('successfully')}`
        dispatch(getServiceManagers({ limit: 1000 }))
        return () => {
            dispatch(setCurrentDestination({}))
        }
    }, [dispatch, currentDestination, t])
    const [images, setImages] = useState(() =>
        currentDestination.images
            ? currentDestination.images.map(image => ({
                id: image.id,
                url: image.url
            }))
            : []
    )
    const [isFirstTime, setIsFirstTime] = useState(true)
    const schema = yup.object().shape({
        name: yup.string().required(t('requiredName')),
        description: yup.string().required(t('requiredDescription')),
        price: yup
            .number()
            .typeError(t('invalidPrice'))
            .required(t('requiredPrice')),
        originalPrice: yup
            .number()
            .typeError(t('invalidOriginalPrice'))
            .required(t('requiredOriginalPrice')),
        address: yup.string().required(t('requiredAddress')),
        longtitude: yup
            .string()
            .typeError(t('requiredLongtitude'))
            .required(t('requiredLongtitude')),
        latitude: yup
            .number()
            .typeError(t('requiredLatitude'))
            .required(t('requiredLatitude')),
        provinceId: yup.string().required(t('requiredProvince'))
    })
    const form = useForm({
        defaultValues: {
            name: currentDestination.name
                ? currentDestination.name
                : '',
            description: currentDestination.description
                ? currentDestination.description
                : '',
            price: currentDestination.price
                ? currentDestination.price
                : null,
            originalPrice: currentDestination.originalPrice
                ? currentDestination.originalPrice
                : null,
            address: currentDestination.address
                ? currentDestination.address
                : '',
            longtitude: currentDestination.longtitude
                ? currentDestination.longtitude
                : null,
            latitude: currentDestination.latitude
                ? currentDestination.latitude
                : null,
            serviceManagerId: currentDestination.serviceManagerId
                ? currentDestination.serviceManagerId
                : '',
            provinceId: currentDestination.provinceId
                ? currentDestination.provinceId
                : '',
            commissionPercent: currentDestination.commissionPercent
                ? currentDestination.commissionPercent
                : 10
        },
        resolver: yupResolver(schema)
    })
    useEffect(() => {
        if (!_.isEmpty(currentDestination)) {
            form.setValue('name', currentDestination.name)
            form.setValue(
                'description',
                currentDestination.description
            )
            form.setValue('price', currentDestination.price)
            form.setValue(
                'originalPrice',
                currentDestination.originalPrice
            )
            form.setValue('address', currentDestination.address)
            form.setValue('longtitude', currentDestination.longtitude)
            form.setValue('latitude', currentDestination.latitude)
            form.setValue(
                'serviceManagerId',
                currentDestination.serviceManagerId
            )
            form.setValue('provinceId', currentDestination.provinceId)
            form.setValue(
                'commissionPercent',
                currentDestination.commissionPercent
            )
            setImages(
                currentDestination.images.map(image => ({
                    id: image.id,
                    url: image.url
                }))
            )
        }
    }, [form, currentDestination, profile])
    const handleOnChangeImage = data => {
        setImages(data)
    }
    const handleButtonForm = async data => {
        try {
            if (!images.length) return
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('description', data.description)
            formData.append('price', data.price)
            formData.append('originalPrice', data.originalPrice)
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

            if (_.isEmpty(currentDestination)) {
                await dispatch(createDestination(formData)).then(
                    res => unwrapResult(res)
                )
            } else {
                formData.append('id', currentDestination.id)
                await dispatch(updateDestination(formData)).then(
                    res => unwrapResult(res)
                )
            }
            toast.success(
                _.isEmpty(currentDestination)
                    ? `${t('create')} ${t(
                        'destinationTravel'
                    ).toLocaleLowerCase()} ${t('successfully')}`
                    : `${t('update')} ${t(
                        'destinationTravel'
                    ).toLocaleLowerCase()} ${t('successfully')}`,
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000,
                    hideProgressBar: true
                }
            )
            navigate(path.destinations)
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
                                {_.isEmpty(currentDestination)
                                    ? `${t('create')} ${t(
                                        'destinationTravel'
                                    ).toLocaleLowerCase()}`
                                    : `${t('update')} ${t(
                                        'destinationTravel'
                                    ).toLocaleLowerCase()}`}
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
                                {t('name')}
                            </label>
                            <InputField
                                placeholder={`${t('name')} ${t(
                                    'destiantionTravel'
                                ).toLowerCase()}`}
                                form={form}
                                name="name"
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                {`${t(
                                    'description'
                                ).toUpperCase()} ${t('languageEn')}`}
                            </label>
                            <TextArea
                                placeholder={
                                    t('description') +
                                    ' ' +
                                    t(
                                        'destinationTravel'
                                    ).toLowerCase() + ' ' + t('languageEn')
                                }
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
                                {`${t(
                                    'description'
                                ).toUpperCase()} ${t('languageVN')}`}
                            </label>
                            <TextArea
                                placeholder={`${t('description')} ${t(
                                    'languageVN'
                                )}`}
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
                                {t('originalPrice')} ($)
                            </label>
                            <InputField
                                placeholder={t('originalPrice')}
                                form={form}
                                name="originalPrice"
                                type="number"
                                min="0"
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                {t('price')} ($)
                            </label>
                            <InputField
                                placeholder={t('price')}
                                form={form}
                                name="price"
                                type="number"
                                min="0"
                            />
                        </div>
                        <div className="relative w-full mb-2">
                            <label
                                className="block uppercase text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                {t('province')}
                            </label>
                            <MySelect
                                placeholder={t('province')}
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
                                {t('photo')}
                            </label>
                            <PhotoUploads
                                addedPhotos={images}
                                onChange={handleOnChangeImage}
                            />
                            {images.length === 0 && !isFirstTime && (
                                <span className="text-[14px] text-red-500 pl-2 mt-1">
                                    {t('requiredPhoto') +
                                        ' ' +
                                        t(
                                            'destinationTravel'
                                        ).toLowerCase()}
                                </span>
                            )}
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-sm font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                {t('commissionPercent')}
                            </label>
                            <InputField
                                placeholder={t(
                                    'commissionPercentPlaceHolder'
                                )}
                                form={form}
                                name="commissionPercent"
                                type="number"
                                min="10"
                                className="w-[360px]"
                            />
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
                            {_.isEmpty(currentDestination)
                                ? t('create')
                                : t('update')}
                        </Mybutton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DestinationForm
