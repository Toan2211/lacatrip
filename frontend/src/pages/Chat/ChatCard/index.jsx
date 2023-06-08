import moment from 'moment'
import React from 'react'

function ChatCard({ isSender, image, message }) {
    return (
        <li className="w-[80%] flex justify-end gap-3 ml-auto">
            <div className="flex-1 flex flex-col">
                {image && (
                    <img
                        className="w-full h-[160px] rounded object-cover"
                        src={message.image}
                    />
                )}
                <div
                    className={`${
                        isSender
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-200 '
                    } p-2 rounded ${image ? 'mt-1' : ''}`}
                >
                    <span className="text-sm">{message.content}</span>
                </div>
                <span className=" text-slate-500 text-xs">
                    {moment(message.createdAt)
                        .local()
                        .format('DD-MM-YYYY') !==
                    moment(new Date()).local().format('DD-MM-YYYY')
                        ? moment(message.createdAt)
                            .local()
                            .format('HH:mm DD-MM-YYYY ')
                        : moment(message.createdAt)
                            .local()
                            .format('HH:mm')}
                </span>
            </div>
            <div className="w-[40px]">
                <img
                    className="w-[40px] h-[40px] rounded-full object-cover"
                    src={message.user.avatar}
                />
            </div>
        </li>
    )
}

export default ChatCard
