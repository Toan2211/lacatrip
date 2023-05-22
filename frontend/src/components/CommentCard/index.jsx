import React from 'react'
import { AiFillStar } from 'react-icons/ai'

function CommentCard({ data }) {
    return (
        <div className="w-full border-b py-2">
            <div>
                <div className="flex items-center">
                    <div>
                        <img
                            className="w-16 h-16 object-cover rounded-full"
                            src={
                                data.user.avatar ||
                                'https://secure.gravatar.com/avatar/?s=100&d=mm&r=g'
                            }
                        />
                    </div>
                    <div className="ml-2 flex flex-col">
                        <span>
                            {data.user.firstname} {data.user.lastname}
                        </span>
                        <span>{data.createdAt.split('T')[0]}</span>
                    </div>
                </div>
            </div>
            <div className=" text-yellow-400 flex gap-1 mt-2">
                {Array.from(Array(data.rating).keys()).map(index => (
                    <span key={index}>
                        <AiFillStar />
                    </span>
                ))}
            </div>
            <div className='font-semibold text-base'>
                {data.title}
            </div>
            <div className='text-sm'>
                {data.content}
            </div>
        </div>
    )
}

export default CommentCard
