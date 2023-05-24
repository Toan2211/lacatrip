import React, { useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { applyDrag } from '@utils/dragDrop'
var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}
// date.toLocaleDateString('en-US', options)
function TripOrganizeCard({ dataOfDate, onCardDrop }) {
    return (
        <div className="my-2 w-[97%]">
            <div className="bg-slate-50 min-h-16 border-slate-300 border-[1px] p-2 cursor-pointer shadow-sm">
                <header className="font-semibold mb-3">
                    {dataOfDate.title
                        ? dataOfDate.title
                        : 'Unschedule'}
                </header>
                <Container
                    groupName="column"
                    getChildPayload={index => dataOfDate.cards[index]}
                    onDrop={dropResult => onCardDrop(dataOfDate.id, dropResult)}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview'
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {dataOfDate.cards.map((item, index) => (
                        <Draggable key={index}>
                            <div className="border-slate-300 border-[1px] p-4 rounded-md flex justify-between items-center my-1 shadow-sm bg-slate-100">
                                <span className="font-semibold text-sm">
                                    {item.title}
                                </span>
                                <span>...</span>
                            </div>
                        </Draggable>
                    ))}
                </Container>
            </div>
        </div>
    )
}

export default TripOrganizeCard
