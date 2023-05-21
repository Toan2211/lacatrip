import React from 'react'
import { AiFillStar } from 'react-icons/ai'

function CommentCard() {
    return (
        <div className="w-full border-b py-2">
            <div>
                <div className="flex items-center">
                    <div>
                        <img
                            className="w-16 h-16 object-cover rounded-full"
                            src="https://secure.gravatar.com/avatar/?s=100&d=mm&r=g"
                        />
                    </div>
                    <div className="ml-2 flex flex-col">
                        <span>Customer</span>
                        <span>2/2/2022</span>
                    </div>
                </div>
            </div>
            <div className=" text-yellow-400 flex gap-1 mt-2">
                <span>
                    <AiFillStar />
                </span>
                <span>
                    <AiFillStar />
                </span>
                <span>
                    <AiFillStar />
                </span>
                <span>
                    <AiFillStar />
                </span>
                <span>
                    <AiFillStar />
                </span>
            </div>
            <div>
                The customer service before departure was excellent,
                the organisation from start to finish was excellent,
                the accommodation was better than expected, the group
                leader was excellent, the itinerary was excellent. As
                a solo female traveller I felt completely comfortable
                with the rest of the group whether they were traveling
                alone, with friends or with partners.
            </div>
        </div>
    )
}

export default CommentCard
