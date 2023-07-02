import { selectUser } from '@pages/Auth/auth.slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
    commentsSelector,
    createComment,
    getComments
} from './comment.slice'
import CommentCard from '@components/CommentCard'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { BiPencil } from 'react-icons/bi'
import { Button, Modal } from 'flowbite-react'
import InputField from '@components/InputField'
import { useForm } from 'react-hook-form'
import TextArea from '@components/TextArea'
import PhotoUploads from '@components/PhotoUploads'
import { toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'
import {
    currentDestinationClientSelector,
    setCurrentDestination
} from '@pages/DestinationTravelList/destinationclient.slice'
import {
    currentHotelClientSelector,
    setCurrentHotel
} from '@pages/HotelList/hotelclient.slice'
import {
    currentRestauRantClientSelector,
    setCurrentRestaurant
} from '@pages/RestaurantList/restaurantclient.slice'
import { useTranslation } from 'react-i18next'

function Comment({ rating, totalRating }) {
    const { t } = useTranslation()
    const currentDestination = useSelector(
        currentDestinationClientSelector
    )
    const currentHotel = useSelector(currentHotelClientSelector)
    const currentRestaurant = useSelector(
        currentRestauRantClientSelector
    )
    const dispatch = useDispatch()
    const instanceId = useParams().id
    const profile = useSelector(selectUser)
    const comments = useSelector(commentsSelector)
    const [showModal, setShowModal] = useState(false)
    const [images, setImages] = useState([])
    const [ratingClient, setRating] = useState(5)
    const handleOnChangeImage = data => {
        setImages(data)
    }
    const onClose = () => setShowModal(false)
    const handleCreateComment = async data => {
        try {
            if (instanceId && profile.id) {
                const { title, content } = data
                const formData = new FormData()
                formData.append('instanceId', instanceId)
                formData.append('userId', profile.id)
                formData.append('title', title)
                formData.append('content', content)
                formData.append('rating', ratingClient)
                if (images.length > 0)
                    for (const image of images) {
                        if (image.file)
                            formData.append('images', image.file)
                    }
                await dispatch(createComment(formData)).then(res => {
                    unwrapResult(res)
                    if (res.payload.data.destinationTravel) {
                        dispatch(
                            setCurrentDestination({
                                ...currentDestination,
                                rating: currentDestination.rating
                                    ? (currentDestination.rating +
                                          res.payload.data.rating) /
                                      2
                                    : res.payload.data.rating,
                                totalRating:
                                    currentDestination.totalRating + 1
                            })
                        )
                    } else if (res.payload.data.hotel) {
                        dispatch(
                            setCurrentHotel({
                                ...currentHotel,
                                rating: currentHotel.rating
                                    ? (currentHotel.rating +
                                          res.payload.data.rating) /
                                      2
                                    : res.payload.data.rating,
                                totalRating:
                                    currentHotel.totalRating + 1
                            })
                        )
                    } else if (res.payload.data.restaurant) {
                        dispatch(
                            setCurrentRestaurant({
                                ...currentRestaurant,
                                rating: currentRestaurant.rating
                                    ? (currentRestaurant.rating +
                                          res.payload.data.rating) /
                                      2
                                    : res.payload.data.rating,
                                totalRating:
                                    currentRestaurant.totalRating + 1
                            })
                        )
                    }
                })
                toast.success(t('reviewSuccess'), {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000,
                    hideProgressBar: true
                })
                setShowModal(false)
            }
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        }
    }
    const form = useForm({
        defaultValues: {
            title: '',
            content: ''
        }
    })
    useEffect(() => {
        dispatch(getComments({ instanceId: instanceId }))
    }, [instanceId, dispatch])
    return (
        <>
            <div className="mt-20">
                <div className="flex gap-3 items-center">
                    <header className="font-semibold text-lg">
                        {t('review')}
                    </header>
                    <div className="flex items-center">
                        <span>
                            <BiPencil />
                        </span>
                        <span
                            className="hover:underline cursor-pointer hover:text-blue-500"
                            onClick={() => setShowModal(true)}
                        >
                            {t('writeReview')}
                        </span>
                    </div>
                </div>
                <div className="flex border-[1px] border-gray-200 rounded-xl lg:w-[60%] bg-slate-50 mt-4">
                    <div className="flex items-center gap-1 basis-1/3 border-r-[1px] flex-col justify-center">
                        <div className="flex items-center text-lg">
                            <div className=" text-yellow-400 flex gap-1">
                                <span>
                                    <AiFillStar />
                                </span>
                            </div>
                            <span className="font-normal text-gray-400">
                                {rating ? rating.toFixed(1) : rating}{' '}
                                / 5
                            </span>
                        </div>
                        <span className="font-normal text-gray-400">
                            ({totalRating} {t('review')})
                        </span>
                    </div>
                    <div className="px-20 py-2 basis-2/3 text-gray-500">
                        <div className="flex justify-between items-center">
                            <span>{t('excellent')}</span>
                            <span>
                                {comments &&
                                    comments.filter(
                                        item => item.rating === 5
                                    ).length}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>{t('veryGood')}</span>
                            <span>
                                {comments &&
                                    comments.filter(
                                        item => item.rating === 4
                                    ).length}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>{t('average')}</span>
                            <span>
                                {comments &&
                                    comments.filter(
                                        item => item.rating === 3
                                    ).length}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>{t('poor')}</span>
                            <span>
                                {comments &&
                                    comments.filter(
                                        item => item.rating === 2
                                    ).length}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>{t('terriable')}</span>
                            <span>
                                {comments &&
                                    comments.filter(
                                        item => item.rating === 1
                                    ).length}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="lg:w-[60%] mt-4">
                    {comments &&
                        comments.map(comment => (
                            <CommentCard
                                key={comment.id}
                                data={comment}
                            />
                        ))}
                </div>
            </div>
            <Modal show={showModal} onClose={onClose}>
                <form
                    onSubmit={form.handleSubmit(handleCreateComment)}
                >
                    <Modal.Header>{t('writeReview')}</Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-sm font-bold mb-2">
                                    {t('reviewExp')}
                                </label>
                                <ul className="flex gap-1 text-3xl cursor-pointer text-yellow-400">
                                    {Array.from(
                                        Array(ratingClient).keys()
                                    ).map(index => (
                                        <li
                                            key={index}
                                            onClick={() =>
                                                setRating(index + 1)
                                            }
                                        >
                                            <AiFillStar />
                                        </li>
                                    ))}
                                    {Array.from(
                                        Array(5 - ratingClient).keys()
                                    ).map(index => (
                                        <li
                                            key={index}
                                            onClick={() =>
                                                setRating(
                                                    ratingClient +
                                                        index +
                                                        1
                                                )
                                            }
                                        >
                                            <AiOutlineStar />
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-sm font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    {t('reviewExp')}
                                </label>
                                <InputField
                                    placeholder={t('reviewExp')}
                                    form={form}
                                    name="title"
                                />
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-sm font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    {t('yourReview')}
                                </label>
                                <TextArea
                                    placeholder={t('yourReview')}
                                    form={form}
                                    name="content"
                                    rows={2}
                                />
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-sm font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    {t('sharePhoto')}
                                </label>
                                <PhotoUploads
                                    addedPhotos={images}
                                    onChange={handleOnChangeImage}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">{t('review')}</Button>
                        <Button color="gray" onClick={onClose}>
                            {t('cancel')}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default Comment
